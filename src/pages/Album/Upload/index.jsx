import React from 'react';
import { Upload, message, Spin } from 'antd';
import { connect } from 'umi';
import { InboxOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';

const { Dragger } = Upload;
const Index = ({ dispatch, loading }) => {
  const customRequest = (file) => {
    console.log(file);
    imageToBase64(file);
    file.onSuccess = async (ret) => {
      const base64 = ret.split(',')[1];
      dispatch({
        type: 'album/upload',
        payload: {
          fileName: file.file.name,
          data: {
            message: `upload ${file.file.name}`,
            content: base64,
          },
        },
      });
    };
    file.onProgress = (e) => {
      console.log(e);
    };
    file.onError = (err, ret) => {
      console.log(err, ret);
    };
  };
  const props = {
    accept: '.jpg, .jpeg, .png',
    multiple: true,
    showUploadList: false,
    customRequest,
  };
  const imageToBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file.file);
    reader.onload = () => {
      file.onSuccess(reader.result);
    };
    reader.onerror = function (error) {
      file.onError(error);
    };
  };
  console.log('loading', loading);
  return (
    <PageContainer loading={loading}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined className={styles.icon} />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['album/upload'],
}))(Index);
