import { message } from 'antd';
import { v4 as uuid } from 'uuid';
import config, { allComponents } from './config';

export default {
  namespace: 'sortable',
  state: {
    allComponents,
    codeTree: [],
    domStack: [],
    componentList: config,
    selectedComponentData: {},
  },
  subscriptions: {},
  effects: {},
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
