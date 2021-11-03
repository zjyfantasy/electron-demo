import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  insertNode,
  getNodeAtPath,
  walk,
} from 'react-sortable-tree';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cloneDeep } from 'lodash';
import ExternalComponent, { externalNodeType } from './components/ExternalComponent';
import componentList from './config';
import { json2react, loopTreeDataAny } from '@/utils/utils';

import styles from './index.less';

const Index = () => {
  const previewRef = useRef();
  const [treeData, setTreeData] = useState([]);
  console.log(treeData);

  useEffect(() => {
    json2jsx();
  }, [treeData]);

  /**
   * json转jsx
   */
  const json2jsx = () => {
    const codeTreeCopy = cloneDeep(treeData);
    // walk({
    //   treeData: codeTreeCopy,
    //   getNodeKey: ({ treeIndex }) => treeIndex,
    //   callback: (item) => {
    //     const node = item.node;
    //     console.log(node);
    //     node.type = node.name;
    //     if (['Button'].includes(node.type)) {
    //       node.children = node.props.content;
    //     }
    //   },
    //   ignoreCollapsed: false,
    // });
    loopTreeDataAny(codeTreeCopy, (item) => {
      // item = cloneDeep(item);
      item.type = item.name;
      if (item.props.content) {
        item.children.push(item.props.content);
      }
    });
    console.log(codeTreeCopy);
    const jsx = json2react({
      type: 'div',
      props: { displayname: 'root' },
      children: codeTreeCopy,
    });
    console.log(jsx);
    ReactDOM.render(jsx, previewRef.current);
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;
  const generateNodeProps = ({ node, path }) => ({
    buttons: [
      <Button
        onClick={() =>
          setTreeData(
            (state) =>
              addNodeUnderParent({
                treeData: state,
                parentKey: path[path.length - 1],
                expandParent: true,
                getNodeKey,
                newNode: {
                  title: `span`,
                },
                addAsFirstChild: true,
              }).treeData,
          )
        }
      >
        Add Child
      </Button>,
      <Button
        onClick={() => {
          console.log(node, path);
          setTreeData(
            (state) =>
              insertNode({
                treeData: cloneDeep(state),
                depth: path.length - 1,
                minimumTreeIndex: path[path.length - 1],
                newNode: node,
                ignoreCollapsed: false,
                expandParent: true,
              }).treeData,
          );
        }}
      >
        Copy
      </Button>,
      <Button
        danger
        onClick={() =>
          setTreeData((state) =>
            removeNodeAtPath({
              treeData: state,
              path,
              getNodeKey,
            }),
          )
        }
      >
        Remove
      </Button>,
    ],
    className: 'abc',
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.components}>
          {componentList.map((item) => (
            <ExternalComponent node={{ ...item, title: item.name }} />
          ))}
        </div>
        <div className={styles.tree}>
          <SortableTree
            scaffoldBlockPxWidth={30}
            treeData={treeData}
            onChange={(treeData) => setTreeData(treeData)}
            dndType={externalNodeType}
            generateNodeProps={generateNodeProps}
          />
        </div>
        <div className={styles.preview} ref={previewRef}></div>
      </div>
    </DndProvider>
  );
};

export default Index;
