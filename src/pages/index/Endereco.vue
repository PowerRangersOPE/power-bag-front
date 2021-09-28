<template>
  <div>
    <q-item-label class="text-h5" style="underline">
      Endereço
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          ref="cep"
          v-model="cadastroEndereco.cep"
          class="q-mr-lg"
          label="CEP"
          mask="#####-###"
          :rules="[this.isCep, this.required]"
          @keyup="searchCep()"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          ref="uf"
          v-model="cadastroEndereco.uf"
          label="UF"
          :rules="[this.isUF, this.required]"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          ref="cidade"
          v-model="cadastroEndereco.cidade"
          class="q-mr-lg"
          label="Cidade"
          :rules="[this.required]"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          ref="bairro"
          v-model="cadastroEndereco.bairro"
          label="Bairro"
          :rules="[this.required]"
          />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          ref="rua"
          v-model="cadastroEndereco.rua"
          class="q-mr-lg"
          label="Rua"
          :rules="[this.required]"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          ref="numero"
          v-model="cadastroEndereco.numero"
          label="Número"
          :rules="[this.required]"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          ref="complemento"
          v-model="cadastroEndereco.complemento"
          class="q-mr-lg"
          label="Complemento"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          ref="observacoes"
          v-model="cadastroEndereco.observacoes"
          label="Observações"
        />
      </div>
    </div>
    <div class="col q-mt-xl">
      <q-btn color="green-5" label="Salvar" @click="confirmaSalvar()" />
      <q-btn class="q-ml-md" color="black" label="próximo" to="personalizar-bag" />
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
      baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId"),
      confirm: false,
    };
  },
  mounted() {
    this.buscarDados()
    this.confirmarUsuarioAdmin()
  },
  methods: {
    required(val) {
      return (val && val.length > 0) || "O campo deve ser preenchido";
    },
    short(val) {
      return (val && val.length > 3) || "Mínimo 4 caracters";
    },
    isCep(val) {
      return (val && val.length > 3) || "Por favor digite cep válido";
    },
    isUF(val) {
      const listaUF = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "GO", "ES", "MA",
      "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
      "RS", "RO", "RR", "SP", "SC", "SE", "TO"]

      return listaUF.includes(val) || "Por favor digite UF válido"
    },
    confirmaSalvar() {
      this.confirm = true
    },
    salvar() {
      this.$q.loading.show()
      this.$refs.cep.validate()
      this.$refs.uf.validate()
      this.$refs.cidade.validate()
      this.$refs.bairro.validate()
      this.$refs.rua.validate()
      this.$refs.numero.validate()

      if(
       this.$refs.cep.hasError ||
       this.$refs.uf.hasError ||
       this.$refs.cidade.hasError ||
       this.$refs.bairro.hasError ||
       this.$refs.rua.hasError ||
       this.$refs.numero.hasError
       ) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Dados preenchidos incorretamente.'
        })
        this.$q.loading.hide()
        return
      }

      let token = localStorage.getItem("token");

      try {
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
          this.$q.loading.hide()
          this.buscarDados();
      }, 500);
      } catch (error) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Erro ao tentar salvar.'
        })
        this.$q.loading.hide()
      }

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

