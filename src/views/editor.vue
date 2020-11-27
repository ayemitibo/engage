<template>
  <div>
    <div class="toolbar">
      <button
        class="tool-items fa fa-underline"
        @click="document.execCommand('underline', false, '')"
      ></button>

      <button
        class="tool-items fa fa-italic"
        @click="document.execCommand('italic', false, '')"
      ></button>
      <button
        class="tool-items fas fa-paint-brush"
        @click="document.execCommand('foreColor', false, 'red')"
      ></button>

      <button
        class="tool-items fa fa-bold"
        @click="document.execCommand('bold', false, '')"
      ></button>

      <select name="select" id="select" @change="changeColor">
        <option value="">Choose color</option>
        <option value="green">green</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="black">black</option>
      </select>

      <button
        class="tool-items fas fa-heading"
        @click="document.execCommand('fontSize', false, '6')"
      ></button>
    </div>
    <div class="center">
      <div
        class="editor"
        contenteditable
        @drop.prevent="getElement"
        ref="editor"
        @input="getText"
      ></div>
    </div>
    <div class="center">
      <button class="sai btn">GetHtml</button>
      <button class="getText btn">
        GetText
      </button>
      <button
        class="btn
      print"
        @click="printMe()"
      >
        PrintHtml
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeColor({ target }) {
      document.execCommand("foreColor", false, target.value);
    },
    getElement(event) {
      event.stopPropagation();
      this.createImage(event.dataTransfer.files[0]);
    },
    getText(event) {
      this.autoSave(event.target.innerHTML);
    },
    createImage(file) {
      let image = document.createElement("img");
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        image.setAttribute("src", e.target.result);
        this.$refs.editor.append(image);
        this.autoSave(image);
      };
      reader.readAsDataURL(file);
    },
    autoSave(element) {
      console.log(element);
      const editorContents = this.getEditorContentsFromStorage();
      editorContents.push(element);
      localStorage.setItem("courses", JSON.stringify(editorContents));
    },
    getEditorContentsFromStorage() {
      let editorContents;

      // if something exist on storage then we get the value, otherwise create an empty array
      if (localStorage.getItem("editorContents") === null) {
        editorContents = [];
      } else {
        editorContents = JSON.parse(localStorage.getItem("editorContents"));
      }
      return editorContents;
    },
  },
};
</script>
