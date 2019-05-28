<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <ul class="blogList">
      <li v-for="item in listData">
        <router-link :to="{path:'/detail', query:{id:item.id}}">
          <div>{{item.title}}</div>
          <div>
            作者：{{item.author}}
            <i>{{item.createtime}}</i>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { get,post } from "../utils/axios";
export default {
  name: "index",
  data() {
    return {
      msg: "my blog",
      listData: null
    };
  },
  methods: {
    getList() {
      let params = {
        isadmin: true
      };
      post("/api/blog/list",params).then(res => {
        console.log(res.data);
        this.listData = res.data;
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.index {
  width: 1000px;
}
.blogList li {
  background: #ccc;
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
