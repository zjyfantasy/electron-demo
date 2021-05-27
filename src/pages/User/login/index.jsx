import React, { createRef } from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import styles from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  componentDidMount() {
    const { setFieldsValue, resetFields } = this.formRef.current;
    const remember = localStorage.getItem('remember');
    if (remember) {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      setFieldsValue({ username, password, remember });
    } else {
      resetFields();
      // 默认记住密码
      // setFieldsValue({ remember: true });
    }
  }

  onFinish = (values) => {
    const { dispatch, history } = this.props;
    const { remember, username, password } = values;
    localStorage.setItem('remember', remember);
    if (remember) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
    const params = {
      ...values,
      remember: Number(values.remember),
    };
    dispatch({
      type: 'login/login',
      payload: { ...values, type: 'account' },
    });
    // history.push('/');
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { loading } = this.props;
    const layout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    const tailLayout = {
      wrapperCol: { offset: 0, span: 24 },
    };
    console.log('loading', loading);
    return (
      <div className={styles.container}>
        <Spin size="large" spinning={!!loading}>
          <div className={styles.login}>
            <div className={styles.title}>美图100</div>
            <Form
              {...layout}
              ref={this.formRef}
              name="basic"
              className={styles.form}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号!' }]}>
                <Input size="large" autoComplete="off" placeholder="请输入账号" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input type="password" size="large" placeholder="请输入密码" />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
                className={styles.remember}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" size="large" htmlType="submit" block className={styles.btn}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    );
  }
}

export default connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))(Index);
