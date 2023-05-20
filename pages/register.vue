<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center mb-9">
                  <img src="../static/m2.png" alt="Lucred B2B" width="200" />
                  <!-- <h1 class="flex my-4 primary--text">Hi Welcome</h1> -->
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="fname"
                    label="Full Name"
                    type="text"
                    v-model="model.fullname"
                  ></v-text-field>
                  <v-text-field
                    append-icon="company"
                    name="company"
                    label="Company"
                    type="text"
                    v-model="model.company"
                  ></v-text-field>
                  <v-text-field
                    append-icon="phone"
                    name="phone"
                    label="Phone"
                    type="phonenumber"
                    v-model="model.phone"
                  ></v-text-field>
                  <v-text-field
                    append-icon="mail"
                    name="login"
                    label="Email"
                    type="text"
                    v-model="model.email"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <!-- <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn> -->
                <v-spacer></v-spacer>
                <v-btn
                  medium
                  color="#66AC4C"
                  @click="register"
                  :loading="loading"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "default",
  data: () => ({
    loading: false,
    model: {
      fullname: "",
      email: "",
      password: "",
      company: "",
      phone: "",
    },
  }),

  methods: {
    register() {
      this.loading = true;
      const obj = {
        email: this.model.email.toLowerCase(),
        password: this.model.password,
        fullname: this.model.fullname,
        company: this.model.company,
        phone: this.model.phone,
      };
      this.$axios
        .post("hr", {
          emailAddress: this.model.email.toLowerCase(),
          password: this.model.password,
          name: this.model.fullname,
          company: this.model.company,
          phone: this.model.phone,
        })
        .then((res) => {
          // console.log(res);
          const { data } = res;
          this.loading = false;
          // console.log(data);
          if (data?.status === 200) {
            // console.log(data.data);
            // this.$store.commit("setB2B", data.data);
            this.$store.commit("snackbar/show", {
              text: data.data.message,
              icon: "success",
            });
            this.$router.push("/login");
          } else if (data?.state === "ERROR") {
            this.$store.commit("snackbar/show", {
              text: data.data.message,
              icon: "success",
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
    },
  },
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
