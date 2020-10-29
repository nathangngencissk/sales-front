<template>
  <v-container>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
  </v-container>
</template>

<script>
import store from "../store";

export default {
  name: "HelloWorld",
  computed: {
    users() {
      return store.state.users;
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      return store.dispatch("GET_USERS");
    },
  },
  data: () => ({}),
};
</script>
