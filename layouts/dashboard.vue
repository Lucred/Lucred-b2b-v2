<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-main>
          <v-container class="mb-12">
            <!-- Page Header -->
            <page-header></page-header>
            <nuxt />
          </v-container>
          <!-- App Footer -->
          <!-- <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
          </v-footer> -->
        </v-main>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <!-- <v-btn
          small
          fab
          dark
          falt
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>settings</v-icon>
        </v-btn> -->
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
    </template>

    <!-- <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar> -->

    <snackbar />
  </div>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import Snackbar from "@/components/Snackbar.vue";

export default {
  middleware: "auth",
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    Snackbar,
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  }),

  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
  },
};
</script>

<style lang="scss">
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.app--footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

table caption {
  margin: 1rem auto !important;
  font-size: 1.5rem;
  font-weight: 600;
}

.theme--light.v-btn {
  color: white !important;
}

.setting-drawer .layout.wrap.row {
  margin: 1rem !important;
}

// .v-btn > .v-btn__content .v-icon {
//   color: white !important;
// }

.v-data-table .v-btn__content {
  color: black !important;
}
</style>
