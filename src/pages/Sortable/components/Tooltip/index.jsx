import React from 'react';
import { Tooltip, Button } from 'antd';
import { cloneDeep } from 'lodash';
import {
  jsx2function,
  loopTreeDataAny,
  json2react,
} from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { children, ['data-item']: dataItem, title, getPopupContainer } = props;
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
      <Tooltip
        {...props}
        data-item={dataItem}
        title={title}
        getPopupContainer={renderMethod}
      >
        {jsx}
      </Tooltip>
    </div>
  );
};

export default Index;
