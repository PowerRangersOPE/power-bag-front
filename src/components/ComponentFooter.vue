<template>
  <q-footer>
    <div class="row q-pa-sm">
        <div class="col-12 col-md">
          <q-btn  unelevated dense size="lg" label="PowerBag" color="primary" />
        </div>
        <div class="q-mb-sm">
          Todos Direitos Reservados, Bags PowerBag
        </div>
        <div class="col-12 col-md text-right q-mt-md">
          <div class="q-gutter-md">
            <a href="tel:+5511942692333">
              <q-icon size="md" name="call" 
              >
                <q-tooltip anchor="center left" self="center right">
                  Realizar ligação para PowerBag
                </q-tooltip>
              </q-icon>
            </a>
            <a href="mailto:powerbag.contato@hotmail.com">
              <q-icon size="md" name="email"
              >
                <q-tooltip anchor="center left" self="center right">
                  Eviar e-mail para PowerBag
                </q-tooltip>
              </q-icon>
            </a>
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
          </div>
        </div>
      </div>
  </q-footer>
</template>

<script>
export default {
  name: "ComponentFooter",
  data() {
    return {};
  }
};
</script>

<style scoped>
div a {
color: #ffffff;
text-decoration: none;
}
</style>
