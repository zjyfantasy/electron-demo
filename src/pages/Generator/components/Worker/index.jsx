import React from 'react';
import { Card } from 'antd';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import classnames from 'classnames';
import { allComponents } from '../../config';
import styles from './index.less';

const DroppableWrap = ({ item, index }) => {
  const onDragEnd = (result) => {
    console.log(result);
  };
  console.log(item, index);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={item.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classnames(styles.worker, {
              [styles.draggingOver]: snapshot.isDraggingOver,
            })}
          >
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                  className={classnames(styles.listItem, {
                    [styles.draggingOver]: snapshot.isDragging,
                  })}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Index = ({ items }) => {
  console.log(module);
  return (
    <Droppable droppableId="WORKER" isCombineEnabled>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={classnames(styles.worker, { [styles.draggingOver]: snapshot.isDraggingOver })}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                  className={classnames(styles.listItem, {
                    [styles.draggingOver]: snapshot.isDragging,
                  })}
                >
                  {/* <DroppableWrap item={item} index={index} /> */}
                  {item.content}
                  {/* {React.createElement(allComponents[item.name], null, item.content)} */}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default connect()(Index);
