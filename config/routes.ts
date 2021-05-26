export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
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
            
            routes: [
              {
                path: '/',
                redirect:'/dashboard',
                
              },
              {
                path: '/dashboard',
                name:'dashboard',
                icon:'BarChartOutlined',
                component:'@/pages/DashBoard'
                
              },
              {
                path: '/userList',
                name:'userList',
                icon:'TeamOutlined',
                component:'@/pages/UserList'
                
              },
              {
                component:'./404'
              }
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
