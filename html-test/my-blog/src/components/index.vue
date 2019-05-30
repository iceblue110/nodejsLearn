<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <ul class="blogList">
      <li v-for="item in list">
        <router-link :to="{path:'/detail', query:{id:item.id}}">
          <div>
            <h3>{{item.title}}</h3>
            <i>作者：{{item.author}}</i>
            <i> {{item.createtime}}</i>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { get } from "@/utils/axios";
import { time } from "@/utils/format";
export default {
  name: "index",
  data() {
    return {
      msg: "首页",
      listData: null
    };
  },
  computed: {
    list() {
      var list = this.listData || [];
      list.forEach(item => {
        item.createtime = time(item.createtime);
      });
      return list;
    }
  },
  methods: {
    getList() {
      let param={
      //   // next:2
      }
      get("/api/blog/list",param).then(res => {
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
.blogList li {
  margin-bottom: 10px;
  text-align: left;
  padding: 10px 0;
  border-bottom: 2px solid #ccc;
  clear: both;
  overflow: hidden;
}
.blogList li div {
  float: left;
}
.blogList li i {
  font-style: normal;
  font-size: 14px;
  margin-right: 20px;
}
.blogList li div.handle {
  float: right;
  margin-top: 30px;
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
