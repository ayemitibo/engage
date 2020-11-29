<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in textContents" :key="index">
          <td v-html="item"></td>
          <td>
            <router-link :to="`/view/${index + 1}`">View</router-link>
            <router-link :to="{ path: '/', query: { edit: index + 1 } }"
              >Edit</router-link
            >
            <a href="#" @click="deleteCurrentElement($event, index)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textContents: [],
    };
  },
  methods: {
    deleteCurrentElement(event, index) {
      event.preventDefault();
      this.textContents.splice(index, 1);
      localStorage.setItem("editorContents", JSON.stringify(this.textContents));
    },
  },
  mounted() {
    this.textContents = JSON.parse(localStorage.getItem("editorContents"));
  },
};
</script>
<style scoped>
a {
  padding: 0 3px;
}
table {
  text-align: left;
}
img {
  width: 100px;
  height: 100px;
}
</style>
