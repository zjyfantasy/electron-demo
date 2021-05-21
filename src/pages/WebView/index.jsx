import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';

export default () => {
  return (
    <>
      <iframe className={styles.iframe} frameborder="0" framespacing="0" src="https://wx.qq.com/"></iframe>
    </>
  );
};
