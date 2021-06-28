import React from 'react';
import * as MyIcons from '@ant-design/icons';

const Index = (props) => {
  const { ['data-item']: dataItem, className, type } = props;
  console.log(props);
  return React.createElement(MyIcons[type], props, null);
};

export default Index;
