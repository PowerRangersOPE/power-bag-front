<template>
  <div class="col-12">
    <q-item-label class="text-h5">
      Perfil dos produtos
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-select
          class="q-mr-lg"
          v-model="cadastroProduto.genero"
          :options="listaProdutoGenero"
          label="Genero"
        />
      </div>
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.fx_etaria"
          :options="listaProdutoFaixaEtaria"
          label="Faixa etária"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.estacao_ano"
          class="q-mr-lg"
          :options="listaProdutoEstacaoAno"
          label="Estação do ano"
        />
      </div>
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.necessidade"
          :options="listaProdutoNecessidade"
          label="Necessidade"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.cor"
          :options="listaProdutoCor"
          label="Cor"
          class="q-mr-lg"
        />
      </div>
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.tipo_estampa"
          :options="listaProdutoTipoEstampa"
          label="Tipo de estampa"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.tipo_tenis"
          class="q-mr-lg"
          :options="listaProdutoTipoTenis"
          label="Tipo de calçado"
        />
      </div>
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.tamanho_camisa"
          :options="listaProdutoTamanhoCamisa"
          label="Tamanho da camisa"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
        <div class="col-12 col-sm">
          <q-select
            v-model="cadastroProduto.tamanho_sapato"
            :options="listaProdutoTamanhoSapato"
            label="Tamanho do sapato"
            class="q-mr-lg"
          />
        </div>
        <div class="col-12 col-sm">
          <q-select
            v-model="cadastroProduto.tipo_estilo"
            :options="listaProdutoTipoEstilo"
            label="Tipo de estilo"
          />
        </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-select
          v-model="cadastroProduto.tamanho_calca"
          :options="listaProdutoTamanhoCalca"
          label="Tamanho da calça"
          class="q-mr-lg"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input v-model="cadastroProduto.observacoes" label="Observações" />
      </div>
    </div>


    <div class="col-12 col-sm q-mt-xl">
      <q-btn color="black" label="Salvar" @click="confirmaSalvar()" />
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
          <q-card-section class="row items-center">
              <q-avatar icon="announcement" color="primary" text-color="white" />
              <span class="q-ml-sm">Deseja salvar os dados?</span>
          </q-card-section>
          <q-card-actions align="right">
              <q-btn flat label="Sim" color="primary" @click="salvar()" v-close-popup />
              <q-btn flat label="Não" color="primary" v-close-popup />
          </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'

const PRODUTOS_NECESSIDADE = [
  "escola",
  "passear",
  "sair a noite",
  "social",
  "banho"
];
const PRODUTOS_GENERO = ["menino", "menina"];
const PRODUTOS_COR = ["branco", "vermelho", "azul", "rosa", "amarelo", "verde", "marrom", "laranja", "lilas"];
const PRODUTO_TIPO_ESTAMPA = [
  "liso",
  "desenho",
  "tropical",
  "tie dye",
  "zebra",
  "onça",
  "poá",
  "listrado",
  "floral"
];
const PRODUTO_TIPO_TENIS = ["esportivo", "casual", "sneaker", "sapatenis"];
const PRODUTO_TIPO_ESTILO = [
  "classico", "criativo", "elegante", "esportivo", "moderno", "romantico", "rock & punk", "geek"
];
const PRODUTO_TAMANHO_SAPATO = [
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36"
];
const PRODUTO_TAMANHO_TENIS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28"
];
const PRODUTO_TAMANHO_CALCA = ["P", "M", "G", "EG"];
const PRODUTO_TAMANHO_CAMISA = ["PP", "P", "M", "G", "GG"];
const PRODUTO_ESTACAO_ANO = ["primavera", "verao", "outono", "inverno"];
const PRODUTO_NAO_QUERO = [];
const PRODUTO_FAIXA_ETARIA = [
  "bebe",
  "crianca",
  "adolescente",
  "preAdolescente"
];
const PRODUTOS = {
  necessidade: "",
  genero: "",
  cor: "",
  tipo_estampa: "",
  tipo_tenis: "",
  tipo_estilo: "",
  tamanho_sapato: "",
  tamanho_calca: "",
  tamanho_camisa: "",
  tamanho_tenis: "",
  estacao_ano: "",
  frequencia: "Não definido",
  n_quero: "Não definido",
  fx_taria: "",
  observacoes: ""
};

export default {
  name: "personalizarBag",
  data() {
    return {
      listaProdutoNecessidade: PRODUTOS_NECESSIDADE,
      listaProdutoGenero: PRODUTOS_GENERO,
      listaProdutoCor: PRODUTOS_COR,
      listaProdutoTipoEstampa: PRODUTO_TIPO_ESTAMPA,
      listaProdutoTipoEstilo: PRODUTO_TIPO_ESTILO,
      listaProdutoTipoTenis: PRODUTO_TIPO_TENIS,
      listaProdutoTamanhoSapato: PRODUTO_TAMANHO_SAPATO,
      listaProdutoTamanhoTenis: PRODUTO_TAMANHO_TENIS,
      listaProdutoTamanhoCalca: PRODUTO_TAMANHO_CALCA,
      listaProdutoTamanhoCamisa: PRODUTO_TAMANHO_CAMISA,
      listaProdutoEstacaoAno: PRODUTO_ESTACAO_ANO,
      listaProdutoNaoQuero: PRODUTO_NAO_QUERO,
      listaProdutoFaixaEtaria: PRODUTO_FAIXA_ETARIA,
      cadastroProduto: PRODUTOS,
      confirm: false,
      baseUrl: "https://power-bag-back.herokuapp.com",
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId")
    };
  },
  mounted() {
    this.buscarDados()
    this.confirmarUsuarioAdmin()
  },
  methods: {
    confirmaSalvar() {
      this.confirm = true
    },
    salvar() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/perfil`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          genero: this.cadastroProduto.genero,
          fx_etaria: this.cadastroProduto.fx_etaria,
          estacao_ano: this.cadastroProduto.estacao_ano,
          necessidade: this.cadastroProduto.necessidade,
          cor: this.cadastroProduto.cor,
          tipo_estampa: this.cadastroProduto.tipo_estampa,
          tipo_tenis: this.cadastroProduto.tipo_tenis,
          tamanho_camisa: this.cadastroProduto.tamanho_camisa,
          tamanho_sapato: this.cadastroProduto.tamanho_sapato,
          tipo_estilo: this.cadastroProduto.tipo_estilo,
          tamanho_calca: this.cadastroProduto.tamanho_calca,
          observacoes: this.cadastroProduto.observacoes
        }
      });

      setTimeout(() => {
          this.$q.dialog({
              title: 'Parabéns!',
              message: 'Dados salvo com sucesso!'
          })
          this.buscarDados()
      }, 500);
    },
    async buscarDados() {
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/perfil`,
        headers: {
          Authorization: `${this.token}`,
        }
      });
      const busca = Object.assign(this.cadastroProduto, response.data)
      this.cadastroProduto = busca
    },
    confirmarUsuarioAdmin() {
      let usuarioLogado = localStorage.getItem("admin")
      if (usuarioLogado === "true") {
        localStorage.clear();
        this.$router.push({ name: "home" })
      } 
    }
  }
};
</script>
