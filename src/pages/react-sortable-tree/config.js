export default [
  {
    name: 'Button',
    componentType: 'text',
    defaultProps: { className: 'inline-block' },
    props: { content: 'Button' },
    children: [],
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
    props: { content: 'Title' },
    children: [],
  },
  {
    name: 'Text',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { content: 'text' },
    children: [],
  },
  {
    name: 'Link',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { content: 'text' },
    children: [],
  },
  {
    name: 'Paragraph',
    componentType: 'container',
    defaultProps: { className: 'block' },
    props: { content: 'Paragraph' },
    children: [],
  },
  {
    name: 'Divider',
    componentType: 'text',
    defaultProps: { className: 'block' },
    props: { content: 'Divider' },
    children: [],
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
    children: [],
  },
  {
    name: 'Affix',
    componentType: 'container',
    disableDrag: true,
    defaultProps: {},
    props: { className: 'inline-block' },
    children: [],
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
    props: { label: 'Checkbox' },
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
      okText: '??????',
      cancelText: '??????',
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
