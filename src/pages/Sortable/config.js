import { v4 as uuid } from 'uuid';
import { Button, Divider, Row, Col, Space, Form, Input, Layout, Menu, Typography } from 'antd';
import Dropdown from './components/Dropdown';
// import Menu from './components/Menu';
import Icon from './components/Icon';

const FormItem = Form.Item;
const { Header, Footer, Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

const { Title, Text, Link, Paragraph } = Typography;

const allComponents = {
  Button,
  Icon,
  Title,
  Text,
  Link,
  Paragraph,
  Divider,
  Row,
  Col,
  Space,
  Form,
  FormItem,
  Input,
  Dropdown,
  Layout,
  Header,
  Footer,
  Sider,
  Content,
  Menu,
  MenuItem,
};

export default [
  {
    name: 'Button',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: ['Button'],
  },
  {
    name: 'Icon',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { type: 'StepBackwardOutlined' },
  },
  {
    name: 'Title',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: 'Title',
  },
  {
    name: 'Text',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: 'Text',
  },
  {
    name: 'Link',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: 'Link',
  },
  {
    name: 'Paragraph',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: 'Paragraph',
  },
  {
    name: 'Divider',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {},
    children: 'Divider',
  },
  {
    name: 'Row',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'Col',
    componentType: 'container',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: [],
  },
  {
    name: 'Space',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { size: 'small' },
    children: [''],
  },
  {
    name: 'Form',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'FormItem',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'Input',
    componentType: 'text',
    defaultProps: { className: 'inline-block vw' },
    props: {},
  },
  {
    name: 'Dropdown',
    componentType: 'text',
    defaultProps: {
      arrow: true,
      placement: 'bottomCenter',
    },
    props: { className: 'inline-block', overlay: [1, 2, 3] },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: ['Dropdown'],
      },
    ],
  },
  // {
  //   name: 'Layout',
  //   componentType: 'container',
  //   defaultProps: { className: 'block' },
  //   props: {},
  //   children: [],
  // },
  // {
  //   name: 'Header',
  //   componentType: 'container',
  //   defaultProps: { className: 'block' },
  //   props: {},
  //   children: [],
  // },
  // {
  //   name: 'Footer',
  //   componentType: 'container',
  //   defaultProps: { className: 'block' },
  //   props: {},
  //   children: [],
  // },
  // {
  //   name: 'Sider',
  //   componentType: 'container',
  //   defaultProps: { className: 'block' },
  //   props: {},
  //   children: [],
  // },
  // {
  //   name: 'Content',
  //   componentType: 'container',
  //   defaultProps: { className: 'block' },
  //   props: {},
  //   children: [],
  // },
  {
    name: 'Menu',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: [
      {
        name: 'MenuItem',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: {},
        children: ['1'],
      },
      {
        name: 'MenuItem',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: {},
        children: '2',
      },
    ],
  },
];

export { allComponents };
