<template>
  <div>
    <v-col cols="12">
      <v-card max-width="800" class="mx-auto">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  :disabled="disabled"
                  label="Fullname"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.company"
                  :disabled="disabled"
                  label="Company Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.emailAddress"
                  :disabled="disabled"
                  label="Email Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.phone"
                  :disabled="disabled"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.role"
                  :disabled="disabled"
                  label="Role"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- <v-card-actions v-if="!viewMode">
          <v-spacer></v-spacer>
          <v-btn
            v-if="disabled"
            color="black darken-1"
            style="color: black !important"
            text
            @click="disabled = !disabled"
          >
            Edit
          </v-btn>
          <v-btn
            v-else
            color="black darken-1"
            style="color: black !important"
            text
            @click="disabled = !disabled"
          >
            View
          </v-btn>
          <v-btn color="blue darken-1" text @click="save" :loading="loading">
            Save
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </div>
</template>
<script>
import todos from "@/static/logic";
export default {
  layout: "dashboard",
  name: "Dashboard",
  data: () => ({
    loading: false,
    disabled: true,
    dialog: false,
    search: null,
    dialogDelete: false,
    createMode: true,
    editMode: false,
    viewMode: false,
    id: "",
    editedIndex: -1,
    editedItem: {
      name: "",
      company: "",
      emailAddress: "",
      phone: "",
      role: "",
    },

    profileUploading: false,
    profileUploadError: false,
    iconImage: null,
    file: "",
    profilee: undefined,
    ImageChanged: false,

    logo: null,
  }),

  computed: {
    token() {
      return this.$store.state.token;
    },
    accountName: {
      get: function () {
        return this.editedItem.bankAccountInfo?.accountName
          ? this.editedItem.bankAccountInfo.accountName
          : "";
      },
      set: function (newValue) {
        // console.log("newValue", newValue);
        // this.editedItem = {
        //   bankAccountInfo: {
        //     accountName: "",
        //   },
        // },
        //   console.log("newValue", this.editedItem);
        this.editedItem.bankAccountInfo.accountName = newValue;
      },
    },
    // accountNumber: {
    //   get: function () {
    //     return this.editedItem.bankAccountInfo?.accountNumber
    //       ? this.editedItem.bankAccountInfo.accountNumber
    //       : "";
    //   },
    //   set: function (newValue) {
    //     this.editedItem.bankAccountInfo.accountNumber = newValue;
    //   },
    // },
    // bankName: {
    //   get: function () {
    //     return this.editedItem.bankAccountInfo?.bankName
    //       ? this.editedItem.bankAccountInfo.bankName
    //       : "";
    //   },
    //   set: function (newValue) {
    //     this.editedItem.bankAccountInfo.bankName = newValue;
    //   },
    // },
    // bankCode: {
    //   get: function () {
    //     return this.editedItem.bankAccountInfo?.bankCode
    //       ? this.editedItem.bankAccountInfo.bankCode
    //       : "";
    //   },
    //   set: function (newValue) {
    //     this.editedItem.bankAccountInfo.bankCode = newValue;
    //   },
    // },
    // bankAccountType: {
    //   get: function () {
    //     return this.editedItem.bankAccountInfo?.bankAccountType
    //       ? this.editedItem.bankAccountInfo.bankAccountType
    //       : "";
    //   },
    //   set: function (newValue) {
    //     this.editedItem.bankAccountInfo.bankAccountType = newValue;
    //   },
    // },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const b2b_data = localStorage.getItem("b2b_data");
      console.log('b2b_data', JSON.parse(b2b_data));
      this.editedItem = JSON.parse(b2b_data);
    },

    async save() {
      this.loading = true;
      const id = localStorage.getItem("_id");
      try {
        const obj = {
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname,
          bankAccountInfo: {
            accountName: this.editedItem.bankAccountInfo.accountName,
            accountNumber: this.editedItem.bankAccountInfo.accountNumber,
            bankName: this.editedItem.bankAccountInfo.bankName,
            bankCode: this.editedItem.bankAccountInfo.bankCode,
            bankAccountType: this.editedItem.bankAccountInfo.bankAccountType,
          },
        };
        console.log(obj);

        let response = await todos.put(`merchants/${id}`, obj);
        console.log(response);
        if (response.data.statusCode == 200) {
          if (this.ImageChanged) {
            this.updateImage();
          } else {
            this.$store.commit("snackbar/show", {
              text: "Profile Updated Successfully",
              icon: "success",
            });
            this.initialize();
          }
          this.loading = false;
        }
      } catch (error) {
        const { response } = error;
        console.log("error", response);
        this.loading = false;
        return;
      }
    },

    async updateImage() {
      const formData = new FormData();
      const id = localStorage.getItem("_id");
      try {
        formData.append("logo", this.editedItem.logo);
        let response = await todos.update(
          `merchants/update/${id}/logo`,
          formData
        );
        console.log(response);
        if (response.data.code === 200) {
          this.$store.commit("snackbar/show", {
            text: "Profile and Logo Updated Successfully",
            icon: "success",
          });
          this.initialize();
          this.loading = false;
          return;
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        return;
      }
    },

    // START UPLOAD
    uploadProfilePhoto(file) {
      this.ImageChanged = true;
      this.editedItem.logo = file;
      const reader = new FileReader();
      console.log(file);
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
