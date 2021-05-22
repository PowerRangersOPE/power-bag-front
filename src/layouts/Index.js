import axios from "axios";
import ComponentNav from "src/components/ComponentNav.vue";
import ComponentFooter from "src/components/ComponentFooter.vue";

export default {
  name: "Index",
  components: {
    ComponentFooter,
    ComponentNav
  },
  data() {
    return {
      name: "Index",
      leftDrawerOpen: false,
      baseUrl: "https://power-bag-back.herokuapp.com",
      acaoCadastroPerfil: "",
      token: this.cliente ? this.cliente.token : localStorage.getItem("token"),
      clienteId: this.cliente
        ? this.cliente.clienteId
        : localStorage.getItem("clienteId"),
      dadosCliente: {
        nome: "",
        email: "",
        cpf: "",
        identificacao: "",
        tel_cel1: "",
        tel_cel2: "",
        dat_nasc: ""
      }
    };
  },
  mounted() {
    this.usuarioLogado();
  },
  methods: {
    limparLocalStorage() {
      localStorage.clear();
    },
    usuarioLogado() {
      const buscaLocalStorage = localStorage.getItem("token")
      if (buscaLocalStorage === null || buscaLocalStorage === "") {
        this.$router.push({ name: "home" })
      } 
    }
  }
};
