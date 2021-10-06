import validateShops from "./validate";

const routes = [
  {
    path: "/",
    component: () => import("src/layouts/Home.vue"),
    children: [
      {
        path: '/',
        name: 'home',
        props: routes => ({ shop: validateShops(routes.query.shop) }),
        component: () => import("src/pages/home/Home.vue")
      },
      {
        path: "/login",
        name: "login",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/home/Login.vue")
      },
      {
        path: "/cadastro",
        name: "cadastro",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/home/Cadastro.vue")
      }
    ]
  },
  {
    path: "/ElegantKids/index",
    name: "index",
    props: { cliente: "ElegantKids" },
    component: () => import("layouts/Index.vue"),
    children: [
      {
        path: "/ElegantKids/index/minhas-bags",
        name: "minhas-bags",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/MinhasBags.vue")
      },
      {
        path: "/ElegantKids/index/dados-pessoais",
        name: "dados-pessoais",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/DadosPessoais.vue")
      },
      {
        path: "/ElegantKids/index/endereco",
        name: "endereco",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/Endereco.vue")
      },
      {
        path: "/ElegantKids/index/cartao",
        name: "cartao",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/Cartao.vue")
      },
      {
        path: "/ElegantKids/index/personalizar-bag",
        name: "personalizar-bag",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/PersonalizarBag.vue")
      },
      {
        path: "/ElegantKids/index/tutorial",
        name: "tutorial",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/Tutorial.vue")
      },
      {
        path: "/ElegantKids/index/lista-pedidos",
        name: "lista-pedidos",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/admin/ListaPedidos.vue")
      },
      {
        path: "/ElegantKids/index/clientes",
        name: "clientes",
        props: { cliente: "ElegantKids" },
        component: () => import("src/pages/index/admin/Clientes.vue")
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
