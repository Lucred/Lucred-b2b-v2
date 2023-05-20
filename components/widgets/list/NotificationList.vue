<template>
  <v-card class="elevation-0">
    <v-app-bar flat dense color="transparent">
      <v-toolbar-title><h4>Notification</h4></v-toolbar-title>
    </v-app-bar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-divider></v-divider>
      <v-btn block text class="ma-0">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import notes from "@/api/notification";
export default {
  data: () => ({
    items: notes,
  }),
  methods: {
    handleClick: (e) => {
      // console.log(e);
    },
  },
};
</script>
