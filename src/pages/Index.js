import axios from "axios";
import ComponentTimeline from "src/components/Index/ComponentTimeline.vue"
import ComponentFooter from "src/components/ComponentFooter.vue";
import ComponentHeaderIndex from "src/components/Index/ComponentHeaderIndex.vue";
import ComponentDadosPessoais from "src/components/Index/ComponentDadosPessoais.vue";
import ComponentPersonalizarBag from "src/components/Index/ComponentPersonalizarBag.vue";
import ComponentEndereco from "src/components/Index/ComponentEndereco.vue";
import ComponentCartao from "src/components/Index/ComponentCartao.vue"
import ComponentMinhasBags from "src/components/Index/ComponentMinhasBags.vue"

export default {
  name: "Index",
  components: {
    ComponentTimeline,
    ComponentFooter,
    ComponentHeaderIndex,
    ComponentDadosPessoais,
    ComponentPersonalizarBag,
    ComponentEndereco,
    ComponentCartao,
    ComponentMinhasBags
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


