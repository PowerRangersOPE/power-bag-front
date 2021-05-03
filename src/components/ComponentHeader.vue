<template>
  <q-header elevated>
    <q-toolbar class="q-pa-md">
      <q-btn-group flat>
        <q-btn to="/" size="lg" label="powerbag" color="primary" />
      </q-btn-group>
      <q-toolbar-title class="text-h4 text-center text-italic ">
        Elegant Kids
      </q-toolbar-title>
      <q-btn-group rounded-borders flat>
        <q-btn
          to="/"
          size="lg"
          label="sair"
          color="primary"
          icon-right="logout"
        />
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<style></style>
<script>
export default {
  name: "ComponentHeaderIndex",
  data() {
    return {
    };
  }
};
</script>
