import React from 'react';
import { Table } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function } from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { columns, ['data-item']: dataItem, dataSource } = props;
  const columnsCopy = cloneDeep(columns);
  columnsCopy.forEach((item) => {
    if (item.render) {
      item.render = jsx2function(item.render);
    }
  });
  return <Table data-item={dataItem} columns={columnsCopy} dataSource={dataSource} />;
};

export default Index;
