<template>
  <q-layout view="hHh Lpr fFf">
    <div class="q-pa-sm bg-primary text-white">
        <div class="row">
          <div flat class="col-12 col-sm">
            <q-btn unelevated dense to="/?shop=elegantKids" :size="homeHeadSloganTextSize" :font-family="homeHeadSloganTextFont" :label="homeHeadSloganTextTitle" :classcolor="homeHeadSloganTextColor" style="border-radius: 5px" />
          </div>
          <div flat class="col-12 col-sm q-mt-sm text-right">
            <q-btn
              unelevated
              to="/cadastro/?shop=elegantKids"
              size="md"
              label="cadastro"
              :color="homeBtnRegistrationColor"
              class="border q-mr-sm"
              style="border-radius: 5px"
            />
            <q-btn
              unelevated
              to="/login/?shop=elegantKids"
              size="md"
              label="login"
              :color="homeBtnLoginColor"
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
            <div class="q-mb-sm" :font-family="footerFontText">
              {{footerRightReservedText}}
            </div>
            <div class="col-12 col-md text-right q-mt-md q-mr-sm">
              <div class="q-gutter-md">
                <a
                  :href="this.footerInstagramLink"
                  target="_blank"
                >
                  <q-icon size="md" name="fab fa-instagram"
                  >
                    <q-tooltip anchor="center left" self="center right">
                      Acesse o nosso Instagram
                    </q-tooltip>
                  </q-icon>
                </a>
                <a :href="footerRedirectEmail">
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

<script src="./Home.js">


export default {
  name: "MainLayout",

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

<script src="./Home.js">
