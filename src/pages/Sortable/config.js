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
  Steps,
  Checkbox,
  DatePicker,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
  Avatar,
  Badge,
  Calendar,
  Card,
  Carousel,
  Collapse,
  Descriptions,
} from 'antd';

import Dropdown from './components/Dropdown';
import Icon from './components/Icon';
import Transfer from './components/Transfer';
import React from 'react';

const FormItem = Form.Item;
const { Header, Footer, Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

const { Title, Text, Link, Paragraph } = Typography;
const { Item: BreadcrumbItem } = Breadcrumb;
const { Step } = Steps;
const { Option: SelectOption } = Select;
const { TreeNode } = TreeSelect;
const { Panel } = Collapse;
const { Item: DescriptionsItem } = Descriptions;
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
  Steps,
  Step,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  Rate,
  Select,
  SelectOption,
  Slider,
  Switch,
  Transfer,
  TreeSelect,
  TreeNode,
  Upload,
  Avatar,
  Badge,
  Calendar,
  Card,
  Carousel,
  Collapse,
  Panel,
  Descriptions,
  DescriptionsItem,
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
    props: { span: 4 },
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
    // disableDrag: true,
    defaultProps: { className: '' },
    props: {},
  },
  {
    name: 'Select',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      className: 'vw',
    },
    children: [
      {
        name: 'SelectOption',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: {},
        children: 'SelectOption',
      },
    ],
  },
  {
    name: 'Checkbox',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: 'Checkbox',
  },
  {
    name: 'Radio',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: 'Radio',
  },
  {
    name: 'Rate',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
  },
  {
    name: 'DatePicker',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
  },
  {
    name: 'TimePicker',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
  },
  {
    name: 'Calendar',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
  },

  {
    name: 'Slider',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { defaultValue: 30 },
  },
  {
    name: 'Switch',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
  },
  {
    name: 'Transfer',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      dataSource: [
        { key: 1, title: 'content 1' },
        { key: 2, title: 'content 2' },
        { key: 3, title: 'content 3' },
      ],
      titles: ['Source', 'Target'],
    },
  },
  {
    name: 'TreeSelect',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { className: 'vw' },
    children: [
      {
        name: 'TreeNode',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { value: 'parent 1', title: 'parent 1' },
        children: [
          {
            name: 'TreeNode',
            componentType: 'text',
            defaultProps: { className: 'block' },
            props: { value: 'leaf1', title: 'leaf1' },
          },
        ],
      },
    ],
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
  {
    name: 'Upload',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: ['Upload'],
      },
    ],
  },
  {
    name: 'Avatar',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { shape: 'square', size: 'default', icon: 'icon' },
  },
  {
    name: 'Badge',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'inline-block' },
    props: { count: 3, dot: false },
    children: [
      {
        name: 'Button',
        componentType: 'container',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: ['Badge'],
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
    disableDrag: true,
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
  {
    name: 'Steps',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { current: 0 },
    children: [
      {
        name: 'Step',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {
          titlt: 'Step 1',
          subTitle: 'This is a subTitle.',
          description: 'This is a description.',
        },
      },
      {
        name: 'Step',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {
          titlt: 'Step 2',
          subTitle: 'This is a subTitle.',
          description: 'This is a description.',
        },
      },
    ],
  },
  {
    name: 'Card',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'Carousel',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {},
    children: [
      {
        name: 'div',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { className: 'carousel' },
        children: '1',
      },
      {
        name: 'div',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { className: 'carousel' },
        children: '2',
      },
    ],
  },
  {
    name: 'Collapse',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {},
    children: [
      {
        name: 'Panel',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { header: 'This is panel header', key: '1' },
        children: [
          {
            name: 'p',
            componentType: 'container',
            props: {},
            children: ['Panel Content'],
          },
        ],
      },
    ],
  },
  {
    name: 'Descriptions',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: { title: 'User Info' },
    children: [
      {
        name: 'DescriptionsItem',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { label: 'UserName' },
        children: ['Zhou Maomao'],
      },
      {
        name: 'DescriptionsItem',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { label: 'Telephone' },
        children: ['1810000000'],
      },
    ],
  },
];

export { allComponents };
