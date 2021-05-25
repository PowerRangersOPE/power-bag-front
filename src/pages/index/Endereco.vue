<template>
  <div class="q-ma-md col-7">
    <q-item-label class="text-h5" style="underline">
      Endereço
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroEndereco.cep"
          filled
          class="q-mr-lg"
          label="CEP"
          mask="#####-###"
          pattern="[a-zA-Z0-9]+"
          @keyup="searchCep()"
        />
      </div>
      <div class="col">
        <q-input v-model="cadastroEndereco.uf" filled label="UF" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroEndereco.cidade"
          filled
          class="q-mr-lg"
          label="Cidade"
        />
      </div>
      <div class="col">
        <q-input v-model="cadastroEndereco.bairro" filled label="Bairro" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroEndereco.rua"
          filled
          class="q-mr-lg"
          label="Rua"
        />
      </div>
      <div class="col">
        <q-input v-model="cadastroEndereco.numero" filled label="Número" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroEndereco.complemento"
          filled
          class="q-mr-lg"
          label="Complemento"
        />
      </div>
      <div class="col">
        <q-input
          v-model="cadastroEndereco.observacoes"
          filled
          label="Observações"
        />
      </div>
    </div>
    <div class="col q-mt-xl">
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
import axios from "axios";

const ENDERECO = {
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: "",
  complemento: "",
  observacoes: ""
};
export default {
  name: "endereco",
  data() {
    return {
      cadastroEndereco: ENDERECO,
      baseUrl: "https://power-bag-back.herokuapp.com",
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId"),
      confirm: false,
    };
  },
  mounted() {
    this.buscarDados()
  },
  methods: {
    confirmaSalvar() {
      this.confirm = true
    },
    salvar() {
      let token = localStorage.getItem("token");
      axios({
        method: 'POST',
        url: `${this.baseUrl}/endereco`,
        headers: {
          Authorization: `${token}`
        },
        data: {
          rua: this.cadastroEndereco.rua,
          numero: this.cadastroEndereco.numero,
          bairro: this.cadastroEndereco.bairro,
          cidade: this.cadastroEndereco.cidade,
          uf: this.cadastroEndereco.uf,
          cep: this.cadastroEndereco.cep,
          complemento: this.cadastroEndereco.complemento,
          observacoes: this.cadastroEndereco.observacoes
        }
      })
      setTimeout(() => {
        this.$q.dialog({
            title: 'Parabéns!',
            message: 'Dados salvo com sucesso!'
        })
        this.buscarDados();
      }, 500);
    },
    async buscarDados() {
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/endereco`,
        headers: {
          Authorization: `${this.token}`,
        }
      });
      const busca = Object.assign(this.cadastroEndereco, response.data)
      this.cadastroEndereco = busca
    },
    async searchCep() {
      if (this.cadastroEndereco.cep.length === 9) {
        try {
          const { data } = await axios.get(
            `https://viacep.com.br/ws/${this.cadastroEndereco.cep}/json/`
          );
          this.cadastroEndereco = data;
          this.cadastroEndereco.uf = data.uf;
          this.cadastroEndereco.cidade = data.localidade;
          this.cadastroEndereco.bairro = data.bairro;
          this.cadastroEndereco.rua = data.logradouro;
          this.cadastroEndereco.complemento = data.complemento;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

