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
            <router-link :to="`/edit/${index}`">Edit</router-link>
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
    const contents = JSON.parse(localStorage.getItem("editorContents"));
    this.textContents = contents.map((item) => {
      return item.toString().replaceAll(/<img(.)*>/g, "");
    });
    // console.log(this.textContents[0].toString().replaceAll(/<img(.)*>/g, ""));
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
</style>
