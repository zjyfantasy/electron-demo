import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function, loopTreeDataAny, json2react, getDataType } from '@/utils/utils';
import styles from './index.less';

const Index = (props) => {
  const [visible, setVisible] = useState(true);
  console.log(props);
  const { children, ['data-item']: dataItem, title, placement, getContainer } = props;
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

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className={styles['site-drawer-render-in-current-wrapper']}>
      <Drawer
        {...props}
        data-item={dataItem}
        title={title}
        placement={placement}
        getContainer={renderMethod}
        onClose={onClose}
        visible={visible}
        style={{ position: 'absolute' }}
      >
        {jsx}
      </Drawer>
    </div>
  );
};

export default Index;
