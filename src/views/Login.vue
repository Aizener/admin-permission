<template>
  <div class="login">
    <el-form :model="userData" :rules="rules" ref="form" v-loading="isLogin">
      <h2>用户登录</h2>
      <el-form-item prop="username">
        <label for="username">用户名</label>：
        <el-input id="username" v-model="userData.username" clearable>
          <template slot="prefix">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label for="password">密码</label>：
        <el-input id="password" v-model="userData.password"  show-password>
          <template slot="prefix">
            <i class="el-icon-menu"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      userData: {
        username: '',
        password: ''
      },
      isLogin: false,
      rules: {
        username: [
          { required: true, min: 3, max: 18, message: '请输入3到18位的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 18, message: '请输入3到18位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLogin = true
          this.$api.login({
            username: this.userData.username,
            password: this.userData.password
          }).then(res => {
            this.isLogin = false
            if (!res.data) {
              this.$message({
                message: '用户名或密码错误！',
                type: 'error'
              })
              return false
            }
            this.setUser(res.data)
            this.$router.push('/')
          })
        }
        return false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    padding: 15px 70px 0 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(255, 255, 255, .5);
    h2 {
      margin-bottom: 35px;
      text-shadow: 10px 10px 2px #ccc;;
    }
    .el-input {
      width: 200px;
    }
    label {
      width: 50px;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
    .el-form-item {
      width: 100%;
      text-align: right;
      & /deep/ .el-form-item__error {
        left: 69px;
      }
    }
  }
}
</style>