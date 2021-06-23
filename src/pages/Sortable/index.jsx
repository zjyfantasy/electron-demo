import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col, Button, Dropdown } from 'antd';
import { get, cloneDeep, isEmpty } from 'lodash';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import j2r from 'json2react';
import * as jsonx from 'jsonx';
import { getDataType } from '@/utils/utils';
import { allComponents } from './config';
import styles from './index.less';

const getReactElement = jsonx.getReactElement.bind({
  componentLibraries: {
    allComponents,
  },
});

const mapTypeToComponent = (type, props) => {
  if (Object.keys(allComponents).includes(type)) {
    return allComponents[type];
  }
  return type;
};

const Index = ({ dispatch, codeTree, componentList, domStack }) => {
  const [srcDoc, setSrcDoc] = useState('<div></div>');

  const sourceRef = useRef();
  const targetRef = useRef();
  const previewRef = useRef();

  const reactSortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
  };

  const sortableOption = {
    group: 'items',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onMove: (evt) => onMove(evt),
    onEnd: (evt) => {
      const { oldIndex, newIndex, to } = evt;
      matchSpecialComponent(to);
      resort();
    },
  };

  useEffect(() => {
    Sortable.create(sourceRef.current, {
      animation: 150,
      group: {
        name: 'items',
        pull: 'clone',
        put: false, // Do not allow items to be put into this list
        // revertClone: true,
      },
      sort: false, // To disable sorting: set sort to false
      onMove,
      onEnd: function (evt) {
        const { oldIndex, newIndex, to } = evt;
        if (to.attributes?.id?.value === 'items') {
          resort();
          return false;
        }
        /** */
        const item = evt.item;
        const replaceNode = item.lastChild;
        // 创建临时div标签
        let div = document.createElement('div');
        const itemStr = get(item, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);
        const classList = ['list-item'];
        const defaultClassName = get(itemData, 'defaultProps.className');
        classList.push(defaultClassName);
        div.setAttribute('class', classList.join(' '));
        // 生成拖拽进来的组件
        const newReactNode = generateComponent(itemStr);
        // 把组件渲染到临时标签上
        ReactDOM.render(newReactNode, div);

        // 用临时div标签替换拖进来的item节点
        item.parentNode.replaceChild(div, item);
        if (itemData.componentType === 'container') {
          // 去除临时div标签
          const componentNode = div.lastChild;
          if (componentNode) {
            console.log('componentNode', componentNode);
            // 使可拖拽
            Sortable.create(componentNode, { ...sortableOption });
            div.parentNode.replaceChild(componentNode, div);
          }
        }
        matchSpecialComponent(to, div);
        // item.parentNode.replaceChild(div, item);
        resort();
      },
    });
    Sortable.create(targetRef.current, { ...sortableOption });
  }, []);

  /**
   * 遍历单节点及其子节点
   * @param {HTMLElement} element
   * @param {Array} res 节点树
   */
  const loopSingleElement = (element, res) => {
    let tmp = {};
    const isMyComponent = get(element, 'attributes.data-item');
    if (isMyComponent) {
      const itemStr = get(element, 'attributes.data-item.nodeValue');
      const itemData = JSON.parse(itemStr);
      tmp = itemData;
      tmp.type = itemData.name;
      tmp.props = { ...itemData.defaultProps, ...itemData.props };
      tmp.props['data-item'] = itemStr;
      console.log(tmp);
      res.push(tmp);
      // 继续查找子元素
      const childNodes = Array.from(element.childNodes);

      if (childNodes.length) {
        const childrenDataType = getDataType(tmp.children);
        if (childrenDataType === 'undefined') {
          tmp['children'] = [];
        } else if (childrenDataType === 'String') {
          tmp['children'] = [tmp.children];
        }

        childNodes.forEach((item) => loopSingleElement(item, tmp['children']));
      }
    } else {
      element.childNodes.forEach((item) => {
        loopSingleElement(item, res);
      });
    }
  };

  /**
   * 处理特殊组件
   * @param {Element} targetElement
   */
  const matchSpecialComponent = (targetElement) => {
    // Space组件
    if (targetElement.classList.contains('ant-space')) {
      const loopRes = [];
      loopSingleElement(targetElement, loopRes);
      console.log(loopRes);
      const reactElement = j2r(React.createElement, mapTypeToComponent, ...loopRes);

      let tempElement = document.createElement('div');
      ReactDOM.render(reactElement, tempElement);
      console.log('[tempElement]', tempElement);
      // 使可拖拽
      const componentElement = tempElement.lastChild;
      Sortable.create(componentElement, { ...sortableOption });
      console.log('[componentElement]', componentElement);
      console.log('[targetElement.parentNode]', targetElement.parentNode);

      targetElement.parentNode.replaceChild(componentElement, targetElement);
    }
  };

  // 生成拖拽进来的组件
  const generateComponent = (itemStr) => {
    const itemData = JSON.parse(itemStr);

    return React.createElement(
      allComponents[itemData.name],
      { ...itemData.defaultProps, ...itemData.props, ['data-item']: itemStr },
      itemData.children,
    );
  };

  // 拖拽组件移动事件
  const onMove = (evt) => {
    // console.log(evt.related);
    // // 添加根元素related
    // if (!targetRef.current.classList.contains('sortable-related')) {
    //   targetRef.current.classList.add('sortable-related');
    // }
    if (
      !evt.related.classList.contains('sortable-related') &&
      // evt.related.attributes?.id?.value !== 'container' && // 过滤根元素
      !evt.related.classList.contains('list-item') // 非容器组件
    ) {
      evt.related.classList.add('sortable-related');
    }
  };

  // 遍历生成jsx代码
  useEffect(() => {
    json2jsx();
  }, [codeTree]);

  // 重新排序工作区组件
  const resort = () => {
    // 去除根元素related
    if (targetRef.current.classList.contains('sortable-related')) {
      targetRef.current.classList.remove('sortable-related');
    }

    const childNodes = Array.from(targetRef.current.childNodes);
    let domStack = [];
    let res = [];
    loop(childNodes, res, domStack);
    dispatch({ type: 'sortable/save', payload: { codeTree: res, domStack } });
  };

  // 判断有效子节点
  const hasValidChildNodes = (item) => {
    item.nodeType === 1 &&
      (get(item, 'attributes.data-item') || item.classList.contains('list-item'));
  };

  // 遍历容器节点添加可拖拽元素
  const loop = (array, collect = [], domStr = []) => {
    array.forEach((item) => {
      if (item.nodeType !== 1) return;
      let tmp = {};
      // 移除元素related
      if (item.classList.contains('sortable-related')) {
        item.classList.remove('sortable-related');
      }
      const isMyComponent = get(item, 'attributes.data-item');
      if (isMyComponent) {
        // 获取属性
        const itemStr = get(item, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);

        // 构造节点
        domStr.push(`<${itemData.name}>${itemData.name}`);
        console.log(`<${itemData.name}>`);

        tmp = { ...itemData, id: uuid() };
        collect.push(tmp);

        // 继续查找子元素
        const childNodes = Array.from(item.childNodes);

        if (childNodes.length) {
          const childrenDataType = getDataType(tmp.children);
          if (childrenDataType === 'undefined') {
            tmp['children'] = [];
          } else if (childrenDataType === 'String') {
            tmp['children'] = [tmp.children];
          }

          loop(childNodes, tmp['children'], domStr);
        }
      } else {
        loop(item.childNodes, collect, domStr);
      }
      if (isMyComponent) {
        const itemData = JSON.parse(isMyComponent.nodeValue);
        domStr.push(`</${itemData.name}>`);
        console.log(`</${itemData.name}>`);
      }
    });
  };

  console.log(domStack.join(''));

  /**
   * 遍历树结构
   * @param {Array} res 节点树
   */
  const loopTreeData = (data = [], callback) => {
    data.forEach((item) => {
      if (getDataType(item) === 'Object') {
        callback(item);
      }
      const childrenType = getDataType(item.children);
      switch (childrenType) {
        case 'Array':
          loopTreeData(item.children, callback);
          break;
        case 'String':
          break;
      }
    });
  };

  /**
   * json转jsx
   */
  const json2jsx = () => {
    const codeTreeCopy = cloneDeep(codeTree);
    loopTreeData(codeTreeCopy, (item) => (item.type = item.name));
    console.log(codeTreeCopy);
    const jsx = j2r(React.createElement, mapTypeToComponent, {
      type: 'div',
      props: { displayName: 'root' },
      children: codeTreeCopy,
    });
    console.log(jsx);
    ReactDOM.render(jsx, previewRef.current);
  };

  return (
    <Card className={styles.card}>
      <div className={styles.wrap}>
        <div ref={sourceRef} id="items" className={styles.list}>
          {componentList.map((item) => {
            return (
              <div data-item={JSON.stringify(item)} key={item.id} className={styles.listItem}>
                {item.content}
              </div>
            );
          })}
        </div>
        <div ref={targetRef} id="container" className={styles.container}></div>
      </div>
      <div ref={previewRef} className={styles.preview}></div>
      {/* <iframe className={styles.iframe} frameBorder={0} srcDoc={domStack.join('')}></iframe> */}
      {/* <div>
        <LiveProvider code={`<div>${domStack.join('')}</div>`} scope={{ Row, Col, Button }}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div> */}
    </Card>
  );
};

export default connect(({ sortable }) => ({
  codeTree: sortable.codeTree,
  componentList: sortable.componentList,
  domStack: sortable.domStack,
}))(Index);
