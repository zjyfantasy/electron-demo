import { ReactSortable } from 'react-sortablejs';
import { allComponents } from '../../config';
import styles from './index.less';

const Container = ({ block, blockIndex, setBlocks }) => {
  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
  };

  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList) => {
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
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
};

const BlockWrapper = ({ block, blockIndex, setBlocks }) => {
  if (!block) return null;
  if (block.type === 'container') {
    return (
      <div className={styles.block}>
        container: {block.content}
        <Container block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      </div>
    );
  } else {
    return React.createElement(
      allComponents[block.name],
      { className: styles.block1 },
      `text: ${block.content}`,
    );
  }
};

export default BlockWrapper;
