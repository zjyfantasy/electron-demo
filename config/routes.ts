export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        // component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/earth',
                name: 'earth',
                component: './Earth',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
                hideInMenu:true,
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
                hideInMenu:true,
              },
              {
                name: 'editor',
                icon: 'table',
                path: '/editor',
                component: './Editor',
              },
              {
                name: 'album',
                icon: 'table',
                path: '/album',
                routes: [
                  {
                    name: 'album',
                    path: '/album/index',
                    icon: 'smile',
                    component: './Album',
                    exact: true
                  },
                  {
                    name: 'upload',
                    path: '/album/upload',
                    icon: 'smile',
                    component: './Album/Upload',
                    exact: true
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
