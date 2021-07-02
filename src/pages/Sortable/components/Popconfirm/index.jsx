import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function, loopTreeDataAny, json2react, getDataType } from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { children, ['data-item']: dataItem, title, getPopupContainer } = props;
  const dataType = getDataType(getPopupContainer);
  let renderMethod;
  if (dataType === 'Boolean') {
    renderMethod = getPopupContainer;
  } else if (dataType === 'String') {
    renderMethod = jsx2function(getPopupContainer);
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

  const onCancel = () => {};

  return (
    <div className={'inline-block'} data-item={dataItem}>
      <Popconfirm
        {...props}
        data-item={dataItem}
        title={title}
        getPopupContainer={renderMethod}
        onCancel={onCancel}
      >
        {jsx}
      </Popconfirm>
    </div>
  );
};

export default Index;
