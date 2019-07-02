<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="isAdmin">
      已登陆成功
    </div>
    <div v-else>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="login"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm2.checkPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { get, post } from "@/utils/axios";
export default {
  name: "HelloWorld",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPassword !== "") {
          this.$refs.ruleForm2.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: "登陆",
      isAdmin:localStorage.isAdmin,
      ruleForm2: {
        username: "",
        password: "",
        checkPassword: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      goHistory: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    // console.log(this, 'beforeRouteEnter'); // undefined
    // console.log(to, '组件独享守卫beforeRouteEnter第一个参数');
    // console.log(from, '组件独享守卫beforeRouteEnter第二个参数');
    // console.log(next, '组件独享守卫beforeRouteEnter第三个参数');
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      vm.goHistory = from && from.path;
      // console.log(vm);//当前组件的实例
    });
    // this.goHistory = from && from.path;
  },
  methods: {
    getAdmin() {
      get("/api/user/loginCheck", res => {
        if (res.errno == "0") {
          this.adminName = res.data.session.username;
          this.isAdmin = true;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.ruleForm2.username,
            password: this.ruleForm2.password
          };

          post("/api/user/login", params, res => {
            if (res.errno == "0") {
              this.$router.push(this.goHistory);
              this.$router.go(0);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {}
  },
  created() {
    // this.getAdmin;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 300px;
  margin: 20px auto;
}
h1 {
  font-family: 20px Extra large;
}
</style>
