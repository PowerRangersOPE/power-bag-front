<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="q-pa-sm">
        <q-btn-group flat>
          <q-btn to="/" size="lg" label="Power Bag" color="primary" />
        </q-btn-group>
        <q-toolbar-title class="text-h5 text-center Rubik ">
          Como funcionamos | Vantangens | Perguntas Frequentes
        </q-toolbar-title>

        <q-btn-group rounded-borders flat>
          <q-btn
            to="/cadastro"
            size="lg"
            label="cadastro"
            color="dark"
            class="border q-mr-sm"
            style="border-radius: 5px"
          />
          <q-btn
            to="/login"
            size="lg"
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
  name: "TelaInicial",
  data() {
    return {};
  }
};
</script>
