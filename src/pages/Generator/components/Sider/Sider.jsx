import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import styles from './index.less';

const Index = ({ droppableId, items, className }) => {
  // This method is needed for rendering clones of draggables
  const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    return (
      <React.Fragment>
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={provided.draggableProps.style}
          className={classnames(styles.listItem, { dragging: snapshot.isDragging })}
        >
          {item.content}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Droppable
      renderClone={getRenderItem(items, className)}
      droppableId={droppableId}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={className}>
          {items.map((item, index) => {
            const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <div className="react-beatiful-dnd-copy">{item.content}</div>
                ) : (
                  <Draggable draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classnames(styles.listItem, { dragging: snapshot.isDragging })}
                        >
                          {item.content}
                        </div>
                      </React.Fragment>
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Index;
