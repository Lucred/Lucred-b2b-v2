<template>
  <div>
    <v-col cols="12">
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-text-field v-model="search" id="search" name="search" placeholder="Search" append-icon="mdi-magnify"
            solo />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-iterator :items="Credits" :search="search" hide-default-footer disable-pagination>
        <template v-slot:no-data>
          <div class="text-center">No Credit available or found.</div>
        </template>
        <template v-slot:default="{ items }">
          <v-data-table :headers="switch1 ? headers : headers2" :items="items" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Credits list
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-toolbar-title>
                  <v-switch class="mt-4 mx-4" v-model="switch1" inset @click="toggleCredit"
                    :label="`${switch1 ? 'Pending' : 'Declined'} Credit`"></v-switch>
                </v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="viewItem(item)">
                mdi-eye
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-overlay :opacity="0.75" :value="true">
                <v-progress-circular indeterminate size="64">
                </v-progress-circular>
              </v-overlay>
            </template>
            <template v-slot:item.borrowerId="{ item }">
              {{ item.borrowerId != null ? item.borrowerId.firstname + " " + item.borrowerId.lastname : '' }}
            </template>
            <template v-slot:item.monthlyRepayment="{ item }">
              &#8358;{{ numberWithCommas(item.monthlyRepayment) }}
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
                <v-col cols="12" md="6" v-if="editedItem.borrowerId">
                  <v-text-field :disabled="viewMode" v-model="editedItem.borrowerId.firstname" label="First Name">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" v-if="editedItem.borrowerId">
                  <v-text-field :disabled="viewMode" v-model="editedItem.borrowerId.lastname" label="Last Name">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field :disabled="viewMode" v-model="editedItem.creditAmount" label="Credit Amount">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field :disabled="viewMode" v-model="editedItem.creditDuration" label="Description">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field :disabled="viewMode" v-model="editedItem.monthlyRepayment" label="Monthly Repayment">
                  </v-text-field>
                </v-col>
                <v-col v-if="switch1" cols="12" md="6">
                  <v-text-field :disabled="viewMode" v-model="editedItem.creditRepaymentStatus"
                    label="Credit Repayment Status"></v-text-field>
                </v-col>
                <v-col v-else cols="12" md="6">
                  <v-text-field :disabled="viewMode" v-model="editedItem.creditRequestStatus"
                    label="Credit Request Status"></v-text-field>
                </v-col>
              </v-row>

              <v-row v-if="editedItem.creditPaymentHistory">
                <v-col cols="12">
                  <v-data-iterator :items="editedItem.creditPaymentHistory" hide-default-footer disable-pagination>
                    <template v-slot:no-data>
                      <div class="text-center">No Credit Payment History available or found.</div>
                    </template>
                    <template v-slot:default="{ items }">
                      <v-data-table :headers="headers3" :items="items" class="elevation-1">
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Credits Payment History
                            </v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <!-- <v-spacer></v-spacer> -->
                          </v-toolbar>
                        </template>
                        <template v-slot:no-data>
                          <v-overlay :opacity="0.75" :value="true">
                            <v-progress-circular indeterminate size="64">
                            </v-progress-circular>
                          </v-overlay>
                        </template>
                        <template v-slot:item.amount="{ item }">
                          &#8358;{{ numberWithCommas(item.amount) }}
                        </template>
                        <template v-slot:item.paymentStatus="{ item }">
                          {{ item.paymentStatus }}
                        </template>
                        <template v-slot:item.pendingBalance="{ item }">
                          {{ item.pendingBalance }}
                        </template>
                        <template v-slot:item.date="{ item }">
                          {{ item.date }}
                        </template>
                      </v-data-table>
                    </template>
                  </v-data-iterator>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  name: "Dashboard",
  data: () => ({
    dialog: false,
    switch1: true,
    search: null,
    dialogDelete: false,
    dialogSuspend: false,
    createMode: true,
    editMode: false,
    viewMode: false,
    headers3: [
      { text: "Amount", value: "amount" },
      { text: "Payment Status", value: "paymentStatus" },
      { text: "Pending Balance", value: "pendingBalance" },
      { text: "Date", value: "date" },
    ],
    headers2: [
      { text: "Customer's Name", value: "borrowerId" },
      { text: "Credit Amount", value: "creditAmount" },
      { text: "Credit Duration", value: "creditDuration" },
      { text: "Monthly Repayment", value: "monthlyRepayment" },
      { text: "Credit Request Status", value: "creditRequestStatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers: [
      { text: "Customer's Name", value: "borrowerId" },
      { text: "Credit Amount", value: "creditAmount" },
      { text: "Credit Duration", value: "creditDuration" },
      { text: "Monthly Repayment", value: "monthlyRepayment" },
      { text: "Credit Repayment Status", value: "creditRepaymentStatus" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    Credits: [],
    id: "",
    editedIndex: -1,
    editedItem: {
      creditAmount: "",
      creditDuration: "",
      monthlyRepayment: "",
      creditRepaymentStatus: "",
    },
    defaultItem: {
      creditAmount: "",
      creditDuration: "",
      monthlyRepayment: "",
      creditRepaymentStatus: "",
    },
  }),

  computed: {
    token() {
      return this.$store.state.token;
    },
    formTitle() {
      return this.editMode === true ? "Edit Credit" : "View Credit";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    toggleCredit() {
      this.initialize()
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.createMode = true;
    },

    async initialize() {
      let response = await this.$axios.get(
        `admin/${this.switch1 ? 'credits' : 'declined-credits'}?size=99999999999999`,
        {
          headers: {
            "x-admin-token": this.token,
          },
        }
      );
      this.Credits = response.data.data;
      // console.log(this.Credits);
    },

    async viewItem(item) {
      this.editedIndex = this.Credits.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.editMode = false;
      this.viewMode = true;
      this.disabled = true;
      this.dialog = true;
    },
  },
};
</script>
