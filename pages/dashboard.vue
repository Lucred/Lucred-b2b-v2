<template>
  <div class="dashboard">
    <v-row>
      <v-spacer></v-spacer>
      <div class="page-header-right">
        <!-- <v-btn icon>
          <v-icon class="text--secondary">refresh</v-icon>
        </v-btn> -->
        <v-btn color="primary" dark class="mb-2" @click="createItem()">
          Create Company Profile
        </v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col lg="7" cols="12">
        <v-alert dense text type="success">
          Login Successfully! Welcome to <strong>Lucred B2B Dashboard</strong>
        </v-alert>
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>Last 3 weeks</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }} +</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">A Product has delivered!</div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            caption="Recent Order list"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.action="">
              <v-btn color="#66AC4C" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-container grid-list-xl fluid>
      <h4>
        <i class="fa fa-smile-o"></i>
        Hi there, this is the dashboard page.
      </h4>
    </v-container>
    <v-dialog v-model="dialog" max-width="750px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.companyName"
                  label="Company Name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.address"
                  label="Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.cacNumber"
                  label="CAC Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.employeesNo"
                  label="Number of Employees"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.phonenumber"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.industry" label="Industry">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Is Registered?"
                  type="text"
                  v-model="editedItem.registered"
                  :items="['True', 'False']"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions v-if="!viewMode">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" :loading="loading" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  name: "Dashboard",
  data() {
    return {
      dialog: false,
      disabled: false,
      createMode: true,
      editMode: false,
      viewMode: false,
      loading: false,
      editedItem: {
        companyName: "",
        address: "",
        cacNumber: "",
        employeesNo: "",
        phonenumber: "",
        industry: "",
        registered: "",
      },
      activityLog: [
        {
          title: "Total Employees",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Credit",
          amount: 34300,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total Debit",
          amount: 35400,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Total Outstanding",
          amount: 1100,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Name", value: "name" },
        { text: "Position", value: "position" },
        { text: "Credit", value: "credit" },
        { text: "Paid", value: "paid" },
      ],
      desserts: [
        {
          name: "Azeez Lawal",
          position: "Frontend Developer",
          paid: true,
          credit: 5000,
        },
        {
          name: "Tobi Tosin",
          position: "Full Developer",
          paid: true,
          credit: 6000,
        },
        {
          name: "Steph Curry",
          position: "Frontend Developer Intern",
          paid: true,
          credit: 3000,
        },
        {
          name: "Michael Jordan",
          position: "Backend Developer",
          paid: true,
          credit: 8000,
        },
        {
          name: "John Doe",
          position: "Project Manager",
          paid: false,
          credit: 1000,
        },
        {
          name: "Jane Doe",
          position: "Software Tester",
          paid: true,
          credit: 6000,
        },
        {
          name: "Rema Boy",
          position: "Product Owner",
          paid: true,
          credit: 2000,
        },
        {
          name: "Burna Damini",
          position: "Backend Developer",
          paid: false,
          credit: 10000,
        },
        {
          name: "Ayo Balogun",
          position: "HR",
          paid: true,
          credit: 5000,
        },
        {
          name: "David Adeleke",
          position: "Secretary",
          paid: true,
          credit: 5000,
        },
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    createItem() {
      this.createMode = true;
      this.viewMode = false;
      this.editMode = false;
      this.disabled = false;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.notificationDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.createMode = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.loading = true;
      localStorage.setItem("company_details", this.editedItem);
      setTimeout(() => {
        this.$store.commit("snackbar/show", {
          text: "Company profile created successfully",
          icon: "success",
        });
        this.loading = false;
        this.close();
      }, 3000);
    },
  },
  computed: {
    formTitle() {
      return this.editMode === true
        ? "Edit Company Profile"
        : this.createMode === true
        ? "Create Company Profile"
        : "View Company Profile";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // created() {
  //   this.initialize();
  // },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>