<template>
  <div class="hello">
    <h1>{{ info.title }}</h1>
    <h3>{{ info.author }}</h3>
    <i>{{ info.createtime }}</i>
    <p>{{ info.content }}</p>
  </div>
</template>

<script>
import request from "../utils/request";
import { time } from "../utils/format";
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
      request.get("/api/blog/detail", params,res => {
        this.msg = res.data;
      });
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
</style>
