<template>
  <div id="app">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1" :route="{path:'/admin'}">个人中心</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">个人中心</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <div class="adminTxt">
          Hello,
          <router-link :to="{path:'/admin'}" v-if="isAdmin" @click="activeIndex='2'">{{adminName}}</router-link>
          <router-link :to="{path:'/login'}" v-else>{{adminName}}</router-link>
          <el-button :disabled="!isAdmin" type="success" @click="newBlog">写博客</el-button>
        </div>
      </el-menu>
    </el-header>
    <router-view/>
  </div>
</template>

<script>
import { get } from "@/utils/axios";
export default {
  name: "App",
  data() {
    const router = [
      {
        key: "0",
        path: "./"
      },
      {
        key: "1",
        path: "./admin"
      }
    ];
    return {
      adminName: "未登录",
      isAdmin: false,
      activeIndex: "0",
      router
    };
  },

  methods: {
    getAdmin() {
      get("/api/user/loginCheck").then(res => {
        if (res.errno == "0") {
          this.adminName = res.data.session.username;
          this.isAdmin = true;
        }
      });
    },
    newBlog() {
      this.$router.push({ path: "./newBlog" });
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: this.router[key].path });
    }
  },
  created() {
    this.getAdmin();
    console.log(this.$route);
    let path = this.$route.path;
    if (path == "/admin") {
      this.activeIndex = "1";
    } else if(path == "/"){
      this.activeIndex = "0";
    }
  }
};
</script>

<style>
html {
  overflow: hidden;
}
body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  overflow-y: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 0px auto;
  padding: 0;
  padding-top: 60px;
}
.el-header {
  padding: 0;
  margin: 0;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.adminTxt {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  color: #fff;
}

.adminTxt a {
  color: #fff;
  margin-right: 20px;
}
</style>
