import React from 'react';
import { Result } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function, loopTreeDataAny, json2react, getDataType } from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { extra, title } = props;

  let jsx = extra;
  if (extra && extra.length) {
    const isValidElement = extra.every((item) => React.isValidElement(item));
    if (!isValidElement) {
      const extraCopy = cloneDeep(extra);
      loopTreeDataAny(
        extraCopy,
        (item) => ((item.type = item.name), (item.props['data-item'] = JSON.stringify(item))),
      );
      jsx = json2react({ type: 'div', children: extraCopy });
    }
  }

  return <Result {...props} title={title} extra={jsx} />;
};

export default Index;
