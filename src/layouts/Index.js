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
      baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
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
        dat_nasc: "",
        usuarioLogado: null
      }
    };
  },
  mounted() {
    this.confirmarUsuarioAdmin();
  },
  methods: {
    limparLocalStorage() {
      localStorage.clear();
    },
    confirmarUsuarioAdmin() {
      let usuarioLogado = localStorage.getItem("clienteId")
      if (usuarioLogado === "" || usuarioLogado === null ) {
        localStorage.clear();
        this.$router.push({ name: "home" })
      }
    }
  }
};
