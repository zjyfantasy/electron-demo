import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { createElement, getDataType } from '@/utils/utils';

const Index = (props) => {
  const { overlay, children, ['data-item']: dataItem, className } = props;
  const menu = (
    <Menu>
      {overlay.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );
  const childrenDataType = getDataType(children);
  return (
    <div className={className} data-item={dataItem}>
      <Dropdown {...props} overlay={menu}>
        {childrenDataType === 'Array' ? createElement(children[0]) : children}
        {/* {createElement(children[0])} */}
      </Dropdown>
    </div>
  );
};

export default Index;
