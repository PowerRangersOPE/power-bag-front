const routes = [
  // {
  //   // path: "/",
  //   // component: () => import("layouts/MainLayout.vue"),
  //   // children: [
  //   //   {
  //   //     path: "/",
  //   //     component: () => import("src/pages/Home.vue")
  //   //   },
  //   //   {
  //   //     path: "/login",
  //   //     component: () => import("src/pages/Login.vue")
  //   //   },
  //   //   {
  //   //     path: "/cadastro",
  //   //     component: () => import("src/pages/Cadastro.vue")
  //   //   },
  //   //   {
  //   //     path: "/index",
  //   //     component: localStorage.getItem('token') ? () => import("src/pages/Index.vue") : () => import("src/pages/Error404.vue")
  //   //   }
  //   // ]
  // },

  {
    path: '/',
    name: 'main',
    component: () => import("layouts/MainLayout.vue"),
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("src/pages/Home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("src/pages/Login.vue"),
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import("src/pages/Cadastro.vue")
  },
  {
    path: '/index',
    name: 'index',
    component: () => import("src/pages/Index.vue"),
    props: true,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: 'error',
    component: () => import("pages/Error404.vue")
  }
];

export default routes;


