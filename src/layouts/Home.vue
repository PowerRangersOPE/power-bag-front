<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="q-pa-sm">
        <q-btn-group flat>
          <q-btn to="/" size="lg" label="Elegant Kids" color="primary" />
        </q-btn-group>
        <q-toolbar-title id="header-info" class="text-center">
          Como funcionamos    |    Vantagens    |    Perguntas Frequentes
        </q-toolbar-title>
        <q-btn-group flat>
          <q-btn
            to="/cadastro"
            size="md"
            label="cadastro"
            color="black"
            class="border q-mr-sm"
            style="border-radius: 5px"
          />
          <q-btn
            to="/login"
            size="md"
            label="login"
            color="primary"
            icon-right="login"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="row">
      <q-footer>
        <q-toolbar class="">
          <q-toolbar-title class="">PowerBag</q-toolbar-title>
          <p class="text-caption absolute-center">
            Todos Direitos Reservados, Bags PowerBag
          </p>
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-icon size="md" name="call" />
              <q-icon size="md" name="email" />
              <q-icon size="md" name="facebook" />
            </div>
          </div>
        </q-toolbar>
      </q-footer>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>

<style scoped>
#header-info {
  font-size: 16px;
}
</style>
