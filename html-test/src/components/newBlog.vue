<template>
  <div class="newBlog">
    <h1>{{ msg }}</h1>
    <i>标题：</i>
    <el-input v-model="input" placeholder="请输入标题"></el-input>
    <i>标题：</i>
    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
import Vue from 'vue'
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "新建、编辑",
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
      
    };
  },
  methods: {
    getList() {
      axios
        .get("/api/blog/list")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    froala
  },
  created() {
    // this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
