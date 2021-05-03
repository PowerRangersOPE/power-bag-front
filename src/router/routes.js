const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("src/pages/Home.vue")
      },
      {
        path: "/login",
        component: () => import("src/pages/Login.vue")
      },
      {
        path: "/cadastro",
        component: () => import("src/pages/Cadastro.vue")
      },
      {
        path: "/index",
        component: localStorage.getItem('token') ? () => import("src/pages/Index.vue") : () => import("src/pages/Error404.vue")
      }
    ]
  },  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;


