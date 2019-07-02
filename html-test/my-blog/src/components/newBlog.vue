<template>
  <div class="newBlog">
    <h1>{{ msg }}</h1>
    <div class="edit">
      <h3>标题：</h3>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <h3>内容：</h3>
      <froala :tag="'textarea'" :config="config" v-model="content"></froala>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";
import { get, post } from "@/utils/axios";
// Import Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";

// Import and use Vue Froala lib.
import VueFroala from "vue-froala-wysiwyg";
Vue.use(VueFroala);

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: this.$route.query.id ? "编辑" : "新建",
      title: "",
      queryId: this.$route.query.id || "",
      config: {
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          }
        }
      },
      content: "请输入内容"
    };
  },
  methods: {
    getDetail() {
      let param = {
        id: this.queryId
      };
      console.log(param);
      get("/api/blog/detail", param, res => {
        console.log(res);
        this.title = res.data.title;
        this.content = res.data.content;
      });
    },
    submit() {
      let url = "";
      let param = {
        id: this.queryId,
        title: this.title,
        content: this.content
      };
      if (this.queryId) {
        url = "/api/blog/update";
      } else {
        delete param.id;
        url = "/api/blog/new";
      }

      post(url, param, res => {
        Message({
          message: "提交成功",
          type: "success"
        });
        this.$router.push({ path: "./admin" });
      });
    },
    reset() {}
  },
  components: {
    // froala
  },
  created() {
    if (this.queryId) {
      this.getDetail();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit {
  text-align: left;
  margin-bottom: 20px;
}
</style>
