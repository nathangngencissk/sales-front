<template>
  <div class="home">
    <v-text-field v-model="search" label="Search" outlined></v-text-field>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
    search: "",
  }),
};
</script>
