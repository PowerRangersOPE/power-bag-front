<template>
  <q-header elevated>
    <q-toolbar class="">
      <q-toolbar-title class="text-h5">PowerBag</q-toolbar-title>

      <div class="absolute-center">
        <q-btn
          id="dadosPessoais"
          to="/perfil/dadosPessoais"
          class="q-mr-xl"
          label="Perfil"
          color="primary"
          unelevated
        />
      </div>

      <q-btn-group>
        <q-btn to="/" label="Sair" color="primary" icon="logout" @click="limparLocalStorage()" />
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "ComponentHeader",
  data() {
    return {
      
    };
  },
  methods: {
    limparLocalStorage() {
      localStorage.clear();
    }
  }
};
</script>
