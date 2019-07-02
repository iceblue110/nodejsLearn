<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <ul class="blogList">
      <li v-for="item in list">
        <router-link :to="{path:'/detail', query:{id:item.id}}">
          <div>
            <h3>{{item.title}}</h3>
            <i>作者：{{item.author}}</i>
            <i>{{item.createtime}}</i>
          </div>
        </router-link>
        <div class="handle">
          <el-button @click="edit(item)">编辑</el-button>
          <el-button @click="del(item)">删除</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { get, post } from "@/utils/axios";
import { Message } from "element-ui";
import { time } from "@/utils/format";
export default {
  name: "index",
  data() {
    return {
      msg: "个人中心",
      listData: []
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
      let params = {
        isadmin: 1
      };
      get("/api/blog/list", params, res => {
        console.log(res.data);
        this.listData = res.data;
        if (res.errno == "-1") {
          this.$router.push({ path: "./login" });
        }
      });
    },
    edit(row) {
      console.log(row);
      this.$router.push({ path: "./newBlog", query: { id: row.id } });
    },
    del(row) {
      const { id } = row;
      post("/api/blog/del", { id: id }, res => {
        if (res.errno == "0") {
          Message({
            message: "删除成功",
            type: "success"
          });
        }

        this.getList();
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
.blogList {
  margin: 0 auto;
  width: 100%;
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
</style>
