<template>
  <div class="hello">
    <div class="path" @click="goback"><i class="el-icon-back">返回</i></div>
    <h1>{{ info.title }}</h1>
    <h3>{{ info.author }}</h3>
    <i>{{ info.createtime }}</i>
    <div v-html='info.content' class="content"></div>
  </div>
</template>

<script>
import { get, post } from "@/utils/axios";
import { time } from "@/utils/format";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: {},
      queryId: this.$route.query.id
    };
  },
  computed: {
    info() {
      this.msg.createtime = time(this.msg.createtime);
      return this.msg;
    }
  },
  methods: {
    getDetail() {
      let params = {
        id: this.queryId
      };
      console.log(123)
      get("/api/blog/detail", params,res => {
        console.log(res.data)
        this.msg = res.data;
      });
    },
    goback(){
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.$route.params, this.$route.query);
    this.getDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
.content{
  text-align: left;

  margin:20px auto;
  background: #efefef;
  padding:20px;
}
.path{
  text-align: left;
  margin:20px 0;
}
</style>
