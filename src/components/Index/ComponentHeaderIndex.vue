<template>
  <q-header elevated>
    <q-toolbar class="">
      <q-toolbar-title class="text-h5">PowerBag</q-toolbar-title>
      <div class="absolute-center">
        <q-btn
        flat
          id="dadosPessoais"
          to="/perfil/dadosPessoais"
          class="q-mr-xl"
          label="Perfil"
          color="primary"
          unelevated
        />
      </div>
      <q-btn-group flat>
        <q-btn disable label="Colocar nome usuario" color="primary" icon-right="account_circle" />
        <q-btn to="/" label="Sair" color="primary" icon-right="logout" @click="limparLocalStorage()" />
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "ComponentHeader",
  data() {
    return {
      nomeUsuario: ''
    };
  },
  methods: {
    limparLocalStorage() {
    localStorage.clear();
    }
  },
  mounted(){

  },
};
</script>


