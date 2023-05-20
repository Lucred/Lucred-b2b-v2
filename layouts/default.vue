<template>
  <div id="appRoot">
    <nuxt />
    <snackbar />
  </div>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";
export default {
  components: { Snackbar },
};
</script>
