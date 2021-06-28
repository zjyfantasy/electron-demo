import { v4 as uuid } from 'uuid';
import {
  Button,
  Divider,
  Row,
  Col,
  Space,
  Form,
  Input,
  Layout,
  Menu,
  Typography,
  Affix,
  Breadcrumb,
  PageHeader,
  Pagination,
} from 'antd';
import Dropdown from './components/Dropdown';
// import Menu from './components/Menu';
import Icon from './components/Icon';

const FormItem = Form.Item;
const { Header, Footer, Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

const { Title, Text, Link, Paragraph } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;

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
  Affix,
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
  Breadcrumb,
  BreadcrumbItem,
  PageHeader,
  Pagination,
};

export default [
  {
    name: 'Button',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: 'Button',
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
    name: 'Affix',
    componentType: 'container',
    disableDrag: true,
    defaultProps: {},
    props: { className: 'inline-block' },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: ['Affix'],
      },
    ],
  },
  {
    name: 'Breadcrumb',
    componentType: 'container',
    defaultProps: {},
    props: { className: 'block' },
    children: [],
  },
  {
    name: 'BreadcrumbItem',
    componentType: 'container',
    defaultProps: {},
    props: { className: 'inline-block' },
    children: ['BreadcrumbItem'],
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
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'Input',
    componentType: 'text',
    disableDrag: true,
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
        children: '1',
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
  {
    name: 'PageHeader',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { title: 'Title', subTitle: 'This is a subtitle', onBack: () => {} },
  },
  {
    name: 'Pagination',
    componentType: 'text',
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: { current: 1, pageSize: 10, total: 50 },
  },
];

export { allComponents };
