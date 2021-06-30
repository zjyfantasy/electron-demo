import React from 'react';
import { Tree } from 'antd';
import { cloneDeep } from 'lodash';
import { jsx2function } from '@/utils/utils';

const Index = (props) => {
  console.log(props);
  const { checkable, ['data-item']: dataItem, onSelect, onCheck, treeData } = props;

  const onSelectFunc = jsx2function(onSelect);
  const onCheckFunc = jsx2function(onCheck);
  return (
    <Tree checkable={checkable} onSelect={onSelectFunc} onCheck={onCheckFunc} treeData={treeData} />
  );
};

export default Index;
