import React from 'react';
import { Card } from 'antd';
import { connect } from 'umi';
import { cloneDeep } from 'lodash';
import { PageContainer } from '@ant-design/pro-layout';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Sider from './components/Sider/Sider';
import Worker from './components/Worker';
import styles from './index.less';

const Index = ({ dispatch, componentList, codeTree }) => {
  const [workerItems, setWorkerItems] = React.useState([]);
  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const item = source[droppableSource.index];
    destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destination;
  };

  const getJson = (draggableId, item, source, destination) => {
    console.log(draggableId, item, source, destination);
    const { droppableId: sourceDroppableId } = source;
    const { droppableId: destDroppableId } = destination;
    if (sourceDroppableId === 'COMPONENTS' && destDroppableId === 'WORKER') {
      const id = uuid()
      dispatch({
        type: 'generator/save',
        payload: {
          codeTree: {
            ...codeTree,
            [id]: item,
          },
        },
      });
    }
  };

  const onDragEnd = (result) => {
    const { draggableId, source, destination, combine } = result;
    console.log(componentList)
    const item = componentList.find((item) => item.id === draggableId);
    // combining item
    if (combine) {
      console.log(`drag: ${combine.draggableId} drop: ${combine.droppableId}`);
      console.log(combine);
      // super simple: just removing the dragging item
      // const items = [...workerItems];
      // items.splice(result.source.index, 1);
      // setWorkerItems(items);
      return;
    }

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      // 工作区内拖拽
      case destination.droppableId:
        setWorkerItems((state) => reorder(state, source.index, destination.index));
        break;
      // 拖拽到工作区
      case 'COMPONENTS':
        setWorkerItems((state) => copy(componentList, state, source, destination));
        getJson(draggableId, item, source, destination);
        break;
      default:
        break;
    }
  };
  console.log('------codeTree-------', codeTree);
  return (
    <div className={styles.boxWrap}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.sider}>
          <Sider droppableId="COMPONENTS" items={componentList} />
        </div>
        <div className={styles.worker}>
          <Worker items={workerItems} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default connect(({ generator }) => ({
  codeTree: generator.codeTree,
  componentList: generator.componentList,
}))(Index);
