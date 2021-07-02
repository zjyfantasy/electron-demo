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
  Empty,
  Image,
  Statistic,
  Tabs,
  Tag,
  Timeline,
  Alert,
  Progress,
  Skeleton,
  Spin,
} from 'antd';

import Dropdown from './components/Dropdown';
import Icon from './components/Icon';
import Transfer from './components/Transfer';
import List from './components/List';
import Popover from './components/Popover';
import Tooltip from './components/Tooltip';
import Popconfirm from './components/Popconfirm';
import Table from './components/Table';
import Tree from './components/Tree';
import Drawer from './components/Drawer';
import Modal from './components/Modal';
import Result from './components/Result';

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
const { TabPane } = Tabs;
const { Item: TimelineItem } = Timeline;

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
  Empty,
  Image,
  List,
  Popover,
  Statistic,
  Table,
  Tabs,
  TabPane,
  Tag,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  Progress,
  Result,
  Skeleton,
  Spin,
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: `(text) => <a>{text}</a>`,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: `(text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )`,
  },
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'sss', key: '0-0-1-0' }],
      },
    ],
  },
];

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
  {
    name: 'Empty',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {},
  },
  {
    name: 'Image',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {
      width: 200,
      src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    },
  },
  {
    name: 'List',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      header: 'Header',
      footer: 'Footer',
      bordered: true,
      dataSource: ['Item 1', 'Item 2', 'Item 3'],
      renderItem: `(item, List) => {
        return <List.Item>{item}</List.Item>;
      }`,
    },
  },
  {
    name: 'Popover',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'inline-block' },
    props: {
      title: 'Title',
      content: 'content',
      trigger: 'hover',
      getPopupContainer: `(e)=>e.parentNode`,
    },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: 'Popover',
      },
    ],
  },
  {
    name: 'Tooltip',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'inline-block' },
    props: {
      title: 'Title',
      trigger: 'hover',
      getPopupContainer: `(e)=>e.parentNode`,
    },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: 'Tooltip',
      },
    ],
  },
  {
    name: 'Popconfirm',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: {
      title: 'Popconfirm?',
      trigger: 'click',
      getPopupContainer: `(e)=>e.parentNode`,
      okText: '确定',
      cancelText: '取消',
    },
    children: [
      {
        name: 'Button',
        componentType: 'text',
        defaultProps: { className: 'inline-block' },
        props: {},
        children: 'Popconfirm',
      },
    ],
  },
  {
    name: 'Statistic',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      title: 'Account Balance (CNY)',
      value: 112893,
      precision: 2,
    },
  },
  {
    name: 'Table',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      columns,
      dataSource,
    },
  },
  {
    name: 'Tabs',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {},
    children: [
      {
        name: 'TabPane',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { tab: 'Tab1', key: '1' },
        children: ['Tab Pane1'],
      },
      {
        name: 'TabPane',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: { tab: 'Tab2', key: '2' },
        children: ['Tab Pane2'],
      },
    ],
  },
  {
    name: 'Tag',
    componentType: 'container',
    defaultProps: { className: 'inline-block' },
    props: {},
    children: [],
  },
  {
    name: 'Timeline',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: {},
    children: [],
  },
  {
    name: 'TimelineItem',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: {},
    children: ['TimelineItem'],
  },
  {
    name: 'Tree',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: {
      checkable: true,
      onSelect: `(selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      }`,
      onCheck: `(checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
      }`,
      treeData,
    },
  },
  {
    name: 'Alert',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { message: 'Success Text', type: 'success' },
  },
  {
    name: 'Drawer',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { className: 'block' },
    props: { title: 'Basic Drawer', placement: 'right', visible: true, getContainer: false },
    children: [
      {
        name: 'p',
        componentType: 'container',
        defaultProps: { className: 'block' },
        props: {},
        children: 'text',
      },
    ],
  },
  {
    name: 'Modal',
    componentType: 'container',
    disableDrag: true,
    defaultProps: { wrapClassName: 'ant-modal-root-rewrite', mask: false },
    props: { title: 'Basic Modal', visible: true, getContainer: false },
    children: [],
  },
  {
    name: 'Progress',
    componentType: 'text',
    defaultProps: {},
    props: { percent: 30 },
  },
  {
    name: 'Result',
    componentType: 'text',
    defaultProps: {},
    props: {
      status: 'success',
      title: 'Successfully Purchased Cloud Server ECS!',
      subTitle:
        'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
      extra: [
        {
          name: 'Button',
          componentType: 'text',
          defaultProps: { className: 'inline-block' },
          props: {},
          children: 'Button',
        },
      ],
    },
  },
  {
    name: 'Skeleton',
    componentType: 'text',
    defaultProps: {},
    props: { avatar: true, paragraph: { rows: 2 } },
  },
  {
    name: 'Spin',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { size: 'middle' },
  },
];

const mapTypeToComponent = (type, props) => {
  if (Object.keys(allComponents).includes(type)) {
    return allComponents[type];
  }
  return type;
};

Object.keys(allComponents).forEach((key) => (window[key] = allComponents[key]));

export { allComponents, mapTypeToComponent };
