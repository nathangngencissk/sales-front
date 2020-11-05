<template>
  <div class="account">
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <div>{{ customer.cpf }}</div>
        <p class="display-1 text--primary">
          {{ customer.name }}
        </p>
        <p>balance: {{ customer.balance }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Account",
  computed: {
    customer() {
      return this.$store.state.customer;
    },
  },
  data: () => ({}),
};
</script>