import React from 'react';
import { Menu } from 'antd';
import { createElement, getDataType } from '@/utils/utils';

const MenuItem = Menu.Item;

const Index = (props) => {
  const { children, ['data-item']: dataItem, className } = props;
  console.log(children);
  const childrenDataType = getDataType(children);
  return (
    <div className={className} data-item={dataItem}>
      <Menu {...props}>
        {/* {childrenDataType === 'Array'
          ? children.map((item) => (
              <MenuItem key={item.name} data-item={JSON.stringify(item)}>
                {item.name}
              </MenuItem>
            ))
          : children} */}
        {children}
      </Menu>
    </div>
  );
};

export default Index;
