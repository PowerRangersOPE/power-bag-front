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
              <q-icon  unelevated dense size="lg" label="PowerBag" color="primary" />
            </div>
            <div class="q-mb-sm">
              Todos Direitos Reservados, Bags PowerBag
            </div>
            <div class="col-12 col-md text-right q-mt-md q-mr-sm">
              <div class="q-gutter-md">
                <a
                  href="https://www.instagram.com/powerbagcontato/"
                  target="_blank"
                >
                  <q-icon size="md" name="fab fa-instagram" 
                  >
                    <q-tooltip anchor="center left" self="center right">
                      Acessar Instagram do PowerBag
                    </q-tooltip>
                  </q-icon>
                </a>
                <a href="mailto:powerbag.contato@hotmail.com">
                  <q-icon size="md" name="email" 
                  >
                    <q-tooltip anchor="center left" self="center right">
                      Nosso e-mail para contato
                    </q-tooltip>
                  </q-icon>
                </a>
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
div a {
color: #ffffff;
text-decoration: none;
}
</style>
