import React from 'react';
import { List } from 'antd';
import { jsx2function } from '@/utils/utils';

const Index = (props) => {
  const { bordered, ['data-item']: dataItem, dataSource, footer, header, renderItem } = props;
  const renderMethod = jsx2function(renderItem);
  return (
    <List
      data-item={dataItem}
      header={<div>{header}</div>}
      footer={<div>{footer}</div>}
      bordered={bordered}
      dataSource={dataSource}
      renderItem={(item) => renderMethod(item, List)}
    />
  );
};

export default Index;
