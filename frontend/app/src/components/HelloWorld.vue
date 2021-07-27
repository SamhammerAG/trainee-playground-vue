<template>
  <div class="hello">
    <h1>Hello World Site</h1>
    <div v-if="text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataService from "@/services/DataService";

export default defineComponent({
  data() {
    return {
      text: ""
    }
  },
  methods: {
      getData() {
        DataService.getAll()
          .then((responseData: string) => {
            this.text = responseData;
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
  },
  mounted() {
    this.getData();
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
