<template>
  <q-footer>
    <q-toolbar class="">
      <q-toolbar-title class="">PowerBag</q-toolbar-title>
      <p class="text-caption absolute-center">
        Todos Direitos Reservados, Bags PowerBag
      </p>
      <div class="q-mt-md q-mr-md">
        <div class="q-gutter-md">
          <a href="tel:+5511942692333">
            <q-icon size="md" name="call"/>
          </a>
          <a href="mailto:powerbag.contato@hotmail.com">
            <q-icon size="md" name="email"/>
          </a>
          <a href="https://www.instagram.com/powerbagcontato/" target="_blank">
            <q-icon size="md" name="fab fa-instagram"/>
          </a>
        </div>
      </div>
    </q-toolbar>
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
