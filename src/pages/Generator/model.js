import { message } from 'antd';
import { v4 as uuid } from 'uuid';
import config, { allComponents } from './config';

export default {
  namespace: 'generator',
  state: {
    allComponents,
    codeTree: {},
    componentList: config,
  },
  subscriptions: {},
  effects: {},
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
