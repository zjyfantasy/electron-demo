import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import {
  Form,
  Row,
  Col,
  Card,
  List,
  Button,
  Image,
  Modal,
  Spin,
  Pagination,
  Table,
  Space,
  Input,
} from 'antd';
import styles from './index.less';

const Index = ({ dispatch, imageList, imageData, showImgModal, loading, pagination, history }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'album/queryList',
    });
  }, []);

  console.log(imageList, imageData);
  const handleView = (item) => {
    dispatch({
      type: 'album/getFile',
      payload: item.url,
    });
  };

  const handleDelete = (item) => {
    dispatch({
      type: 'album/deleteFile',
      payload: {
        fileName: item.name,
        data: {
          message: `delete ${item.name}`,
          sha: item.sha,
        },
      },
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'album/save',
      payload: { showImgModal: false },
    });
  };

  const onVisibleChange = (visible) => {
    console.log(visible);
  };

  const handlePageChange = (page) => {
    dispatch({
      type: 'album/save',
      payload: {
        pagination: {
          ...pagination,
          current: page,
        },
      },
    });
  };
  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleView(record)}>
            查看
          </Button>
          <Button danger type="ghost" onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const handleUpload = () => {
    history.push('/upload')
  }

  return (
    <PageContainer
      loading={loading}
      header={{
        extra: <Button type="primary" onClick={handleUpload}>上传</Button>,
      }}
    >
      <Form {...formItemLayout} layout="horizontal" form={form}>
        <Row>
          <Col span={8}>
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table pagination={pagination} columns={columns} dataSource={imageList} />
      <Modal
        className={styles.modal}
        title={imageData.name}
        visible={showImgModal}
        footer={null}
        onCancel={handleCancel}
      >
        <Image src={`data:image/png;base64,${imageData.content}`} preview={false} />
      </Modal>
    </PageContainer>
  );
};

export default connect(({ loading, album }) => ({
  loading: loading.effects['album/queryList'],
  imageList: album.imageList,
  imageData: album.imageData,
  showImgModal: album.showImgModal,
  pagination: album.pagination,
}))(Index);
