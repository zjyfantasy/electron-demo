import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import { get, cloneDeep, isEmpty } from 'lodash';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styles from './Welcome.less';
import { allComponents } from './Sortable/config';

const Index = ({ dispatch, codeTree, componentList }) => {
  const [srcDoc, setSrcDoc] = useState('<div></div>');
  const sourceRef = useRef();
  const targetRef = useRef();

  const sortableOption = {
    group: 'items',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    // onSort: function (evt) {
    //   console.log(evt);
    // },
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
      // Called when creating a clone of element
      // onClone: function (/**Event*/ evt) {
      //   var origEl = evt.item;
      //   var cloneEl = evt.clone;
      //   console.log(origEl, cloneEl);
      //   return <div>111</div>
      // },
      onEnd: function (evt) {
        const { oldIndex, newIndex } = evt;
        const item = evt.item;
        console.log(item);
        const replaceNode = item.lastChild;
        let div = document.createElement('div');
        const itemStr = get(item, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);
        div.setAttribute('class', 'sortable-item');
        div.setAttribute('data-item', itemStr);
        const newReactNode = React.createElement(
          allComponents[itemData.name],
          { ...itemData.defaultProps, ...itemData.props },
          itemData.children,
        );
        ReactDom.render(newReactNode, div);
        item.parentNode.replaceChild(div, item);
        resort();
      },
    });
    Sortable.create(targetRef.current, { ...sortableOption });
  }, []);

  const generator = (data = []) => {
    const res = '';
    data.forEach((item) => {
      console.log(item.name);
      if (item.children) {
        generator(item.children);
      } else {
        res += item.name;
      }
    });
    console.log(res);
  };

  const resort = () => {
    const childNodes = Array.from(targetRef.current.childNodes);
    let res = [];
    loop(childNodes, res);
    dispatch({ type: 'generator/save', payload: { codeTree: res } });
  };

  // 判断占位元素
  const hasPlaceholder = (element) => {
    const childNodes = Array.from(element?.childNodes);
    return childNodes.some(
      (item) => item.nodeType === 1 && item.classList.contains('nested-sortable'),
    );
  };
  // 遍历容器节点添加可拖拽元素
  const loop = (array, collect = []) => {
    array.forEach((item) => {
      let tmp = {};
      const isMyComponent = get(item, 'attributes.data-item');
      if (isMyComponent) {
        // 添加属性
        const itemStr = get(item, 'attributes.data-item.nodeValue');
        const itemData = JSON.parse(itemStr);
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
          loop(validChildNodes, tmp['children']);
        } else {
        }
      } else {
        if (
          item.nodeType === 1 &&
          item.classList.contains('nested-sortable') &&
          item.childNodes.length
        ) {
          const childNodes = Array.from(item.childNodes);
          loop(childNodes, collect);
        } else {
        }
      }
    });
  };

  const loop2 = (array, collect = [], trackId = 0) => {
    array.forEach((item, index) => {
      const parentId = uuid();
      if (item.nodeType === 1) {
        const isMyComponent = get(item, 'attributes.data-item');
        if (isMyComponent) {
          // 添加属性
          const itemStr = get(item, 'attributes.data-item.nodeValue');
          const itemData = JSON.parse(itemStr);
          // 容器组件
          if (itemData.type === 'container') {
            if (!item.classList.contains('nested-sortable')) {
              item.classList.add('nested-sortable');
              Sortable.create(item, sortableOption);
            }
            console.log(itemData.name);
          } else {
            console.log(itemData.name);
            // item.classList.add('no-container');
          }
          // 继续查找子元素
          const childNodes = Array.from(item.childNodes);
          const validChildNodes = childNodes.filter(
            (item) => item.nodeType === 1 && get(item, 'attributes.data-item'),
          );
          if (validChildNodes.length) {
            loop2(validChildNodes, collect, index);
          } else {
            // console.log(itemData.name);
          }
        } else {
          if (item.nodeType === 1 && get(item, 'attributes.data-item')) {
            const childNodes = Array.from(item.childNodes);
            loop2(childNodes, collect, index);
          } else {
            // console.log(itemData.name);
          }
        }
      }
    });
  };
  console.log(codeTree);
  return (
    <PageContainer waterMarkProps={{ content: '' }}>
      <Card className={styles.card}>
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
        {/* <iframe ref={targetRef} className={styles.iframe} frameBorder={0} srcDoc={srcDoc}></iframe> */}
        {/* <div ref={targetRef}>
          <LiveProvider code={srcDoc} scope={{ Card, Button, styles }}>
            <LiveError />
            <LivePreview />
          </LiveProvider>
        </div> */}
      </Card>
    </PageContainer>
  );
};

export default connect(({ sortable }) => ({
  codeTree: sortable.codeTree,
  componentList: sortable.componentList,
}))(Index);
