<template>
  <v-app-bar color="#284cac" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <!-- <v-text-field
      text
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down mt-auto"
    ></v-text-field> -->
    <v-spacer></v-spacer>
    <!-- <v-btn icon href="https://github.com/moeddami/nuxt-material-admin">
      <v-icon>fa-2x fa-github</v-icon>
    </v-btn> -->
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <!-- <v-btn icon @click="dialog = true">
      <v-icon>mdi-bell-plus-outline</v-icon>
    </v-btn> -->
    <!-- <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon text v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list></notification-list>
    </v-menu> -->
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon large text v-on="on">
          <v-avatar size="30px">
            <v-icon>person</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-0">
        <v-list-item v-for="(item, index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
          @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
          :key="index">
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" max-width="750px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Send General Notification</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select :items="['USERS', 'MERCHANT']" v-model="type" @change="handleSelect"
                  label="Notification Type"></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field :disabled="!type" v-model="item.title" label="Title"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea :disabled="!type" v-model="item.message" label="Message" auto-grow></v-textarea>
              </v-col>
              <v-col v-if="type === 'MERCHANT'" cols="12">
                <v-text-field :disabled="!type" v-model="item.notificationId" label="Merchant's Notification Id">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import Util from "@/util";
import NotificationList from "@/components/widgets/list/NotificationList";

export default {
  name: "app-toolbar",
  components: {
    NotificationList,
  },
  data: function () {
    return {
      items: [
        // {
        //   icon: "account_circle",
        //   href: "#",
        //   title: "Profile",
        //   click: (e) => {
        //     console.log(e);
        //   },
        // },
        // {
        //   icon: "settings",
        //   href: "#",
        //   title: "Settings",
        //   click: (e) => {
        //     console.log(e);
        //   },
        // },
        {
          icon: "fullscreen_exit",
          title: "Logout",
          click: this.handleLogout,
        },
      ],
      dialog: false,
      editedIndex: -1,
      item: {
        title: "",
        message: "",
        notificationId: ""
      },
      defaultItem: {
        title: "",
        message: "",
        notificationId: ""
      },
      type: "",
    };
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    token() {
      return this.$store.state.token;
    },
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogout() {
      localStorage.removeItem("b2b_token");
      this.$router.push("/login");
    },
    handleSelect(value) {
      this.type = value
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.item = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      let data, api;
      if (this.type == "MERCHANT") {
        data = {
          title: this.item.title,
          message: this.item.message,
          notificationId: this.item.notificationId
        };
        api = "/admin/push/notification"
      } else if (this.type == "USERS") {
        data = {
          title: this.item.title,
          message: this.item.message
        };
        api = "/admin/user/push/notification"
      } else {
        this.$notification.success({
          message: "Warning",
          description: "Please choose a notification type",
          timeout: 6000,
        });
      }
      // console.log(data, api);
      const response = await this.$axios.post(api, data, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      this.$notification.success({
        message: "Success",
        description: response.data.message,
        timeout: 6000,
      });
      // console.log(response);
      this.close();
    },
  },
};
</script>
