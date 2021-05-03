<template>
  <div class="q-ma-md">
    <q-item-label class="text-h5">
      Dados Pessoais
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroPerfil.nome"
          filled
          class="q-mr-lg"
          label="Nome completo"
        />
      </div>
      <div class="col">
        <q-input v-model="cadastroPerfil.email" filled label="E-mail" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroPerfil.cpf"
          filled
          class="q-mr-lg"
          label="CPF"
          mask="###.###.###-##"
        />
      </div>
      <div class="col">
        <q-select
          v-model="cadastroPerfil.identificacao"
          filled
          :options="identificacao"
          label="Identificação"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroPerfil.tel_cel1"
          filled
          class="q-mr-lg"
          label="Celular principal"
          mask="(##) ##### - ####"
        />
      </div>
      <div class="col">
        <q-input
          v-model="cadastroPerfil.tel_cel2"
          filled
          label="Celular secundário"
          mask="(##) ##### - ####"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroPerfil.dat_nasc"
          filled
          class=""
          label="Data de nascimento"
          mask="##/##/####"
        />
      </div>
    </div>

    <div class="col q-mt-xl">
      <q-btn class="q-mr-md" color="black" label="Editar" />
      <q-btn color="black" label="Salvar" @click="salvarDadosPessoais" />
    </div>
  </div>
</template>

<script>
const DADOS_PERFIL = {
  nome: "",
  email: "",
  cpf: "",
  identificacao: "",
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
      cadastroPerfil: DADOS_PERFIL,
      mostrarDadosPessoais: true,
      identificacao: ["Sra", "Sr"]
    };
  },
  methods: {
    salvarDadosPessoais() {
      const data = {
        nome: this.cadastroPerfil.nome,
        email: this.cadastroPerfil.email,
        cpf: this.cadastroPerfil.cpf,
        identificacao: this.cadastroPerfil.identificacao,
        tel_cel1: this.cadastroPerfil.tel_cel1,
        tel_cel2: this.cadastroPerfil.tel_cel2,
        dat_nasc: this.cadastroPerfil.dat_nasc,
        status: this.cadastroPerfil.status,
        pontuacao: this.cadastroPerfil.pontuacao
      };
    }
  }
};
</script>
