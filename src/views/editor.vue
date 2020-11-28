<template>
  <div>
    <div class="toolbar">
      <button
        class="tool-items fa fa-italic"
        @click="textVariarionFunc('italic')"
      ></button>

      <button
        class="tool-items fa fa-bold"
        @click="textVariarionFunc('bold')"
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
        @click="textVariarionFunc('fontSize')"
      ></button>
    </div>
    <div class="center">
      <div
        class="editor"
        contenteditable
        @drop.prevent="getElement"
        ref="editor"
      ></div>
    </div>
    <div class="center">
      <button class="getText btn" @click="saveText">
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: "",
      image: "",
    };
  },
  methods: {
    changeColor({ target }) {
      document.execCommand("foreColor", false, target.value);
    },
    getElement(event) {
      event.stopPropagation();
      this.createImage(event.dataTransfer.files[0]);
    },
    // getText(event) {
    //   this.textInput = event.target.innerHTML;
    // },
    textVariarionFunc(type) {
      document.execCommand(type, false, 6);
    },
    // debounce(func, delay) {
    //   let debounceTimer;
    //   return function() {
    //     const context = this;
    //     const args = arguments;
    //     clearTimeout(debounceTimer);
    //     debounceTimer = setTimeout(() => func.apply(context, args), delay);
    //   };
    // },
    // saveText() {
    //   this.debounce(this.autoSave(this.textInput), 2000);
    // },
    createImage(file) {
      let image = document.createElement("img");
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        image.setAttribute("src", e.target.result);
        image.className = "resizers";
        this.$refs.editor.append(image);
        this.image = image;
        image.addEventListener("mousedown", this.resizeImage);
      };
      reader.readAsDataURL(file);
    },
    resizeImage(event) {
      event.preventDefault();
      this.original_width = parseFloat(
        getComputedStyle(this.image, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      this.original_height = parseFloat(
        getComputedStyle(this.image, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      this.original_x = this.image.getBoundingClientRect().left;
      this.original_y = this.image.getBoundingClientRect().top;
      this.original_mouse_x = event.pageX;
      this.original_mouse_y = event.pageY;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },
    resize(e) {
      const width = this.original_width + (e.pageX - this.original_mouse_x);
      const height = this.original_height + (e.pageY - this.original_mouse_y);
      this.image.style.width = width + "px";
      this.image.style.height = width + "px";
    },
    saveText() {
      const editorContents = this.getEditorContentsFromStorage();
      editorContents.push(this.$refs.editor.innerHTML);
      localStorage.setItem("editorContents", JSON.stringify(editorContents));
      setTimeout(() => {
        this.$router.push("/all-contents");
      }, 1000);
    },
    stopResize() {
      window.removeEventListener("mousemove", this.resize);
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
<style>
.resizers {
  border: 3px solid #4286f4;
  box-sizing: border-box;
  cursor: col-resize;
}

.resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%; /*magic to turn square into circle*/
  background: white;
  border: 3px solid #4286f4;
  position: absolute;
}
.resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
