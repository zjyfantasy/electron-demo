import React, { useState } from 'react';
import { connect } from 'umi';
import { ReactSortable } from 'react-sortablejs';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';
import componentList, { allComponents } from '../Generator/config';

import styles from './index.less';

const componentOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: {
    name: 'shared',
    pull: 'clone',
    put: false,
  },
  sort: false,
};

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
};

function App() {
  const [components, setComponents] = useState(componentList);
  const [blocks, setBlocks] = useState([]);
  console.log('-------blocks-------', blocks);
  return (
    <div className={'wrap'}>
      <ReactSortable
        className={styles.left}
        list={components}
        setList={setComponents}
        {...componentOptions}
      >
        {components.map((block, blockIndex) => (
          <div key={block.id} className={styles.componentsWrap}>
            {block.content}
          </div>
        ))}
      </ReactSortable>
      <ReactSortable
        className={styles.right}
        list={blocks}
        setList={setBlocks}
        {...sortableOptions}
      >
        {blocks.map((block, blockIndex) => (
          <BlockWrapper
            key={`list-${blockIndex}-${block.id}`}
            block={block}
            blockIndex={[blockIndex]}
            setBlocks={setBlocks}
          />
        ))}
      </ReactSortable>
    </div>
  );
}

export default connect(({}) => ({}))(App);

function Container({ block, blockIndex, setBlocks }) {
  return (
    <>
      <ReactSortable
        key={`list-${blockIndex}-${block.id}`}
        list={block.children}
        setList={(currentList) => {
          console.log('currentList', currentList);
          setBlocks((sourceList) => {
            console.log('sourceList', sourceList);

            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce((arr, i) => arr[i]['children'], tempList);
            console.log(lastIndex);
            lastArr[lastIndex]['children'] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={`list-${index}-${childBlock.id}`}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}

function BlockWrapper({ block, blockIndex, setBlocks }) {
  // console.log(block);
  if (!block) return null;
  if (block.type === 'container') {
    return (
      <div className={styles.blockWrapper}>
        container: {block.content}
        <Container block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      </div>
    );
  } else {
    // return <StyledBlockWrapper className="block">text: {block.content}</StyledBlockWrapper>;
    return React.createElement('div', { className: 'block' }, `text: ${block.content}`);
  }
}
