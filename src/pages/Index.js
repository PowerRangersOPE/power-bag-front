import axios from "axios";
import ComponentFooter from "src/components/ComponentFooter.vue";
import ComponentHeaderIndex from "src/components/Index/ComponentHeaderIndex.vue";
import ComponentDadosPessoais from "src/components/Index/ComponentDadosPessoais.vue";
import ComponentPersonalizarBag from "src/components/Index/ComponentPersonalizarBag.vue";
import ComponentEndereco from "src/components/Index/ComponentEndereco.vue";
import ComponentCartao from "src/components/Index/ComponentCartao.vue"
import { setTimeout } from "core-js";

export default {
  name: "Index",
  components: {
    ComponentFooter,
    ComponentHeaderIndex,
    ComponentDadosPessoais,
    ComponentPersonalizarBag,
    ComponentEndereco,
    ComponentCartao
  },
  data() {
    return {
      name: "Index",
      baseUrl: "https://power-bag.herokuapp.com",
      acaoCadastroPerfil: "",
      token: localStorage.getItem("token"),
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
  async mounted() {
    const clienteId = localStorage.getItem("clienteId")
    const { data }  = await axios.get(`${this.baseUrl}/cliente/${clienteId}`, {
      headers: {
          'authorization': `${this.token}`
      }
    });
    localStorage.setItem('dataCliente', JSON.stringify(data)) 
    localStorage.setItem('endereco', response.JSON.stringify(data.endereco));
    localStorage.setItem('perfil', response.JSON.stringify(data.perfil));
    localStorage.setItem('carta', response.JSON.stringify(data.cartao));
    
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  },
  mounted() {
   
  },
  methods: {
    async menuPerfil(acao) {
      this.acaoCadastroPerfil = acao;
      if (acao == "endereco") {
        const { data }  = await axios.get(`${this.baseUrl}/endereco/`, {
          headers: {
              'authorization': `${this.token}`
          }
        });
        localStorage.setItem('dataEndereco', JSON.stringify(data))     
      }
    },
    textToUpper(val) {
      this.cadastroCartao.nome = val.toUpperCase();
    }
  }
};


