import axios from "axios";
import ComponentNav from "src/components/ComponentNav.vue"
import ComponentFooter from "src/components/ComponentFooter.vue";

export default {
  name: "Index",
  components: {
    ComponentFooter, ComponentNav
  },
  props: {
    cliente: Object,
  },
  created(){
    if(this.cliente) {
      localStorage.setItem('token', this.cliente.token);
      localStorage.setItem('clienteId', this.cliente.clienteId);
    }
  },
  data() {
    return {
      name: "Index",
      leftDrawerOpen: false,
      baseUrl: "https://power-bag.herokuapp.com",
      acaoCadastroPerfil: "",
      token: this.cliente ? this.cliente.token : localStorage.getItem("token"),
      clienteId: this.cliente ? this.cliente.clienteId : localStorage.getItem("clienteId"),
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
    axios.get(`${this.baseUrl}/cliente/${this.clienteId}`, {
    headers: {Authorization: `${this.token}`
  }
    }).then(response => {
      localStorage.setItem('nome', response.data.nome);
      localStorage.setItem('email', response.data.email);
    });
  },
  methods: {
    limparLocalStorage() {
      localStorage.clear();
    },
    async menuPerfil(acao) {

      this.acaoCadastroPerfil = acao;

      if (acao == "endereco") {
        const { data }  = await axios.get(`${this.baseUrl}/endereco`, {
          headers: {
              'authorization': `${this.token}`
          }
        });
        localStorage.setItem('dataEndereco', JSON.stringify(data))
      }

      if (acao == "dadosPessoais") {
        const { data }  = await axios.get(`${this.baseUrl}/cliente/${this.clienteId}`, {
          headers: {
              'authorization': `${this.token}`
          }
        });
        localStorage.setItem('dadosPessoais', JSON.stringify(data))
      }
    },
    textToUpper(val) {
      this.cadastroCartao.nome = val.toUpperCase();
    }
  }
};


