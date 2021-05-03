<template>
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
</template>

<script>
export default {
  name: "ComponentFooter",
  data() {
    return {
      tab: "images"
    };
  }
};
</script>
