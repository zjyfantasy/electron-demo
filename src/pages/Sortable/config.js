import { v4 as uuid } from 'uuid';
import { Button, Icon, Divider, Row, Col, Space, Form, Input, Dropdown } from 'antd';
const FormItem = Form.Item;

const allComponents = { Button, Icon, Divider, Row, Col, Space, Form, FormItem, Input, Dropdown };

export default [
  {
    content: 'Button',
    name: 'Button',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { displayname: 'Button' },
    children: ['Button'],
  },
  {
    content: 'Divider',
    name: 'Divider',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { displayname: 'Divider' },
    children: 'Divider',
  },
  {
    content: 'Row',
    name: 'Row',
    componentType: 'container',
    children: [],
    defaultProps: { className: 'block' },
    props: { displayname: 'Row' },
  },
  {
    content: 'Col',
    name: 'Col',
    componentType: 'container',
    children: [],
    defaultProps: { className: 'inline-block' },
    props: { displayname: 'Col' },
  },
  {
    content: 'Space',
    name: 'Space',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'Space', size: 'small' },
    children: [''],
  },
  {
    content: 'Form',
    name: 'Form',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'Form' },
    children: [],
  },
  {
    content: 'FormItem',
    name: 'FormItem',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'FormItem' },
    children: [],
  },
  {
    content: 'Input',
    name: 'Input',
    componentType: 'text',
    defaultProps: { className: 'inline-block vw' },
    props: { displayname: 'Input' },
  },
  {
    content: 'Dropdown',
    name: 'Dropdown',
    componentType: 'container',
    defaultProps: { className: 'inline-block' },
    props: { displayname: 'Dropdown', overlay: ['1'] },
    children: [''],
  },
];

export { allComponents };
