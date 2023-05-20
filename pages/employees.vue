<template>
  <div>
    <v-col cols="12">
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-text-field
            v-model="search"
            id="search"
            name="search"
            placeholder="Search"
            append-icon="mdi-magnify"
            solo
          />
        </v-col>
        <v-btn color="primary" dark class="mb-2" @click="createItem()">
          Add Merchant
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-iterator
        :items="Merchants"
        :search="search"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:no-data>
          <div class="text-center">No Merchant available or found.</div>
        </template>
        <template v-slot:default="{ items }">
          <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Product Category list</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="viewItem(item)">
                mdi-eye
              </v-icon>
              <!-- <v-tooltip v-model="show" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props"> -->
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <!-- </v-btn></template
                >
                <span>Programmatic tooltip</span>
                </v-tooltip
              > -->
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-overlay :opacity="0.75" :value="true">
                <v-progress-circular indeterminate size="64">
                </v-progress-circular>
              </v-overlay>
            </template>
          </v-data-table>
        </template>
      </v-data-iterator>
      <v-dialog v-model="dialog" max-width="750px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6" v-if="!createMode">
                  <v-text-field
                    :disabled="viewMode || editMode"
                    v-model="editedItem._id"
                    label="Merchant Id"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.firstname"
                    label="First Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.lastname"
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.email"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.companyName"
                    label="Company Name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" v-if="viewMode">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.walletBalance"
                    label="Wallet Balance"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" v-if="viewMode">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.totalOrders"
                    label="Total Orders"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.phone"
                    label="Phone"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="!viewMode">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save" :loading="loading">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="notificationDialog" max-width="750px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Send Notification</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.title"
                    label="Title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="item.message"
                    label="Message"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="sendNotification">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
        v-model="snackbar"
        :timeout="6000"
        top
        right
        tile
        :color="color"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </div>
</template>
<script>
// const fs = require('fs');
import todos from "@/static/logic";
export default {
  layout: "dashboard",
  name: "Dashboard",
  data: () => ({
    dialog: false,
    search: null,
    dialogDelete: false,
    createMode: true,
    editMode: false,
    viewMode: false,
    loading: false,
    notificationDialog: false,
    headers: [
      { text: "Email", value: "email" },
      { text: "First Name", value: "firstname" },
      { text: "Last Name", value: "lastname" },
      { text: "Company Name", value: "companyName" },
      { text: "Account Status", value: "accountStatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    Merchants: [
      {
        employeeId: "1000001",
        firstname: "Azeez",
        lastname: "Lawal",
        email: "azeezlawal@lucred.com",
        companyName: "Lucred",
        walletBalance: "5000",
        totalOrders: "4",
        phone: "08138927498",
        accountStatus: "Pending",
      },
      {
        employeeId: "1000002",
        firstname: "Tobi",
        lastname: "Tosin",
        email: "tobitosin@lucred.com",
        companyName: "Lucred",
        walletBalance: "6000",
        totalOrders: "4",
        phone: "08148227498",
        accountStatus: "Approved",
      },
      {
        employeeId: "1000003",
        firstname: "Steph",
        lastname: "Curry",
        email: "stephcurry@lucred.com",
        companyName: "Lucred",
        walletBalance: "5000",
        totalOrders: "3",
        phone: "08126827498",
        accountStatus: "Pending",
      },
      {
        employeeId: "1000004",
        firstname: "Michael",
        lastname: "Jordan",
        email: "michaeljordan@lucred.com",
        companyName: "Lucred",
        walletBalance: "8000",
        totalOrders: "8",
        phone: "08135677498",
        accountStatus: "Approved",
      },
      {
        employeeId: "1000005",
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@lucred.com",
        companyName: "Lucred",
        walletBalance: "1000",
        totalOrders: "6",
        phone: "08138924356",
        accountStatus: "Pending",
      },
    ],
    SingleMerchant: [],
    categories: [],
    selectedCategories: [],
    allCategories: [],
    id: "",
    editedIndex: -1,
    item: {
      title: "",
      message: "",
    },
    editedItem: {
      employeeId: "",
      firstname: "",
      lastname: "",
      email: "",
      companyName: "",
      walletBalance: "",
      totalProducts: "",
      totalOrders: "",
      currentRevenue: "",
      accountStatus: "",
    },
    defaultItem: {
      employeeId: "",
      firstname: "",
      lastname: "",
      email: "",
      companyName: "",
      walletBalance: "",
      totalProducts: "",
      totalOrders: "",
      currentRevenue: "",
      accountStatus: "",
    },
    snackbar: false,
    color: "green",
    text: "",
    vertical: true,
  }),

  computed: {
    token() {
      return this.$store.state.token;
    },
    formTitle() {
      return this.editMode === true
        ? "Edit Employee"
        : this.createMode === true
        ? "Create Employee"
        : "View Employee";
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

  methods: {
    addToOptions() {
      this.editedItem.options.push({
        type: this.type,
        specifications: this.specs,
      });
      this.type = undefined;
      this.specs = undefined;
      this.$store.commit("snackbar/show", {
        text: "options updated successfully",
        icon: "success",
      });
      // console.log(this.Options);
    },
    handleSelect(value) {
      // this.category = value;

      if (this.selectedCategories.length >= 2) {
        this.$store.commit("snackbar/show", {
          text: "You can only add a maximum of 2 categories",
          icon: "error",
        });
        return;
      } else {
        // console.log("value::::", value);
        const hello = this.allCategories.filter(function (v) {
          return v["name"] == value[value.length - 1];
        });
        this.selectedCategories.push(hello[0]);
        // console.log(hello);
        // console.log(this.selectedCategories);
      }
    },
    async initialize() {
      let response = await this.$axios.get(
        "merchants/all?size=99999999999999",
        {
          headers: {
            "x-admin-token": this.token,
          },
        }
      );
      this.Merchants = response.data.data;
      this.getCategories();
      // console.log(this.Merchants);
    },
    async getAMerchant(id) {
      let response = await this.$axios.get(`merchants/${id}`, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      this.SingleMerchant = response.data.data;
      // console.log(this.SingleMerchant);
      return this.SingleMerchant;
    },
    async deleteMerchant(id) {
      this.Merchants = this.Merchants.filter((e) => e.employeeId != id);
      console.log("mmmmmm", this.Merchants);
      // return response;
    },
    async getCategories() {
      let response = await todos.get("categories?size=99999999999999");
      // console.log(response.data.data);
      this.allCategories = response.data.data.map(({ _id, name }) => ({
        id: _id,
        name: name,
      }));
      this.categories = this.allCategories.map((e) => e.name);
    },
    createItem() {
      this.createMode = true;
      this.viewMode = false;
      this.editMode = false;
      this.disabled = false;
      this.dialog = true;
    },

    async editItem(item) {
      this.editedIndex = this.Merchants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.viewMode = false;
      this.editMode = true;
      this.disabled = false;
      this.dialog = true;
    },

    async viewItem(item) {
      this.editedIndex = this.Merchants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.editMode = false;
      this.viewMode = true;
      this.disabled = true;
      this.dialog = true;
    },

    async sendNotificationItem(item) {
      this.editedIndex = this.Merchants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.notificationDialog = true;
    },

    async sendNotification() {
      const data = {
        title: this.item.title,
        message: this.item.message,
        notificationId: this.editedItem.notificationId,
      };
      let response;
      response = await this.$axios.post("/admin/push/notification", data, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      if (response.data.statusCode == 200) {
        this.color = "green";
        this.text = response.data.message;
        this.snackbar = true;
      } else {
        this.color = "red";
        this.text = response.data.message;
        this.snackbar = true;
      }
      this.close();
    },

    deleteItem(item) {
      // this.editedIndex = this.Merchants.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.id = item.employeeId;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const response = await this.deleteMerchant(this.id);
      // console.log(response.data.message);
      this.closeDelete();
      this.initialize();
      // if (response.data.statusCode === 200) {
      this.$store.commit("snackbar/show", {
        text: "Employee deleted successfully",
        icon: "success",
      });
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
      setTimeout(() => {
        this.$store.commit("snackbar/show", {
          text: "Employee editted successfully",
          icon: "success",
        });
        this.loading = false;
        this.close();
      }, 3000);
    },

    // START UPLOAD
    uploadProfilePhoto(file) {
      this.editedItem.logo = file;
      const reader = new FileReader();
      // console.log(file);
      reader.onload = (e) => {
        this.logo = e.target.result;
        // console.log(this.iconImage)
        // console.log("ffff", e.target.files[0])
      };

      reader.readAsDataURL(file);
      // this.saveProfilePhoto()
      reader.onabort = () => {};
    },
  },
};
</script>
