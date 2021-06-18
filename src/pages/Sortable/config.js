import { v4 as uuid } from 'uuid';
import { Button, Icon, Divider, Row, Col, Space, Form, Input, Dropdown } from 'antd';
const FormItem = Form.Item;

const allComponents = { Button, Icon, Divider, Row, Col, Space, FormItem, Input };

export default [
  {
    content: 'Button',
    name: 'Button',
    type: 'text',
    props: { displayname: 'Button' },
  },
  {
    content: 'Divider',
    name: 'Divider',
    type: 'text',
    props: { displayname: 'Divider' },
  },
  {
    content: 'Row',
    name: 'Row',
    type: 'container',
    children: [],
    props: { displayname: 'Row' },
  },
  {
    content: 'Col',
    name: 'Col',
    type: 'container',
    children: [],
    props: { displayname: 'Col' },
  },
  {
    content: 'Space',
    name: 'Space',
    type: 'container',
    props: { displayname: 'Space' },
    children: [],
  },
  {
    content: 'Form',
    name: 'Form',
    type: 'container',
    props: { displayname: 'Form' },
    children: [],
  },
  {
    content: 'FormItem',
    name: 'FormItem',
    type: 'container',
    props: { displayname: 'FormItem' },
    children: [],
  },
  {
    content: 'Input',
    name: 'Input',
    type: 'container',
    props: { displayname: 'Input' },
    children: [],
  },
  {
    content: 'Dropdown',
    name: 'Dropdown',
    type: 'container',
    props: { displayname: 'Dropdown', overlay: ['1'] },
    children: [],
  },
];

export { allComponents };
