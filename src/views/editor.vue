<template>
  <div>
    <router-link to="all-contents" style="float : right"
      >All Contents</router-link
    >
    <div class="toolbar">
      <button
        class="tool-items fa fa-italic p-2"
        @click="textVariarionFunc('italic')"
      ></button>

      <button
        class="tool-items fa fa-bold p-2"
        @click="textVariarionFunc('bold')"
      ></button>
      <verte @input="changeColor">
        <svg viewBox="0 0 24 24">
          <path d="M0 20h24v4H0z" />
          <path
            style="fill: #000"
            d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"
          />
        </svg>
      </verte>
      <select name="select" @change="changeFontSize">
        <option value="">Select font size</option>
        <option value="1">8 pt</option>
        <option value="2">10 pt</option>
        <option value="3">12 pt</option>
        <option value="4">14 pt</option>
        <option value="5">18 pt</option>
        <option value="6">24 pt</option>
        <option value="7">36 pt</option>
      </select>
      <div class="button-wrapper">
        <span class="label">
          Upload File
        </span>

        <input
          type="file"
          name="upload"
          id="upload"
          class="upload-box"
          placeholder="Upload File"
          @change="selectFile"
        />
      </div>
    </div>
    <div class="center">
      <div class="editor" @drop.prevent="getElement" ref="editor"></div>
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
      currentIndexToEdit: this.$route.query.edit,
    };
  },
  methods: {
    changeColor(value) {
      document.execCommand("foreColor", false, value);
    },
    getElement(event) {
      event.stopPropagation();
      this.createImage(event.dataTransfer.files[0]);
    },
    selectFile(event) {
      event.stopPropagation();
      this.createImage(event.target.files[0]);
    },
    textVariarionFunc(type, event) {
      document.execCommand(type, false);
    },
    changeFontSize(event) {
      document.execCommand("fontSize", false, event.target.value);
    },
    createImage(file) {
      let div = document.createElement("div");
      let image = document.createElement("img");
      let imageRotate = document.createElement("span");
      imageRotate.className = "rotate";
      imageRotate.addEventListener("click", (event) => this.rotateImage(image));
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        image.setAttribute("src", e.target.result);
        // div.innerHTML += image.outerHTML + imageRotate.outerHTML;
        div.appendChild(image);
        div.appendChild(imageRotate);
        this.$refs.editor.append(div);
        this.setClickEventListener();
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
      this.original_x = this.image.getBoundingClientRect().left;
      this.original_mouse_x = event.pageX;
      window.addEventListener("mousemove", this.resize);
      window.addEventListener("mouseup", this.stopResize);
    },
    resize(e) {
      const width = this.original_width + (e.pageX - this.original_mouse_x);
      this.image.style.width = width + "px";
      this.image.style.height = width + "px";
    },
    rotateImage(image) {
      console.log(image, "here");
      const width = image.offsetWidth;
      const height = image.offsetHeight;
      console.log(width, height);
      // this should be in data attributes or extracted from deg
      const currentRotateCycle = parseInt(
        getComputedStyle(image).getPropertyValue("--current-rotate-cycle")
      );

      console.log(currentRotateCycle, "curr");

      if (currentRotateCycle % 2 === 0) {
        image.style.setProperty(
          "--current-scale",
          "scale(" + height / width + ")"
        );
      } else {
        image.style.setProperty("--current-scale", "scale(1)");
      }

      if (currentRotateCycle === 3) {
        image.style.setProperty("--current-rotate-cycle", 0);
        image.style.setProperty("--current-rotate", "rotate(0deg)");
      } else {
        const newRotateCycle = currentRotateCycle + 1;
        image.style.setProperty("--current-rotate-cycle", newRotateCycle);
        image.style.setProperty(
          "--current-rotate",
          "rotate(" + newRotateCycle * 90 + "deg)"
        );
      }
    },
    getCurrentImageSelected(event, element) {
      this.image = element;
      element.className = "resizers";
      element.addEventListener("mousedown", this.resizeImage);
    },
    saveText() {
      const editorContents = this.getEditorContentsFromStorage();
      if (this.currentIndexToEdit) {
        editorContents[
          this.currentIndexToEdit - 1
        ] = this.$refs.editor.innerHTML;
      } else {
        editorContents.push(this.$refs.editor.innerHTML);
      }
      localStorage.setItem("editorContents", JSON.stringify(editorContents));
      setTimeout(() => {
        this.$router.push("/all-contents");
      }, 1000);
    },
    stopResize() {
      window.removeEventListener("mousemove", this.resize);
      this.image.classList.remove("resizers");
    },
    getEditorContentsFromStorage() {
      let editorContents;
      if (localStorage.getItem("editorContents") === null) {
        editorContents = [];
      } else {
        editorContents = JSON.parse(localStorage.getItem("editorContents"));
      }
      return editorContents;
    },
    setClickEventListener() {
      document
        .querySelectorAll("img")
        .forEach((element, index) =>
          element.addEventListener("click", (event) =>
            this.getCurrentImageSelected(event, element)
          )
        );
    },
  },
  mounted() {
    if (this.currentIndexToEdit) {
      let content = this.getEditorContentsFromStorage()[
        this.currentIndexToEdit - 1
      ];
      this.$refs.editor.innerHTML = content;
      this.setClickEventListener();
    }
  },
};
</script>

<style lang="scss">
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

.rotate::before {
  content: "\e030";
}
</style>
