import React, { useEffect, useState } from 'react';
import { Form, Select, Row, Col, Card, Button } from 'antd';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';

export default () => {
  const [monacoInstance, setmonacoInstance] = useState(null);
  const [srcDoc, setsrcDoc] = useState('');
  useEffect(() => {
    const instance = monaco.editor.create(document.getElementById('editor'), {
      value: ``,
      language: 'javascript',
      theme: 'vs-dark',
    });
    setmonacoInstance(instance);
  }, []);

  const handleLanguageChange = (value) => {
    console.log(`selected ${value}`);
    monaco.editor.setModelLanguage(monacoInstance.getModel(), value);
  };

  const handleThemeChange = (value) => {
    console.log(`selected ${value}`);
    monaco.editor.setTheme(value);
  };
  const handleRun = () => {
    setsrcDoc(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
    </head>
    <body>
        <div>111</div>
        <input />
    </body>
    </html>`);
  };
  return (
    <PageContainer>
      <Card className={styles.container}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="language" label="语言">
                <Select
                  placeholder=""
                  defaultValue={'javascript'}
                  getPopupContainer={(e) => e.parentNode}
                  defaultActiveFirstOption={false}
                  onChange={handleLanguageChange}
                >
                  <Option value="javascript">javascript</Option>
                  <Option value="json">json</Option>
                  <Option value="html">html</Option>
                  <Option value="css">css</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="theme" label="主题">
                <Select
                  placeholder=""
                  defaultValue={'vs-dark'}
                  getPopupContainer={(e) => e.parentNode}
                  defaultActiveFirstOption={false}
                  onChange={handleThemeChange}
                >
                  <Option value="vs-dark">vs-dark</Option>
                  <Option value="vs">vs</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button onClick={handleRun}>Run</Button>
            </Col>
          </Row>
        </Form>
        <div id="editor" className={styles.editor}></div>
        <iframe class={styles.iframe} frameBorder={0} srcDoc={srcDoc}></iframe>
      </Card>
    </PageContainer>
  );
};
