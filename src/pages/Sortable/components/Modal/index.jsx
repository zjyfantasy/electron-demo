import React, { useState } from 'react';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function, loopTreeDataAny, json2react, getDataType } from '@/utils/utils';

const Index = (props) => {
  const [visible, setVisible] = useState(true);
  console.log(props);
  const { children, ['data-item']: dataItem, title, getContainer } = props;
  const dataType = getDataType(getContainer);
  let renderMethod;
  if (dataType === 'Boolean') {
    renderMethod = getContainer;
  } else if (dataType === 'String') {
    renderMethod = jsx2function(getContainer);
  }

  let jsx = children;
  if (children && children.length) {
    const isValidElement = children.every((item) => React.isValidElement(item));
    if (!isValidElement) {
      const childrenCopy = cloneDeep(children);
      loopTreeDataAny(
        childrenCopy,
        (item) => ((item.type = item.name), (item.props['data-item'] = JSON.stringify(item))),
      );
      jsx = json2react({ type: 'div', children: childrenCopy });
    }
  }

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      {...props}
      data-item={dataItem}
      title={title}
      getContainer={renderMethod}
      onCancel={onCancel}
      visible={visible}
    >
      {jsx}
    </Modal>
  );
};

export default Index;
