import { message } from 'antd';
import { queryImagesList, getFile, deleteFile, upload } from '@/services/album';

export default {
  namespace: 'album',
  state: {
    imageList: [],
    imageData: '',
    showImgModal: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  },
  subscriptions: {},
  effects: {
    *queryList({ payload }, { select, call, put }) {
      const pagination = yield select(({ album }) => album.pagination);
      const response = yield call(queryImagesList);
      yield put({
        type: 'save',
        payload: {
          imageList: response,
          pagination: {
            ...pagination,
            total: response?.length,
          },
        },
      });
      return response;
    },
    *getFile({ payload }, { select, call, put }) {
      const response = yield call(getFile, payload);
      if (response?.sha) {
        yield put({
          type: 'save',
          payload: {
            imageData: response,
            showImgModal: true,
          },
        });
      } else {
        message.error('获取失败！');
      }

      return response;
    },
    *deleteFile({ payload }, { select, call, put }) {
      const response = yield call(deleteFile, payload);
      if (response?.commit?.sha) {
        message.success('删除成功');
        yield put({
          type: 'queryList',
          payload: {},
        });
      } else {
        message.error('删除失败');
      }
      return response;
    },
    *upload({ payload }, { select, call, put }) {
      const response = yield call(upload, payload);
      if (response?.commit?.sha) {
        message.success('上传成功！');
      } else {
        message.error('上传失败！');
      }
      return response;
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
