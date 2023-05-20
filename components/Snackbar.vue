<template>
  <div>
    <v-snackbar
      v-model="show"
      top
      right
      :timeout="$store.state.snackbar.auto ? 5000 : 5000"
    >
      <div v-if="$store.state.snackbar.icon === 'loading'" class="mr-1">
        <v-progress-circular indeterminate size="28" color="accent" />
      </div>
      <div v-else class="mr-1">
        <v-icon
          v-if="$store.state.snackbar.icon === 'success'"
          color="green lighten-2"
        >
          mdi-check-circle
        </v-icon>
        <v-icon
          v-else-if="$store.state.snackbar.icon === 'error'"
          color="red lighten-2"
        >
          mdi-close-circle
        </v-icon>
        <v-icon
          v-else-if="$store.state.snackbar.icon === 'warning'"
          color="yellow lighten-2"
        >
          mdi-minus-circle
        </v-icon>
      </div>
      {{ $store.state.snackbar.text }}
      <v-btn
        icon
        text
        color="primary"
        class="ml-2"
        @click.native="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "snackbar",
  computed: {
    show: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set(newVal) {
        this.$store.commit("snackbar/show");
      },
    },
  },
};
</script>

<style></style>
