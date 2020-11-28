<template>
  <div v-html="currentElement"></div>
</template>
<script>
export default {
  data() {
    return {
      currentElement: "",
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.currentElement = JSON.parse(localStorage.getItem("editorContents"))[
      this.$route.params.id - 1
    ];
  },
};
</script>
