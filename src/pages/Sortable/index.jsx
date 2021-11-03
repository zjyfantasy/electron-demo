import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, Select } from 'antd';
import { get, cloneDeep, isEmpty } from 'lodash';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as jsonx from 'jsonx';
import { json2react, getDataType, loopTreeDataAny } from '@/utils/utils';
import { allComponents } from './config';
import styles from './index.less';

const getReactElement = jsonx.getReactElement.bind({
  componentLibraries: {
    allComponents,
  },
});

const Index = ({ dispatch, codeTree, componentList, domStack, selectedComponentData }) => {
  const [srcDoc, setSrcDoc] = useState('<div></div>');

  const sourceRef = useRef();
  const targetRef = useRef();
  const propsRef = useRef();
  const previewRef = useRef();

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
        console.log('---------------', to);
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

        // 未绑定data-item数据组件重新绑定数据
        bindDataItem(div.lastChild, itemStr);

        // 用临时div标签替换拖进来的item节点
        item.parentNode.replaceChild(div, item);

        // 特殊组件
        if (itemData.disableDrag) {
          // 禁止元素拖拽
          const componentNode = div.lastChild;
          if (componentNode) {
            div.parentNode.replaceChild(componentNode, div);
          }
        } else if (itemData.componentType === 'container') {
          // 去除临时div标签
          const componentNode = div.lastChild;
          if (componentNode) {
            console.log('componentNode', componentNode);
            // 使可拖拽
            Sortable.create(componentNode, { ...sortableOption });
            div.parentNode.replaceChild(componentNode, div);
          }
        }
        // 拖拽目标为特殊组件
        matchSpecialComponent(to, div);
        resort();
      },
    });
    Sortable.create(targetRef.current, { ...sortableOption });
    targetRef.current.addEventListener('click', (e) => {
      console.log(e.target);
      const isMyComponent = get(e.target, 'attributes.data-item');
      // const isMyComponent = e.target.classList.contains('inline-block')|| e.target.classList.contains('block')
      if (isMyComponent) {
        if (e.target.classList.contains('item-active')) {
          e.target.classList.remove('item-active');
        } else {
          e.target.classList.add('item-active');
        }
        // 获取属性
        const itemStr = get(e.target, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);
        dispatch({ type: 'sortable/save', payload: { selectedComponentData: itemData } });
      }
    });
  }, []);

  /**
   * 绑定数据到节点
   * @param {Element} element 绑定数据的节点
   * @param {String} itemStr 序列化数据
   */
  const bindDataItem = (element, itemStr) => {
    if (element) {
      const dataItem = JSON.parse(itemStr);
      if (
        [
          'PageHeader',
          'Rate',
          'Slider',
          'Transfer',
          'Upload',
          'Calendar',
          'Carousel',
          'Collapse',
          'Descriptions',
          'Statistic',
          'Tabs',
          'Modal',
          'Result',
          'Skeleton',
        ].includes(dataItem.name)
      ) {
        element.setAttribute('data-item', itemStr);
      }
    }
  };

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
    console.log(targetElement);
    // Space组件
    if (targetElement.classList.contains('ant-space')) {
      const loopRes = [];
      loopSingleElement(targetElement, loopRes);
      // 去除空占位元素
      if (loopRes.length && loopRes[0].children.length) {
        loopRes[0].children.shift();
      }
      // 重新创建Space组件（必须包含子组件一起创建）
      // const reactElement = j2r(React.createElement, mapTypeToComponent, ...loopRes);
      json2react(...loopRes);
      let tempElement = document.createElement('div');
      ReactDOM.render(reactElement, tempElement);
      // 使可拖拽
      const componentElement = tempElement.lastChild;
      Sortable.create(componentElement, { ...sortableOption });

      targetElement.parentNode.replaceChild(componentElement, targetElement);
    }
    // FormItem组件
    if (targetElement.classList.contains('ant-form')) {
      const contentElements = targetElement.querySelectorAll(
        '.ant-form-item-control-input-content',
      );
      if (!contentElements.childNodes) {
        contentElements.forEach((item) => {
          console.log('******', item);
          if (item.childNodes.length === 0) {
            Sortable.create(item, { ...sortableOption });
          }
        });
      }
    }

    // Card组件
    const bodyElements = targetElement.querySelectorAll('.ant-card-body');
    if (bodyElements.length) {
      bodyElements.forEach((item) => Sortable.create(item, { ...sortableOption }));
    }

    // Drawer组件
    const drawerBodyElements = targetElement.querySelectorAll('.ant-drawer-body');
    if (drawerBodyElements.length) {
      drawerBodyElements.forEach((item) => Sortable.create(item, { ...sortableOption }));
    }

    // Modal组件
    const modalBodyElements = targetElement.querySelectorAll('.ant-modal-body');
    if (modalBodyElements.length) {
      modalBodyElements.forEach((item) => Sortable.create(item, { ...sortableOption }));
    }
  };

  // 生成拖拽进来的组件
  const generateComponent = (itemStr) => {
    const itemData = JSON.parse(itemStr);
    const specialComponents = [
      'Menu',
      'Affix',
      'Breadcrumb',
      'Steps',
      'Select',
      'TreeSelect',
      'Upload',
      'Badge',
      'Carousel',
      'Collapse',
      'Descriptions',
      'Tabs',
      'Popconfirm',
    ];
    if (specialComponents.includes(itemData.name)) {
      loopTreeDataAny(
        itemData,
        (item) => ((item.type = item.name), (item.props['data-item'] = JSON.stringify(item))),
      );
      // return j2r(React.createElement, mapTypeToComponent, itemData);
      return json2react(itemData);
    }

    // 需要展示默认属性的组件
    const showDefaultPropsComponents = ['Modal'];
    let defaultProps = {};
    if (showDefaultPropsComponents.includes(itemData.name)) {
      defaultProps = itemData.defaultProps;
    }
    const componentName = allComponents[itemData.name]
      ? allComponents[itemData.name]
      : itemData.name;
    // 创建组件时defaultProps和props分开，props是真实作用于组件上的属性
    return React.createElement(
      componentName,
      { ...defaultProps, ...itemData.props, ['data-item']: itemStr },
      itemData.children,
    );
  };

  /**
   *添加禁放区
   * @param {Element} element 目标元素
   * @returns Boolen {true:可以放置，false：不可放置}
   */
  const addDisableArea = (element) => {
    // FormItem
    const formItemContent = element.classList.contains('ant-form-item-control-input-content');
    if (formItemContent && element.childNodes.length) {
      element.classList.add('sortable-disable');
      return false;
    }
    // pagination
    const pagination = element.classList.contains('ant-pagination');
    if (pagination) return false;

    return true;
  };

  const filterDisableArea = (element) => {
    // pagination
    const pagination = element.querySelector('.ant-pagination');
    return !!pagination;
  };

  // 拖拽组件移动事件
  const onMove = (evt) => {
    const res = addDisableArea(evt.to);
    if (!res) {
      return false;
    }
    // // 添加根元素related
    // if (!targetRef.current.classList.contains('sortable-related')) {
    //   targetRef.current.classList.add('sortable-related');
    // }
    if (
      !evt.related.classList.contains('sortable-related') &&
      !evt.related.classList.contains('list-item') // 容器组件
    ) {
      // // 过滤节点
      // if (filterDisableArea(evt.to)) return;
      // 过滤非容器组件
      const isMyComponent = get(evt, 'related.attributes.data-item');
      if (isMyComponent) {
        // 获取属性
        const itemStr = get(isMyComponent, 'nodeValue');
        const itemData = JSON.parse(itemStr);
        if (itemData.componentType === 'text') return;
      }
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

  // 遍历容器节点添加可拖拽元素
  const loop = (array, collect = [], domStr = []) => {
    array.forEach((item) => {
      if (item.nodeType !== 1) return;
      let tmp = {};
      // 移除元素related
      if (item.classList.contains('sortable-related')) {
        item.classList.remove('sortable-related');
      }
      // 移除禁放区
      if (item.classList.contains('sortable-disable')) {
        item.classList.remove('sortable-disable');
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

        // 处理特殊组件
        if (
          [
            'Dropdown',
            'Affix',
            'Select',
            'TreeSelect',
            'Upload',
            'Carousel',
            'Collapse',
            'Descriptions',
            'Tabs',
          ].includes(itemData.name)
        ) {
          if (isMyComponent) {
            domStr.push(`</${itemData.name}>`);
            console.log(`</${itemData.name}>`);
          }
          return;
        }
        // 继续查找子元素
        const childNodes = Array.from(item.childNodes);

        if (childNodes.length) {
          const childrenDataType = getDataType(tmp.children);
          if (childrenDataType === 'undefined') {
            // tmp['children'] = [];
            if (isMyComponent) {
              domStr.push(`</${itemData.name}>`);
              console.log(`</${itemData.name}>`);
            }
            return;
          } else if (childrenDataType === 'String') {
            // tmp['children'] = [tmp.children];
            if (isMyComponent) {
              domStr.push(`</${itemData.name}>`);
              console.log(`</${itemData.name}>`);
            }
            return;
          } else if (childrenDataType === 'Array') {
            if (tmp.children.length === 1 && getDataType(tmp.children[0]) === 'String') {
              if (isMyComponent) {
                domStr.push(`</${itemData.name}>`);
                console.log(`</${itemData.name}>`);
              }
              return;
            }
            tmp['children'] = [];
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
  console.log('selectedComponentData', selectedComponentData);
  /**
   * json转jsx
   */
  const json2jsx = () => {
    const codeTreeCopy = cloneDeep(codeTree);
    loopTreeDataAny(
      codeTreeCopy,
      // 合并属性
      (item) => (item.type = item.name),
    );
    console.log(codeTreeCopy);
    // const jsx = j2r(React.createElement, mapTypeToComponent, {
    //   type: 'div',
    //   props: { displayname: 'root' },
    //   children: codeTreeCopy,
    // });
    const jsx = json2react({
      type: 'div',
      props: { displayname: 'root' },
      children: codeTreeCopy,
    });
    console.log(jsx);
    ReactDOM.render(jsx, previewRef.current);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Card className={styles.card}>
      <div className={styles.wrap}>
        <div ref={sourceRef} id="items" className={styles.list}>
          {componentList.map((item) => {
            return (
              <div data-item={JSON.stringify(item)} key={item.name} className={styles.listItem}>
                {item.name}
              </div>
            );
          })}
        </div>
        <div ref={targetRef} id="container" className={styles.container}></div>
        <div ref={propsRef} id="props" className={styles.propsContainer}>
          <div>
            <Row>
              <Col span={6}>name:</Col>
              <Col>{selectedComponentData.name}</Col>
            </Row>
            <Row>
              <Col span={6}>type:</Col>
              <Col>
                <Select onChange={handleChange}>
                  <Select.Option value="primary">primary</Select.Option>
                  <Select.Option value="ghost">ghost</Select.Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div ref={previewRef} className={styles.preview}></div>
      {/* <iframe className={styles.iframe} frameBorder={0} srcDoc={domStack.join('')}></iframe> */}
      {/* <div>
        <LiveProvider code={`<div>${domStack.join('')}</div>`} scope={{ Row, Col, Button }}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div> */}
      {/* <div className={styles.outer}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div> */}
    </Card>
  );
};

export default connect(({ sortable }) => ({
  codeTree: sortable.codeTree,
  componentList: sortable.componentList,
  domStack: sortable.domStack,
  selectedComponentData: sortable.selectedComponentData,
}))(Index);
