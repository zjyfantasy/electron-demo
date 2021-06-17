import React, { createRef, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { Form, Select, Row, Col, Card, Button } from 'antd';
import * as babel from '@babel/standalone';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
const { Option } = Select;
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { Resizable, ResizableBox } from 'react-resizable';
import Example from './Example';

export default () => {
  const previewRef = createRef();
  const [monacoInstance, setmonacoInstance] = useState(null);
  const [modelContent, setmodelContent] = useState('<Card className={styles.card}>defrgg</Card>');
  const [srcDoc, setsrcDoc] = useState('');
  const [transformCode, settransformCode] = useState('');
  useEffect(() => {
    const instance = monaco.editor.create(document.getElementById('editor'), {
      value: `${modelContent}`,
      language: 'javascript',
      theme: 'vs-dark',
    });
    instance.onDidChangeModelContent((event) => {
      const newValue = instance.getValue();
      setmodelContent(newValue);
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
    const transCode = babel.transform(
      `
      import { Card } from 'antd';
      import styles from './index.less';

      <Card className={styles.card}><div>Hello, world!</div></Card>
    `,
      { presets: ['env', 'react'], plugins: ['transform-react-jsx'] },
    ).code;
    settransformCode(transCode);
    const htmlStr = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          ${transCode}
        </script>
      </body>
    </html>
    `;
    console.log(transCode);
  };

  return (
    <PageContainer waterMarkProps={{ content: '' }}>
      <Card className={styles.container}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="language" label="语言" initialValue={'javascript'}>
                <Select
                  placeholder=""
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
              <Form.Item name="theme" label="主题" initialValue={'vs-dark'}>
                <Select
                  placeholder=""
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
        {/* <iframe className={styles.iframe} frameBorder={0} srcDoc={srcDoc}></iframe> */}
        {/* <div id="preview"></div> */}
        <LiveProvider code={modelContent} scope={{ Card, Button, styles }}>
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <ResponsiveGridLayout
          className={styles.gridLayout}
          width={1200}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ md: 24 }}
        >
          <div className="a" key="a" data-grid={{ x: 0, y: 0, w: 1, h: 2, resizeHandles: ['e'] }}>
            a
          </div>
          <div
            className="b"
            key="b"
            data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 1, maxW: 4, minH: 2, maxH: 2 }}
          >
            b
          </div>
          <div className="c" key="c" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
            c
          </div>
        </ResponsiveGridLayout>
        <ResizableBox
          width={800}
          height={200}
          draggableOpts={{}}
          minConstraints={[200, 200]}
          maxConstraints={[800, 200]}
        >
          <span>Contents</span>
        </ResizableBox>
        {/* <Example /> */}
      </Card>
    </PageContainer>
  );
};
