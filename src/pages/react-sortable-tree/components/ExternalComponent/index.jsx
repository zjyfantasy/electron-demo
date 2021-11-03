import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DndProvider, DragSource } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

// -------------------------
// Create an drag source component that can be dragged into the tree
// https://react-dnd.github.io/react-dnd/docs-drag-source.html
// -------------------------
// This type must be assigned to the tree via the `dndType` prop as well
const externalNodeType = 'EXTERNAL_NODE';
const externalNodeSpec = {
  // This needs to return an object with a property `node` in it.
  // Object rest spread is recommended to avoid side effects of
  // referencing the same object in different trees.
  beginDrag: (componentProps) => ({ node: { ...componentProps.node } }),
};
const externalNodeCollect = (connect /* , monitor */) => ({
  connectDragSource: connect.dragSource(),
  // Add props via react-dnd APIs to enable more visual
  // customization of your component
  // isDragging: monitor.isDragging(),
  // didDrop: monitor.didDrop(),
});
class externalNodeBaseComponent extends Component {
  render() {
    const { connectDragSource, node } = this.props;

    return connectDragSource(
      <div
        style={{
          padding: '3px 5px',
          border: '1px solid #ccc',
          width: '120px',
          textAlign: 'center',
          margin: '3px 0',
        }}
      >
        {node.title}
      </div>,
      { dropEffect: 'copy' },
    );
  }
}
externalNodeBaseComponent.propTypes = {
  node: PropTypes.shape({ title: PropTypes.string }).isRequired,
  connectDragSource: PropTypes.func.isRequired,
};
const ExternalComponent = DragSource(
  externalNodeType,
  externalNodeSpec,
  externalNodeCollect,
)(externalNodeBaseComponent);

export default ExternalComponent;
export { externalNodeType };
