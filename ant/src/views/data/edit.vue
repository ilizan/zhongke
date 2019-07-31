<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>编辑器</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">编辑器</h1>
    </div>
    <div class="dataList">
      <div class="main">
        <div class="cont" v-html="msg"></div>
        <quill-editor ref="quillEditor" v-model="msg" :options="editorOption" class="editor"></quill-editor>
      </div>
      <a-row class="btnGroup">
        <a-col :span="12">
          <a-button @click="getMsg()" type="primary">获得内容</a-button>
        </a-col>
      </a-row>
    </div>
    <a-modal title="Modal" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
      <div v-html="msg"></div>
    </a-modal>
  </div>
</template>

<script>
//api:https://quilljs.com/docs/quickstart/
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "edit",
  components: {
    quillEditor
  },
  data() {
    return {
      msg: "",
      visible:false,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "image"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            //   [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }]
            //   ["clean"],
            //   ["link", "image", "video"]
          ]
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.quillEditor.quill;
    }
  },
  methods: {
    getMsg() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false
    },
  },
  mounted() {
    this.msg = `<p><img src="data:image/jpeg;base64,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"></p>`;
    this.editor.container.style.height = "200px";
  }
};
</script>

<style lang="less" scoped>
.main > div.cont {
  width: 800px;
  height: 200px;
  border: 1px solid #ccc;
}
.editor {
  margin-top: 20px;
  width: 800px;
}
.btnGroup {
  padding: 10px 0;
}
</style>