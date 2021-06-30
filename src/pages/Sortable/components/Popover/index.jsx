import React from 'react';
import { Popover, Button } from 'antd';
import { cloneDeep } from 'lodash';
import {
  jsx2function,
  loopTreeDataAny,
  json2react,
  getDataType,
  createElement,
} from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { children, ['data-item']: dataItem, content, title, getPopupContainer } = props;
  const renderMethod = jsx2function(getPopupContainer);

  const isValidElement = React.isValidElement(children);
  let jsx = children;
  if (!isValidElement) {
    const childrenCopy = cloneDeep(children);
    loopTreeDataAny(
      childrenCopy,
      (item) => ((item.type = item.name), (item.props['data-item'] = JSON.stringify(item))),
    );
    jsx = json2react(childrenCopy[0]);
  }

  return (
    <div className={'inline-block'} data-item={dataItem}>
      <Popover
        {...props}
        data-item={dataItem}
        content={content}
        title={title}
        getPopupContainer={renderMethod}
      >
        {jsx}
      </Popover>
    </div>
  );
};

export default Index;
