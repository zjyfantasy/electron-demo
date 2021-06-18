import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Row, Col, Button } from 'antd';
import { get, cloneDeep, isEmpty } from 'lodash';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import j2r from 'json2react';
import { allComponents } from './config';
import styles from './index.less';

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
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt;
      if (oldIndex !== newIndex) {
        resort();
      }
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
      onEnd: function (evt) {
        const { oldIndex, newIndex } = evt;
        resort();
      },
    });
    Sortable.create(targetRef.current, { ...sortableOption });
  }, []);

  const generator = (data = []) => {
    // let res = [];
    // if (data.length === 0) {
    //   return null;
    // } else {
    //   data.forEach((item) => {
    //     res.push(
    //       React.createElement(allComponents[item.name], item.props, generator(item.children)),
    //     );
    //   });
    //   return res;
    // }
  };

  useEffect(() => {
    json2jsx();
  }, [codeTree]);

  const resort = () => {
    const childNodes = Array.from(targetRef.current.childNodes);
    let domStack = [];
    let res = [];
    loop(childNodes, res, domStack);
    dispatch({ type: 'sortable/save', payload: { codeTree: res, domStack } });
  };

  // 判断占位元素
  const hasPlaceholder = (element) => {
    const childNodes = Array.from(element?.childNodes);
    return childNodes.some(
      (item) => item.nodeType === 1 && item.classList.contains('nested-sortable'),
    );
  };
  // 遍历容器节点添加可拖拽元素
  const loop = (array, collect = [], domStr = []) => {
    array.forEach((item) => {
      let tmp = {};
      const isMyComponent = get(item, 'attributes.data-item');
      if (isMyComponent) {
        console.log(item.parentNode);
        // 添加属性
        const itemStr = get(item, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);

        // 构造节点
        domStr.push(`<${itemData.name} >${itemData.name}`);
        console.log(`<${itemData.name}>`);

        tmp = { ...itemData, id: uuid() };
        collect.push(tmp);
        // 容器组件
        if (itemData.type === 'container') {
          if (!hasPlaceholder(item)) {
            let newEle = document.createElement('div');
            newEle.classList.add('nested-sortable');
            Sortable.create(newEle, sortableOption);
            item.appendChild(newEle);
          }
        } else {
        }
        // 继续查找子元素
        const childNodes = Array.from(item.childNodes);
        const validChildNodes = childNodes.filter(
          (item) =>
            item.nodeType === 1 &&
            item.classList.contains('nested-sortable') &&
            item.childNodes.length,
        );
        if (validChildNodes.length) {
          tmp['children'] = [];
          loop(validChildNodes, tmp['children'], domStr);
        } else {
        }
      } else {
        if (
          item.nodeType === 1 &&
          item.classList.contains('nested-sortable') &&
          item.childNodes.length
        ) {
          const childNodes = Array.from(item.childNodes);
          loop(childNodes, collect, domStr);
        } else {
        }
      }
      if (isMyComponent) {
        const itemData = JSON.parse(isMyComponent.nodeValue);
        // domStr += `</${itemData.name}>`;
        domStr.push(`</${itemData.name}>`);
        console.log(`</${itemData.name}>`);
      }
    });
  };

  console.log(domStack.join(''));
  const json2jsx = () => {
    const dataFilter = (data = []) => {
      data.forEach((item) => {
        item.type = item.name;
        if (item.children) {
          dataFilter(item.children);
        } else {
          item.children = item.content;
        }
      });
    };
    const codeTreeCopy = cloneDeep(codeTree);
    dataFilter(codeTreeCopy);
    const mapTypeToComponent = (type, props) => {
      if (Object.keys(allComponents).includes(type)) {
        return allComponents[type];
      }
      return type;
    };
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
