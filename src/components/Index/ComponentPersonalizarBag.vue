<template>
  <div class="q-ma-md col-12">
    <q-item-label class="text-h5">
      Perfil dos produtos
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col">
        <q-select
          v-model="cadastroProduto.necessidade"
          filled
          class="q-mr-lg"
          :options="listaProdutoNecessidade"
          label="Necessidade"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.genero"
          filled
          :options="listaProdutoGenero"
          label="Genero"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-select
          v-model="cadastroProduto.cor"
          filled
          class="q-mr-lg"
          :options="listaProdutoCor"
          label="Cor"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.tipo_estampa"
          filled
          :options="listaProdutoTipoEstampa"
          label="Tipo de estampa"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-select
          v-model="cadastroProduto.tipo_tenis"
          filled
          class="q-mr-lg"
          :options="listaProdutoTipoTenis"
          label="Tipo de tênis"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.sapato"
          filled
          :options="listaProdutoTamanhoSapato"
          label="Tamanho do sapato"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-select
          v-model="cadastroProduto.calca"
          filled
          class="q-mr-lg"
          :options="listaProdutoTamanhoCalca"
          label="Tamanho da calça"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.tamanho_camisa"
          filled
          :options="listaProdutoTamanhoCamisa"
          label="Tamanho da camisa"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-select
          v-model="cadastroProduto.tamanho_tenis"
          filled
          class="q-mr-lg"
          :options="listaProdutoTamanhoTenis"
          label="Tamanho do tênis"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.estacao_ano"
          filled
          :options="listaProdutoEstacaoAno"
          label="Estação do ano"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroProduto.n_quero"
          filled
          class="q-mr-lg"
          label="Não quero"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroProduto.fx_etaria"
          filled
          :options="listaProdutoFaixaEtaria"
          label="Faixa etária"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroProduto.observacoes"
          filled
          label="Observações"
        />
      </div>
    </div>

    <div class="col q-mt-xl">
      <q-btn color="black" label="Salvar" @click="salvar()" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const PRODUTOS_NECESSIDADE = [
  "Escola",
  "Passear",
  "Sair a noite",
  "Social",
  "Banho"
];
const PRODUTOS_GENERO = ["Menino", "Menina"];
const PRODUTOS_COR = ["Preta", "Vermelha"];
const PRODUTO_TIPO_ESTAMPA = [
  "liso",
  "desenho",
  "tropical",
  "tie dye",
  "zebra",
  "onça",
  "poá",
  "listrada",
  "floral",
  "Príncipe de Gales",
  "geométricas"
];
const PRODUTO_TIPO_TENIS = ["esportivo", "sandalia", "sneaker"];
const PRODUTO_TAMANHO_SAPATO = [
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
const PRODUTO_TAMANHO_CAMISA = ["PP", "P", "M", "G", "EG"];
const PRODUTO_ESTACAO_ANO = ["Verão", "Inverno"];
const PRODUTO_NAO_QUERO = [];
const PRODUTO_FAIXA_ETARIA = [
  "bebe",
  "criança",
  "adolescente",
  "pré-adolescente"
];
const PRODUTOS = {
  necessidade: "",
  genero: "",
  cor: "",
  tipo_estampa: "",
  tipo_tenis: "",
  tipo_estilo: "Não definido",
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
  name: "ComponentPersonalizarBag",
  data() {
    return {
      listaProdutoNecessidade: PRODUTOS_NECESSIDADE,
      listaProdutoGenero: PRODUTOS_GENERO,
      listaProdutoCor: PRODUTOS_COR,
      listaProdutoTipoEstampa: PRODUTO_TIPO_ESTAMPA,
      listaProdutoTipoTenis: PRODUTO_TIPO_TENIS,
      listaProdutoTamanhoSapato: PRODUTO_TAMANHO_SAPATO,
      listaProdutoTamanhoTenis: PRODUTO_TAMANHO_TENIS,
      listaProdutoTamanhoCalca: PRODUTO_TAMANHO_CALCA,
      listaProdutoTamanhoCamisa: PRODUTO_TAMANHO_CAMISA,
      listaProdutoEstacaoAno: PRODUTO_ESTACAO_ANO,
      listaProdutoNaoQuero: PRODUTO_NAO_QUERO,
      listaProdutoFaixaEtaria: PRODUTO_FAIXA_ETARIA,
      cadastroProduto: PRODUTOS,
      baseUrl: "https://power-bag.herokuapp.com",
      clienteId: localStorage.getItem('clienteId'),
      token: localStorage.getItem("token")
    };
  },
  methods: {
    salvar() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/perfil`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          necessidade: this.cadastroProduto.necessidade,
          genero: this.cadastroProduto.genero,
          cor: this.cadastroProduto.cor,
          tipo_estampa: this.cadastroProduto.tipo_estampa,
          tipo_tenis: this.cadastroProduto.tipo_tenis,
          tipo_estilo: this.cadastroProduto.tipo_estilo,
          tamanho_sapato: this.cadastroProduto.tamanho_sapato,
          tamanho_calca: this.cadastroProduto.tamanho_calca,
          tamanho_camisa: this.cadastroProduto.tamanho_camisa,
          estacao_ano: this.cadastroProduto.estacao_ano,
          frequencia: this.cadastroProduto.frequencia,
          n_quero: this.cadastroProduto.n_quero,
          fx_etaria: this.cadastroProduto.fx_etaria,
          observacoes: this.cadastroProduto.observacoes
        }
      });
    }
  }
};
</script>
