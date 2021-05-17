const routes = [
  {
    path: '/',
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import("src/pages/home/Home.vue")
      },
      {
        path: '/login',
        name: 'login',
        component: () => import("src/pages/home/Login.vue"),
      },
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import("src/pages/home/Cadastro.vue")
      }
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: () => import("layouts/Index.vue"),
    children: [
      {
        path: '/index/minhas-bags',
        name: 'minhas-bags',
        component: () => import("src/pages/index/MinhasBags.vue")
      },
      {
        path: '/index/dados-pessoais',
        name: 'dados-pessoais',
        component: () => import("src/pages/index/DadosPessoais.vue")
      },
      {
        path: '/index/endereco',
        name: 'endereco',
        component: () => import("src/pages/index/Endereco.vue")
      },
      {
        path: '/index/cartao',
        name: 'cartao',
        component: () => import("src/pages/index/Cartao.vue")
      },
      {
        path: '/index/personalizar-bag',
        name: 'personalizar-bag',
        component: () => import("src/pages/index/PersonalizarBag.vue")
      }
    ]
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


