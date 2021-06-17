import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import { get, cloneDeep } from 'lodash';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import styles from './Welcome.less';

const Index = ({ componentList }) => {
  const [srcDoc, setSrcDoc] = useState('<div></div>');
  const sourceRef = useRef();
  const targetRef = useRef();

  const [codeTree, setcodeTree] = useState([]);
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
        console.log(evt);
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
        if (oldIndex !== newIndex) {
          const childNodes = Array.from(targetRef.current.childNodes);
          loop(childNodes);
        }
      },
    });
    Sortable.create(targetRef.current, { ...sortableOption });
  }, []);

  const combineCodeTree = (nodeArray) => {
    const data = Array.from(nodeArray);
    data.forEach((item) => {
      if (item.nodeType === 1) {
        const isMyComponent = get(item, 'attributes.data-item');
        if (isMyComponent) {
        } else {
          if (
            item.nodeType === 1 &&
            item.classList.contains('nested-sortable') &&
            item.childNodes.length
          ) {
            combineCodeTree(item.childNodes);
          } else {
          }
        }
      }
    });
  };

  let i = 0;
  // 判断占位元素
  const hasPlaceholder = (element) => {
    const childNodes = Array.from(element?.childNodes);
    return childNodes.some(
      (item) =>
        item.nodeType === 1 &&
        item.classList.contains('nested-sortable') &&
        item.childNodes.length === 0,
    );
  };
  // 遍历容器节点添加可拖拽元素
  const loop = (array, collect = [], trackId = 0) => {
    const children = [];
    array.forEach((item, index) => {
      const parentId = uuid();
      if (item.nodeType === 1) {
        const isMyComponent = get(item, 'attributes.data-item');
        if (isMyComponent) {
          // 添加属性
          const itemStr = get(item, 'attributes.data-item.nodeValue');
          const itemData = JSON.parse(itemStr);
          if (collect.length === 0) {
            children.push(itemData.name);
          } else {
          }

          // if (trackId === '0') {
          //   collect.push({ ...itemData, id: trackId });
          // }
          // collect.push({ ...itemData, id: trackId });
          // console.log(collect,trackId)
          // 第一个元素
          // console.log(trackId, index);
          // collect.push(index);
          // 容器组件
          if (itemData.type === 'container') {
            if (!hasPlaceholder(item)) {
              let newEle = document.createElement('div');
              newEle.classList.add('nested-sortable');
              Sortable.create(newEle, sortableOption);
              item.appendChild(newEle);
            }
            console.log(itemData.name);
          } else {
            console.log(itemData.name);
            // item.classList.add('no-container');
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
            loop(validChildNodes, collect, index);
          } else {
            // console.log(itemData.name);
          }
        } else {
          if (
            item.nodeType === 1 &&
            item.classList.contains('nested-sortable') &&
            item.childNodes.length
          ) {
            const childNodes = Array.from(item.childNodes);
            loop(childNodes, collect, index);
          } else {
            // console.log(itemData.name);
          }
        }
      }
    });
    collect.concat(children);
    console.log(collect);
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

export default connect(({ generator }) => ({
  codeTree: generator.codeTree,
  componentList: generator.componentList,
}))(Index);
