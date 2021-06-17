import { v4 as uuid } from 'uuid';
import { Button, Icon, Divider, Row, Col, Space } from 'antd';
export default [
  {
    id: uuid(),
    content: 'Button',
    name: 'Button',
    type: 'text',
  },
  {
    id: uuid(),
    content: 'Affix',
    name: 'Affix',
    type: 'container',
    children: [{ id: uuid(), content: 'Button', name: 'Button', type: 'text' }],
  },
  { id: uuid(), content: 'Divider', name: 'Divider', type: 'text' },
  {
    id: uuid(),
    content: 'Row',
    name: 'Row',
    type: 'container',
    children: [],
    defaultProps: { gutter: 0 },
    props: {},
  },
  {
    id: uuid(),
    content: 'Col',
    name: 'Col',
    type: 'container',
    children: [],
    defaultProps: { span: 4 },
    props: {},
  },
  {
    id: uuid(),
    content: 'Space',
    name: 'Space',
    type: 'container',
    children: [],
  },
];

const allComponents = { Button, Icon, Divider, Row, Col, Space };

export { allComponents };
