import axios from "axios";
import ComponentFooter from "src/components/ComponentFooter.vue";
import ComponentHeaderIndex from "src/components/Index/ComponentHeaderIndex.vue";
import ComponentDadosPessoais from "src/components/Index/ComponentDadosPessoais.vue";
import ComponentPersonalizarBag from "src/components/Index/ComponentPersonalizarBag.vue";
import ComponentEndereco from "src/components/Index/ComponentEndereco.vue";
import ComponentCartao from "src/components/Index/ComponentCartao.vue"

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
      name: "home",
      baseUrl: "https://power-bag.herokuapp.com",
      acaoCadastroPerfil: "",
    };
  },
  methods: {
    menuPerfil(acao) {
      this.acaoCadastroPerfil = acao;
      if (acao == "endereco") {
        let token = localStorage.getItem("token");
        let id = localStorage.getItem("clienteId");
        const { data } = axios({
          method: "get",
          url: `${this.baseUrl}/endereco/${id}`,
          headers: {
            Authorization: `${token}`
          }
        });
        console.log(data);
        this.cadastroEndereco = Object.assign(this.cadastroEndereco, data);
      }
    },
    textToUpper(val) {
      this.cadastroCartao.nome = val.toUpperCase();
    },
    salvarPerfilProduto() {
      const data = {
        necessidade: this.cadastroProduto.necessidade,
        genero: this.cadastroProduto.genero,
        cor: this.cadastroProduto.cor,
        tipo_estampa: this.cadastroProduto.tipo_estampa,
        tipo_tenis: this.cadastroProduto.tipo_tenis,
        tipo_estilo: this.cadastroProduto.tipo_estilo,
        tamanho_sapato: this.cadastroProduto.tamanho_sapato,
        tamanho_calca: this.cadastroProduto.tamanho_calca,
        tamanho_camisa: this.cadastroProduto.tamanho_camisa,
        tamanho_tenis: this.cadastroProduto.tamanho_tenis,
        estacao_ano: this.cadastroProduto.estacao_ano,
        frequencia: this.cadastroProduto.frequencia,
        n_quero: this.cadastroProduto.n_quero,
        fx_taria: this.cadastroProduto.fx_taria,
        observacoes: this.cadastroProduto.observacoes,
        cliente_id: "91e1fd0c-bbec-4f46-a694-e177f11b9a7f"
      };

      console.log(data);
    }
  }
};
