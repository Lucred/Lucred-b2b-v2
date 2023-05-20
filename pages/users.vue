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
      <v-data-iterator :items="Users" :search="search" hide-default-footer disable-pagination>
        <template v-slot:no-data>
          <div class="text-center">No User available or found.</div>
        </template>
        <template v-slot:default="{ items }">
          <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Users list</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="830px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-tabs color="primary accent-4">
                        <v-tab>BVN Data</v-tab>
                        <v-tab>Phone Lookup Data</v-tab>
                        <v-tab>Location</v-tab>
                        <v-tab>Bank Account Information</v-tab>
                        <v-tab>Wallet Swap History</v-tab>
                        <v-tab>Spending History</v-tab>
                        <v-tab>Cart Details</v-tab>
                        <v-tab>Credits</v-tab>
                        <v-tab>Other Basic Information</v-tab>

                        <v-tab-item>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Id:
                                  <span class="ml-2">
                                    {{ editedItem._id }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  First Name:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.firstName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Middle Name:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.middleName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Last Name:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.lastName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Email:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.email }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Phone:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.phoneNumber1 }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Gender:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.gender }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Date of Birth:
                                  <span class="ml-2">
                                    {{
                                        convertTime(
                                          editedItem.bvnData.dateofBirth
                                        )
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  BVN:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.bvn }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  NIN:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.nin }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  Enrollment Bank:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.enrollmentBank }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  WatchListed:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.watchListed }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  LGA Of Origin:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.lgaOfOrigin }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  LGA Of Residence:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.lgaOfResidence }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  State Of Origin:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.stateOfOrigin }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3" v-if="editedItem.bvnData">
                                <v-row>
                                  State Of Residence:
                                  <span class="ml-2">
                                    {{ editedItem.bvnData.stateOfResidence }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid>
                            <v-row v-if="editedItem.phoneLookupData">
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  MSISDN:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.msisdn }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  NIN:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.nin }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Profession:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.profession }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  First Name:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.firstName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Middle Name:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.middleName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Surname:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.surname }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Marital Status:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData.maritalStatus
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Gender:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.gender }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Birth Date:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.birthDate }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Birth LGA:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.birthLga }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Birth State:
                                  <span class="ml-2">
                                    {{ editedItem.phoneLookupData.birthState }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Educational Level:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData
                                          .educationalLevel
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Employment Status:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData
                                          .employmentStatus
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Residence Address Line:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData
                                          .residenceAddressLine1
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Residence LGA:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData.residenceLga
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Residence State:
                                  <span class="ml-2">
                                    {{
                                        editedItem.phoneLookupData.residenceState
                                    }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid>
                            <v-row v-if="editedItem.location">
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Address:
                                  <span class="ml-2">
                                    {{ editedItem.location.address1 }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  State:
                                  <span class="ml-2">
                                    {{ editedItem.location.state }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  City:
                                  <span class="ml-2">
                                    {{ editedItem.location.city }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Zip Code:
                                  <span class="ml-2">
                                    {{ editedItem.location.zipCode }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Country:
                                  <span class="ml-2">
                                    {{ editedItem.location.country }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid v-if="editedItem.bankAccountInfo">
                            <v-row v-for="(bank, i) in editedItem.bankAccountInfo" :key="i" class="mb-4">
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Account Type:
                                  <span class="ml-2">
                                    {{ bank.accountType }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Mono Account Id:
                                  <span class="ml-2">
                                    {{ bank.monoAccountId }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Account Name:
                                  <span class="ml-2">
                                    {{ bank.accountName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Account Number:
                                  <span class="ml-2">
                                    {{ bank.accountNumber }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Bank Name:
                                  <span class="ml-2">
                                    {{ bank.bankName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Bank Account Type:
                                  <span class="ml-2">
                                    {{ bank.bankAccountType }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Bank Code:
                                  <span class="ml-2">
                                    {{ bank.bankCode }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Currency:
                                  <span class="ml-2">
                                    {{ bank.currency }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid v-if="editedItem.walletSwapHistory">
                            <v-row v-for="(
                                history, i
                              ) in editedItem.walletSwapHistory" :key="i" class="mb-4">
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Amount:
                                  <span class="ml-2">
                                    {{ history.amount }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Date:
                                  <span class="ml-2">
                                    {{ history.date }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid v-if="editedItem.spendingHistory">
                            <v-row v-for="(spnd, i) in editedItem.spendingHistory" :key="i" class="mb-4">
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Id:
                                  <span class="ml-2">
                                    {{ spnd._id }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="3" class="my-3">
                                <v-row>
                                  Amount:
                                  <span class="ml-2">
                                    {{ spnd.amount }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="5" class="my-3">
                                <v-row>
                                  Checkout Id:
                                  <span class="ml-2">
                                    {{ spnd.checkoutId }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid v-if="editedItem.cartDetails">
                            <v-row v-for="(cart, i) in editedItem.cartDetails" :key="i" class="mb-4">
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Id:
                                  <span class="ml-2">
                                    {{ cart._ID }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Product Name:
                                  <span class="ml-2">
                                    {{ cart.productName }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Product Id:
                                  <span class="ml-2">
                                    {{ cart.productId }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Quantity:
                                  <span class="ml-2">
                                    {{ cart.quantity }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Initial Price:
                                  <span class="ml-2">
                                    {{ cart.initialPrice }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Total Price:
                                  <span class="ml-2">
                                    {{ cart.totalPrice }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Merchant Id:
                                  <span class="ml-2">
                                    {{ cart.merchantId }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Company Name:
                                  <span class="ml-2">
                                    {{ cart.companyName }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid v-if="editedItem.credits">
                            <v-row v-for="(credit, i) in editedItem.credits" :key="i" class="mb-4">
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Id:
                                  <span class="ml-2">
                                    {{ credit._id }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Borrower Id:
                                  <span class="ml-2">
                                    {{ credit.borrowerId }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Credit Amount:
                                  <span class="ml-2">
                                    {{ credit.creditAmount }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Credit Duration:
                                  <span class="ml-2">
                                    {{ credit.creditDuration }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Monthly Repayment:
                                  <span class="ml-2">
                                    {{ credit.monthlyRepayment }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Start Date:
                                  <span class="ml-2">
                                    {{ credit.startDate }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  End Date:
                                  <span class="ml-2">
                                    {{ credit.endDate }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="4" class="my-3">
                                <v-row>
                                  Credit Repayment Status:
                                  <span class="ml-2">
                                    {{ credit.creditRepaymentStatus }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Id:
                                  <span class="ml-2">
                                    {{ editedItem._id }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Account Verified:
                                  <span class="ml-2">
                                    {{ editedItem.accountVerified }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Email Verified:
                                  <span class="ml-2">
                                    {{ editedItem.emailVerified }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Phone Verified:
                                  <span class="ml-2">
                                    {{ editedItem.phoneVerified }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  BVN Verified:
                                  <span class="ml-2">
                                    {{ editedItem.bvnVerified }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Is Active:
                                  <span class="ml-2">
                                    {{ editedItem.isActive }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  User Id:
                                  <span class="ml-2">
                                    {{ editedItem.userId }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Created At:
                                  <span class="ml-2">
                                    {{ editedItem.createdAt }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  DOB:
                                  <span class="ml-2">
                                    {{ editedItem.dob }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Wallet Balance:
                                  <span class="ml-2">
                                    {{ editedItem.walletBalance }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Spending Wallet Balance:
                                  <span class="ml-2">
                                    {{ editedItem.spendingWalletBalance }}
                                  </span>
                                </v-row>
                              </v-col>

                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Declined Credits:
                                  <span class="ml-2">
                                    {{ editedItem.declinedCredits }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Approved Credits:
                                  <span class="ml-2">
                                    {{ editedItem.approvedCredits }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Credit Request Status:
                                  <span class="ml-2">
                                    {{ editedItem.creditRequestStatus }}
                                  </span>
                                </v-row>
                              </v-col>
                              <v-col cols="12" md="6" class="my-3">
                                <v-row>
                                  Notification Id:
                                  <span class="ml-2">
                                    {{ editedItem.notificationId }}
                                  </span>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>
                      </v-tabs>
                    </v-card-text>

                    <!-- <v-card-actions v-if="editMode">
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions> -->
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogCredit" max-width="750px">
                  <!-- <template v-slot:activator="{ on, attrs }"> -->

                  <!-- </template> -->
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Credit User</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field v-model="amount" label="Amount"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field v-model="creditDuration" label="Credit Duration"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <!-- <v-text-field v-model="startDate" label="Start Date"></v-text-field> -->

                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                              transition="scale-transition" offset-y min-width="auto">
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="startDate" label="Start Date" readonly v-bind="attrs" v-on="on">
                                </v-text-field>
                              </template>
                              <v-date-picker v-model="startDate" :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1950-01-01" @change="save"></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-select placeholder="Select a country" :items="['MONO', 'FLUTTERWAVE']"
                              v-model="paymentTypeProvider" label="Payment Type Provider"></v-select>
                          </v-col>

                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeCredit"> Cancel </v-btn>
                      <v-btn color="blue darken-1" text @click="saveCredit"> Save </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogSuspend" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to
                      {{
                          editedItem.is_suspended
                            ? "revoke suspension for"
                            : "suspend"
                      }}
                      this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeSuspend">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="suspendItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="viewItem(item)">
                mdi-eye
              </v-icon>
              <v-icon small class="mr-2" @click="creditItem(item)">
                mdi-credit-card
              </v-icon>
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
    </v-col>
  </div>
</template>
<script>
import moment from "moment";
export default {
  layout: "dashboard",
  name: "Dashboard",
  data: () => ({
    loading: true,
    dialog: false,
    search: null,
    dialogDelete: false,
    dialogSuspend: false,
    dialogCredit: false,
    createMode: true,
    editMode: false,
    viewMode: false,
    headers: [
      { text: "Email", value: "email" },
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Phone", value: "phone" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    Users: [],
    SingleUsers: [],
    id: "",
    editedIndex: -1,
    editedItem: {
      email: "",
      fullname: "",
      gender: undefined,
      type: undefined,
      phone: "",
      account_verified: "",
      added_facilities: "",
      articles: [],
      avatar: "",
      bvn_verified: "",
      completed_appointments: "",
      cover_image: "",
      createdAt: "",
      dob: "",
      email_verified: "",
      height: "",
      is_active: "",
      marital_status: "",
      onboarded: "",
      phone_verified: "",
      scheduled_appointments: "",
      token: "",
      weight: "",
      _id: "",
      is_suspended: false,
    },
    defaultItem: {
      email: "",
      fullname: "",
      gender: undefined,
      type: "PATIENT",
      phone: "",
      account_verified: "",
      added_facilities: "",
      articles: [],
      avatar: "",
      bvn_verified: "",
      completed_appointments: "",
      cover_image: "",
      createdAt: "",
      dob: "",
      email_verified: "",
      height: "",
      is_active: "",
      marital_status: "",
      onboarded: "",
      phone_verified: "",
      scheduled_appointments: "",
      token: "",
      weight: "",
      _id: "",
      is_suspended: false,
    },
    activePicker: null,
    menu: false,
    amount: 0,
    creditDuration: 0,
    startDate: null,
    paymentTypeProvider: '',
  }),

  computed: {
    token() {
      return this.$store.state.token;
    },
    formTitle() {
      return this.editMode === true
        ? "Edit User"
        : `View User(${this.editedItem.bvnData
          ? this.editedItem.bvnData.firstName +
          " " +
          this.editedItem.bvnData.lastName
          : ""
        })`;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    creditUser() {
      this.dialogCredit = true;
    },
    async initialize() {
      let response = await this.$axios.get("users?size=99999999999999", {
        headers: {
          "x-admin-token": this.token,
        },
      });
      this.Users = response.data.data;
      this.loading = false;
      // console.log(this.Users);
    },
    async deleteUser(id) {
      let response = await this.$axios.delete(`users/${id}`, {
        headers: {
          "x-admin-token": this.token,
        },
      });
      return response;
    },
    async editItem(item) {
      this.editedIndex = this.Users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.viewMode = false;
      this.editMode = true;
      this.disabled = false;
      this.dialog = true;
    },

    async viewItem(item) {
      this.editedIndex = this.Users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.createMode = false;
      this.editMode = false;
      this.viewMode = true;
      this.disabled = true;
      this.dialog = true;
    },

    async creditItem(item) {
      this.editedIndex = this.Users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogCredit = true;
    },

    deleteItem(item) {
      this.id = item._id;
      this.dialogDelete = true;
    },

    suspendItem(item) {
      this.editedIndex = this.Users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.id = item._id;
      this.dialogSuspend = true;
    },

    async deleteItemConfirm() {
      const response = await this.deleteUser(this.id);
// console.log(response.data.message);
      this.closeDelete();
      this.initialize();
      this.$store.commit("snackbar/show", {
        text: response.data.message,
        icon: "success",
      });
    },

    async suspendItemConfirm() {
      const response = await this.suspendUser(this.id);
// console.log(response.data.message);
      this.closeSuspend();
      this.initialize();
      this.$store.commit("snackbar/show", {
        text: response.data.message,
        icon: "success",
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeCredit() {
      this.dialogCredit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeSuspend() {
      this.dialogSuspend = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.Users[this.editedIndex], this.editedItem);
    //   } else {
    //     this.Users.push(this.editedItem);
    //   }
    //   this.close();
    // },

    save(date) {
      this.$refs.menu.save(date)
    },

    // async saveCredit() {
    //   const data = {
    //     amount: this.amount,
    //     creditDuration: this.creditDuration,
    //     startDate: this.startDate,
    //     paymentTypeProvider: this.paymentTypeProvider,
    //   };
    //   console.log(data);
    //   let response;
    //   response = await this.$axios.put(
    //     `/admin/credit-user/${this.editedItem._id}`,
    //     data,
    //     {
    //       headers: {
    //         "x-admin-token": this.token,
    //       },
    //     }
    //   );
    //   console.log(response);
    //   this.$store.commit("snackbar/show", {
    //     text: response.data.message,
    //     icon: "success",
    //   });
    // },


    async saveCredit() {
      this.loading = true;
      const data = {
        amount: this.amount,
        creditDuration: this.creditDuration,
        startDate: this.startDate,
        paymentTypeProvider: this.paymentTypeProvider,
      };
      this.$axios
        .put(
          `/admin/credit-user/${this.editedItem._id}`,
          data,
          {
            headers: {
              "x-admin-token": this.token,
            },
          }
        )
        .then((res) => {
          // console.log(res);
          const { data } = res;
          this.loading = false;
    // console.log(data);
          if (data?.statusCode === 200) {
            this.$store.commit("snackbar/show", {
              text: response.data.message,
              icon: "success",
            });
          } else if (data?.state === "ERROR") {
            this.$store.commit("snackbar/show", {
              text: data.message,
              icon: "error",
            });
            return;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          const { response } = err;
    // console.log(err, response);
          this.$store.commit("snackbar/show", {
            text: response.data.message,
            icon: "error",
          });
        });
      this.amount = 0,
        this.creditDuration = 0,
        this.startDate = null,
        this.paymentTypeProvider = '',
        this.closeCredit();
    },



    convertTime(time) {
      if (!time) {
        return;
      }
      return moment(time).format("L");
    },
  },
};
</script>

<style>
.theme--light.v-btn {
    color: #000!important;
}
</style>