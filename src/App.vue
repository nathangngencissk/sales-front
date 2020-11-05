<template>
  <v-app>
    <v-main>
      <v-app-bar dark>
        <v-app-bar-nav-icon
          @click="drawer = true"
          v-if="$store.getters.isLoggedIn"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Sales</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/checkout">
          <btn
            btnColor="btn btn-small btn-info btn-popup"
            :cartIcon="true"
            v-if="$store.getters.isLoggedIn"
          >
            Cart
            <span class="btn-circle" v-if="hasProduct()">
              {{ getProductsInCart.length }}
            </span>
          </btn>
        </router-link>

        <transition name="appear">
          <popupcart class="cart" v-if="getPopupCart" />
        </transition>
        <maskBg v-if="getPopupCart" @click.native="showPopupCart()" />
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="text--accent-4">
            <v-list-item @click="$router.push('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/account')">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-account-arrow-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group active-class="text--accent-4">
            <v-list-item v-for="category in getCategories" :key="category.id">
              <v-checkbox
                v-model="selected"
                :value="category.name"
                @click.native="toggleSelectedCategory(category)"
              ></v-checkbox>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <div id="app">
          <transition name="leave">
            <router-view></router-view>
          </transition>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mainMenu from "./components/Menu";
import btn from "./components/Btn";
import popupcart from "./components/Popupcart";
import maskBg from "./components/Mask";

export default {
  components: {
    mainMenu,
    btn,
    popupcart,
    maskBg,
  },
  data: () => ({
    drawer: false,
    group: null,
    selected: [],
  }),
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
    document.addEventListener("beforeunload", this.removeAllProducts);
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
    ...mapActions(["showOrHiddenPopupCart", "toggleCategory"]),
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    showPopupCart() {
      this.showOrHiddenPopupCart();
    },
    toggleSelectedCategory(category) {
      this.toggleCategory(category);
    },
    removeAllProducts() {
      this.$store.dispatch("removeAllProducts");
    },
  },
  computed: {
    ...mapGetters(["getProductsInCart", "getPopupCart", "getCategories"]),
  },
};
</script>

<style lang="scss">
@import "./assets/css/normalize.css";
@import url("https://fonts.googleapis.com/css?family=Roboto");

body {
  font-family: "Roboto", sans-serif;
  background-color: #fafafa;
}

a {
  color: #000;
  text-decoration: none;
}

.container {
  width: 100%;
}

.cart {
  position: absolute;
  top: 75px;
  right: 300px;
}

.btn-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leave-enter-active,
.leave-leave-active {
  transition: all 1.2s;
}
.leave-enter,
.leave-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

.appear-enter-active {
  animation: appear-animation 0.5s;
}

.appear-leave-active {
  animation: appear-animation 0.5s reverse;
}

@keyframes appear-animation {
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
