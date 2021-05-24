<template>
  <q-layout view="hHh Lpr fFf">
    <div class="q-pa-sm bg-primary text-white">
        <div class="row">
          <div flat class="col-12 col-sm">
            <q-btn unelevated dense to="/" size="lg" label="Elegant Kids" color="primary" style="border-radius: 5px" />
          </div>
          <div flat class="col-12 col-sm q-mt-sm text-right">
            <q-btn
              unelevated
              to="/cadastro"
              size="md"
              label="cadastro"
              color="black"
              class="border q-mr-sm"
              style="border-radius: 5px"
            />
            <q-btn
              unelevated
              to="/login"
              size="md"
              label="login"
              color="primary"
              icon-right="login"
            />
          </div>
        </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
      <q-footer>
        <div class="row q-pa-sm">
          <div class="col-12 col-md">
            <q-btn unelevated dense size="lg" label="PowerBag" color="primary"/>
            Todos Direitos Reservados, Bags PowerBag
          </div>
          <div class="col-12 col-md text-right q-mt-sm">
            <div class="q-gutter-md">
              <q-icon size="md" name="call" />
              <q-icon size="md" name="email" />
              <q-icon size="md" name="facebook" />
            </div>
          </div>
        </div>
      </q-footer>
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
