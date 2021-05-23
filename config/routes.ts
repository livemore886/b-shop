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
                path: '/dashboard',
                name:'dashboard',
                component:'@/pages/DashBoard'
                
              },
             
            
              
              {
                component: './404',
              },
            ],
          },
          {
            path: '/dashboard',
            component:'@/pages/DashBoard'
            
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
