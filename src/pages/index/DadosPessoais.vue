<template>
<div class="q-ma-md">
    <q-item-label class="text-h5">
        Dados Pessoais
    </q-item-label>
    <div class="row q-mt-lg">
        <div class="col">
            <q-input v-model="cadastroPerfil.nome" filled disable class="q-mr-lg" label="Nome completo" />
        </div>
        <div class="col">
            <q-input v-model="cadastroPerfil.cpf" filled disable label="CPF" mask="###.###.###-##" />
        </div>
    </div>
    <div class="row q-mt-lg">
        <div class="col">
            <q-input v-model="cadastroPerfil.email" filled class="q-mr-lg" label="E-mail" />
        </div>
        <div class="col">
            <q-input v-model="cadastroPerfil.dat_nasc" filled class="" label="Data de nascimento" mask="##/##/####" />
        </div>
    </div>

    <div class="row q-mt-lg">
        <div class="col">
            <q-input v-model="cadastroPerfil.tel_cel1" filled class="q-mr-lg" label="Celular principal" mask="(##) ##### - ####" />
        </div>
        <div class="col">
            <q-input v-model="cadastroPerfil.tel_cel2" filled label="Celular secundário" mask="(##) ##### - ####" />
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
                <q-btn flat label="Sim" color="primary" @click="salvarDadosPessoais()" v-close-popup />
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
    identificacao: "null",
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
    this.buscardados()
  },
  methods: {
    confirmaSalvar() {
        this.confirm = true
    },
    salvarDadosPessoais() {
        axios({
            method: "PUT",
            url: `${this.baseUrl}/cliente/${this.clienteId}`,
            data: {
                nome: this.cadastroPerfil.nome,
                email: this.cadastroPerfil.email,
                cpf: this.cadastroPerfil.cpf,
                identificacao: this.cadastroPerfil.identificacao,
                tel_cel1: this.cadastroPerfil.tel_cel1,
                tel_cel2: this.cadastroPerfil.tel_cel2,
                dat_nasc: this.cadastroPerfil.dat_nasc,
                status: this.cadastroPerfil.status,
                pontuacao: this.cadastroPerfil.pontuacao
            }
        });
        setTimeout(() => {
            this.$q.dialog({
                title: 'Parabéns!',
                message: 'Dados salvo com sucesso!'
            })
            this.buscardados()
            }, 500);
    },
    async buscardados() {
      this.cadastroPerfil.nome = localStorage.getItem("nome");
      this.cadastroPerfil.email = localStorage.getItem("email");
      const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/cliente/${this.clienteId}`,
          headers: {
              Authorization: `Basic ${this.token}`
          }
      });
      const busca = Object.assign(this.cadastroPerfil, response.data)
      this.cadastroPerfil = busca
    }
  }
};
</script>
