<template>
  <div>
    <q-item-label class="text-h5">
      Dados Pessoais
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.nome"
          disable
          class="q-mr-lg"
          label="Nome completo"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.cpf"
          disable
          label="CPF"
          mask="###.###.###-##"
        />
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.email"
          class="q-mr-lg"
          label="E-mail"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.dat_nasc"
          class=""
          label="Data de nascimento"
          mask="##/##/####"
          :rules="[this.isDataVencimento]"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.tel_cel1"
          class="q-mr-lg"
          label="Celular principal"
          mask="(##) ##### - ####"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.tel_cel2"
          label="Celular secundário"
          mask="(##) ##### - ####"
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
          <q-btn
            flat
            label="Sim"
            color="primary"
            @click="salvarDadosPessoais()"
            v-close-popup
          />
          <q-btn flat label="Não" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

const DADOS_PERFIL = {
  nome: "",
  email: "",
  cpf: "",
  tel_cel1: "",
  tel_cel2: "",
  dat_nasc: "",
  status: "ativo",
  pontuacao: "5"
};

export default {
  name: "ComponentDadosPessoais",
  data() {
    return {
      baseUrl: "https://power-bag-back.herokuapp.com",
      cadastroPerfil: DADOS_PERFIL,
      mostrarDadosPessoais: true,
      confirm: false,
      identificacao: ["Sra", "Sr"],
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId")
    };
  },
  mounted() {
    this.buscardados();
  },
  methods: {
    isDataVencimento(data) {
      data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
      var data_array = data.split("-"); // quebra a data em array

      // para o IE onde será inserido no formato dd/MM/yyyy
      if (data_array[0].length != 4) {
        data = data_array[2] + "-" + data_array[1] + "-" + data_array[0]; // remonto a data no formato yyyy/MM/dd
      }

      // comparo as datas e calculo a idade
      var hoje = new Date();
      var nasc = new Date(data);
      var idade = hoje.getFullYear() - nasc.getFullYear();
      var m = hoje.getMonth() - nasc.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

      if (idade < 18) {
        return ("Data inválida");
      }

      if (idade >= 90) {
        return ("Data inválida");
      }
    },
    confirmaSalvar() {
      this.confirm = true;
    },
    salvarDadosPessoais() {
      axios({
        method: "PUT",
        url: `${this.baseUrl}/cliente/${this.clienteId}`,
        data: {
          email: this.cadastroPerfil.email,
          tel_cel1: this.cadastroPerfil.tel_cel1,
          tel_cel2: this.cadastroPerfil.tel_cel2,
          dat_nasc: this.cadastroPerfil.dat_nasc
        }
      });
      setTimeout(() => {
        this.$q.dialog({
          title: "Parabéns!",
          message: "Dados salvo com sucesso!"
        });
        this.buscardados();
      }, 500);
    },
    async buscardados() {
      this.cadastroPerfil.nome = localStorage.getItem("nome");
      this.cadastroPerfil.cpf = localStorage.getItem("cpf");
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente/${this.clienteId}`,
        headers: {
          Authorization: `Basic ${this.token}`
        }
      });
      const busca = Object.assign(this.cadastroPerfil, response.data);
      this.cadastroPerfil.email = busca.email;
    }
  }
};
</script>
