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
          Add Product Category
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-iterator
        :items="Categories"
        :search="search"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:no-data>
          <div class="text-center">No Product Category available or found.</div>
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
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-overlay :opacity="0.75" :value="true">
                <v-progress-circular indeterminate size="64">
                </v-progress-circular>
              </v-overlay>
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ timeConvert(item.createdAt) }}
            </template>
          </v-data-table>
        </template></v-data-iterator
      >
      <v-dialog v-model="dialog" max-width="750px">
        <!-- <template v-slot:activator="{ on, attrs }"> -->

        <!-- </template> -->
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
                    label="Id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" v-if="!createMode">
                  <v-text-field
                    :disabled="viewMode || editMode"
                    v-model="editedItem.createdAt"
                    label="Date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :disabled="viewMode"
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-combobox
                    :disabled="viewMode"
                    clearable
                    deletable-chips
                    hide-selected
                    multiple
                    small-chips
                    v-model="editedItem.subCategories"
                    label="SubCategories"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" v-if="viewMode || editMode">
                  <v-row v-if="editMode" justify="center" class="px-3">
                    <v-combobox
                      :disabled="viewMode"
                      persistent-hint
                      deletable-chips
                      label="Options (Type)"
                      v-model="type"
                      style="width: 25%"
                      class="pr-3"
                    ></v-combobox>
                    <v-combobox
                      clearable
                      hide-selected
                      multiple
                      deletable-chips
                      persistent-hint
                      small-chips
                      :disabled="viewMode"
                      label="Options (Specifications)"
                      v-model="specs"
                      style="width: 75%"
                    ></v-combobox>
                  </v-row>
                  <v-row justify="end" v-if="editMode">
                    <v-btn color="primary darken-1" text @click="addToOptions">
                      add to Options
                    </v-btn>
                  </v-row>
                  <span v-for="opt in editedItem.options" :key="opt._id">
                    <v-row justify="center" class="px-3">
                      <v-combobox
                        :disabled="viewMode"
                        persistent-hint
                        deletable-chips
                        label="Options (Type)"
                        v-model="opt.type"
                        style="width: 25%"
                        class="pr-3"
                      ></v-combobox>
                      <v-combobox
                        clearable
                        hide-selected
                        multiple
                        deletable-chips
                        persistent-hint
                        small-chips
                        :disabled="viewMode"
                        label="Options (Specifications)"
                        v-model="opt.specifications"
                        style="width: 75%"
                      ></v-combobox>
                    </v-row>
                  </span>
                </v-col>

                <v-col cols="12" v-else>
                  <v-row justify="center" class="px-3">
                    <v-combobox
                      :disabled="viewMode"
                      persistent-hint
                      deletable-chips
                      label="Options (Type)"
                      v-model="type"
                      style="width: 25%"
                      class="pr-3"
                    ></v-combobox>
                    <v-combobox
                      clearable
                      hide-selected
                      multiple
                      deletable-chips
                      persistent-hint
                      small-chips
                      :disabled="viewMode"
                      label="Options (Specifications)"
                      v-model="specs"
                      style="width: 75%"
                    ></v-combobox>

                    <v-row justify="end">
                      <v-btn
                        color="primary darken-1"
                        text
                        @click="addToOptions"
                      >
                        add to Options
                      </v-btn>
                    </v-row>
                  </v-row>
                  <span v-for="opt in editedItem.options" :key="opt._id">
                    <v-row justify="center" class="px-3">
                      <v-combobox
                        :disabled="viewMode"
                        persistent-hint
                        deletable-chips
                        label="Options (Type)"
                        v-model="opt.type"
                        style="width: 25%"
                        class="pr-3"
                      ></v-combobox>
                      <v-combobox
                        clearable
                        hide-selected
                        multiple
                        deletable-chips
                        persistent-hint
                        small-chips
                        :disabled="viewMode"
                        label="Options (Specifications)"
                        v-model="opt.specifications"
                        style="width: 75%"
                      ></v-combobox>
                    </v-row>
                  </span>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    :disabled="viewMode"
                    v-model="editedItem.description"
                    label="Description"
                    :rows="4"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <label for="icon-image">
                    <v-tooltip bottom>
                      <template #activator="{ on }">
                        <v-card
                          height="130px"
                          width="130px"
                          hover
                          class="mx-auto"
                          v-on="on"
                          :disabled="viewMode"
                        >
                          <v-img
                            v-if="createMode && editedItem.coverImage"
                            :src="coverImage"
                            height="100%"
                            position="center"
                            cover
                          />
                          <v-img
                            v-else-if="!editedItem.coverImage"
                            :src="editedItem.coverImage"
                            height="100%"
                            position="center"
                            cover
                          />
                          <v-img
                            v-else-if="viewMode && editedItem.coverImage"
                            :src="editedItem.coverImage"
                            height="100%"
                            position="center"
                            cover
                          />
                          <v-img
                            v-else-if="editMode && editedItem.coverImage"
                            :src="editedItem.coverImage"
                            height="100%"
                            position="center"
                            cover
                          />

                          <v-container v-else fill-height fluid>
                            <v-row
                              no-gutters
                              justify="center"
                              align="center"
                              class="primary--text display-1 text-center"
                            ></v-row>
                          </v-container>
                          <v-container v-if="profileUploading" fill-height>
                            <v-row
                              no-gutters
                              justify="center"
                              align="center"
                              class="image-loader--wrapper"
                            >
                              <v-progress-circular
                                v-if="!profileUploadError"
                                indeterminate
                                color="primary"
                              />
                              <v-btn
                                v-else
                                small
                                text
                                color="primary"
                                @click.prevent="saveProfilePhoto"
                                >retry</v-btn
                              >
                            </v-row>
                          </v-container>
                        </v-card>
                      </template>
                      <span>Click to add cover image</span>
                    </v-tooltip>
                    <v-file-input
                      id="icon-image"
                      v-model="editedItem.coverImage"
                      color="primary"
                      type="file"
                      style="display: none"
                      name="icon-image"
                      hidden
                      @change="uploadProfilePhoto($event)"
                    />
                  </label>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="!viewMode">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
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
        </v-card> </v-dialog
    ></v-col>
  </div>
</template>
<script>
import moment from "moment";
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
    headers: [
      { text: "Id", value: "_id" },
      { text: "Category Name", value: "name" },
      { text: "Category Description", value: "description" },
      { text: "Date", value: "createdAt" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    Categories: [],
    SingleProductCategory: [],
    id: "",
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      createdAt: "",
      _id: "",
      options: [],
      subCategories: [],
      coverImage: null,
    },
    defaultItem: {
      name: "",
      description: "",
      createdAt: "",
      _id: "",
      options: [],
      subCategories: [],
      coverImage: null,
    },

    profileUploading: false,
    profileUploadError: false,
    iconImage: null,
    file: "",
    profilee: undefined,

    type: "",
    specs: undefined,
    coverImage: null,
    imageChanged: false,
  }),

  computed: {
    token() {
      return this.$store.state.token;
    },
    formTitle() {
      return this.editMode === true
        ? "Edit Product Category"
        : this.createMode === true
        ? "Create Product Category"
        : "View Product Category";
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

  created() {
    this.initialize();
  },

  methods: {
    timeConvert(time) {
      if (!time) return;

      const m = moment(time);

      return m.format("MMMM Do YYYY, h:mm:ss a");
    },
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
    async initialize() {
      let response = await this.$axios.get("categories?size=99999999999999", {
        headers: {
          "x-admin-token": this.token,
        },
      });
      this.Categories = response.data.data;
      // console.log(this.Categories);
    },
    async getAProductCategory(id) {
      let response = await this.$axios.get(`categories/${id}`, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      this.SingleProductCategory = response.data.data;
      // console.log(this.SingleProductCategory);
      return this.SingleProductCategory;
    },
    async deleteProductCategory(id) {
      let response = await this.$axios.delete(`categories/${id}`, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      return response;
    },

    createItem() {
      this.createMode = true;
      this.viewMode = false;
      this.editMode = false;
      this.disabled = false;
      this.dialog = true;
    },

    async editItem(item) {
      this.editedIndex = this.Categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.viewMode = false;
      this.editMode = true;
      this.disabled = false;
      this.dialog = true;
    },

    async viewItem(item) {
      this.editedIndex = this.Categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.editMode = false;
      this.viewMode = true;
      this.disabled = true;
      this.dialog = true;
    },

    deleteItem(item) {
      // this.editedIndex = this.Categories.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      this.id = item._id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const response = await this.deleteProductCategory(this.id);
      // console.log(response.data.message);
      this.closeDelete();
      this.initialize();
      if (response.data.statusCode === 200) {
        this.$store.commit("snackbar/show", {
          text: response.data.message,
          icon: "success",
        });
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.createMode = true;
      this.imageChanged = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // async save() {
    //   const data = {
    //     name: this.editedItem.name,
    //     description: this.editedItem.description,
    //   };
    //   console.log(data);
    //   let response;
    //   if (this.editMode) {
    //     response = await this.$axios.put(
    //       `/store/categories/${this.editedItem._id}`,
    //       data,
    //       {
    //         headers: {
    //           "x-admin-token": this.token,
    //         },
    //       }
    //     );
    //   } else {
    //     response = await this.$axios.post("categories", data, {
    //       headers: {
    //         "x-admin-token": this.token,
    //       },
    //     });
    //   }
    //   console.log(response);
    //   this.initialize();
    //   this.close();
    // },

    async save() {
      const formData = new FormData();
      try {
        if (this.editMode) {
          formData.append("name", this.editedItem.name);
          formData.append("description", this.editedItem.description);
          formData.append(
            "subCategories",
            JSON.stringify(this.editedItem.subCategories)
          );
          if (this.imageChanged) {
            formData.append("coverImage", this.editedItem.coverImage);
          }
          let response = await todos.put(
            `categories/${this.editedItem._id}`,
            formData
          );
          // console.log(response);
          if (response.data.statusCode == 200) {
            this.initialize();
            this.close();
          }
        } else {
          formData.append("name", this.editedItem.name);
          formData.append("description", this.editedItem.description);
          formData.append("coverImage", this.editedItem.coverImage);
          formData.append(
            "subCategories",
            JSON.stringify(this.editedItem.subCategories)
          );
          formData.append("options", JSON.stringify(this.editedItem.options));
          let response = await todos.upload("categories", formData);
          // console.log(response);
          if (response.data.statusCode === 200) {
            this.initialize();
            this.close();
          }
        }
      } catch (error) {
        const { response } = error;
        // console.log("error", response);
        return;
      }
    },

    // START UPLOAD
    uploadProfilePhoto(file) {
      this.imageChanged = true;
      this.editedItem.coverImage = file;
      const reader = new FileReader();
      // console.log(file);
      reader.onload = (e) => {
        this.coverImage = e.target.result;
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
