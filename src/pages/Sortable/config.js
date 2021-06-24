import { v4 as uuid } from 'uuid';
import { Button, Icon, Divider, Row, Col, Space, Form, Input } from 'antd';
import Dropdown from './components/Dropdown';
const FormItem = Form.Item;

const allComponents = { Button, Icon, Divider, Row, Col, Space, Form, FormItem, Input, Dropdown };

export default [
  {
    name: 'Button',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { displayname: 'Button' },
    children: ['Button'],
  },
  {
    name: 'Divider',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { displayname: 'Divider' },
    children: 'Divider',
  },
  {
    name: 'Row',
    componentType: 'container',
    children: [],
    defaultProps: { className: 'block' },
    props: { displayname: 'Row' },
  },
  {
    name: 'Col',
    componentType: 'container',
    children: [],
    defaultProps: { className: 'inline-block' },
    props: { displayname: 'Col' },
  },
  {
    name: 'Space',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'Space', size: 'small' },
    children: [''],
  },
  {
    name: 'Form',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'Form' },
    children: [],
  },
  {
    name: 'FormItem',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { displayname: 'FormItem' },
    children: [],
  },
  {
    name: 'Input',
    componentType: 'text',
    defaultProps: { className: 'inline-block vw' },
    props: { displayname: 'Input' },
  },
  {
    name: 'Dropdown',
    componentType: 'text',
    defaultProps: {
      className: 'inline-block',
      arrow: true,
      placement: 'bottomCenter',
    },
    props: { displayname: 'Dropdown', overlay: [1, 2, 3] },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: { displayname: 'Button' },
        children: ['Dropdown'],
      },
    ],
  },
];

export { allComponents };
