<!--  -->
<template>
  <el-row class="login">
    <el-col :span="12" class="loginBg"> </el-col>
    <el-col :span="6" :offset="3" class="Form">
      <el-form v-if="isLogin" :model="formModel" :rules="rules" ref="form">
        <h1>登录</h1>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入账号" v-model="formModel.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="leftRight">
            <el-checkbox v-model="remember" label="记住我" />
            <el-link type="primary">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="Login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link @click="changeStatus">去注册-></el-link>
        </el-form-item>
      </el-form>

      <el-form v-else :model="formModel" :rules="rules" ref="form">
        <h1>注册</h1>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入账号" v-model="formModel.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            show-password
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="Register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link @click="changeStatus">去登录-></el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { reg, login } from '@/api/loginReg'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

//#region
/**
 * 登录注册通用逻辑
 */
//
const router = useRouter()
const userStore = useUserStore()

// 是否登录
const isLogin = ref(true)

//表单绑定
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

//表单模版引用
const form = ref()

//点击去** 表单切换
const changeStatus = () => {
  //isLogin.value取反
  isLogin.value = !isLogin.value
  //清空formModel
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
}

//校验二次输入密码
const checkRePassword = (rule, value, callback) => {
  if (value === '') callback(new Error('请再次输入密码'))
  if (value !== formModel.value.password) callback(new Error('两次输入密码不一致'))
  callback()
}

//规则定义
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '用户名必须是4-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码需是6-15位的非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码需是6-15位的非空字符', trigger: 'blur' },
    {
      validator: checkRePassword,
      trigger: 'blur'
    }
  ]
}

//#endregion

//#region
/**
 * 登录相关
 */

//是否记住本人,默认记住我
const remember = ref(true)

//点击登录
const Login = () => {
  //表单校验
  form.value
    .validate()
    .then(() => {
      return login(formModel.value.username, formModel.value.password)
    })
    .then((data) => {
      //登录成功
      ElMessage.success(data.message)
      console.log(1)

      //登录成功，保存token
      console.log(data)
      //将data.token转为字符串
      userStore.setToken(data.token)
      console.log(2)
      //两秒后跳转首页
      setTimeout(() => {
        router.push('/article/channel')
      }, 2000)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

//#endregion

//#region
/**
 * 注册相关
 */

//点击注册
const Register = async () => {
  try {
    //表单校验
    await form.value.validate()
    //发送注册请求
    // console.log(...formModel.value)
    await reg(formModel.value)
    //两秒后跳转至登录页面
    ElMessage.success('注册成功')
    setTimeout(() => {
      changeStatus()
    }, 2000)
  } catch (error) {
    //注册失败
    console.log(error)
  }
}

//#endregion
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  .loginBg {
    border-radius: 20px;
    background:
      url('@/assets/logo2.png') no-repeat 50% 50% /240px auto,
      url('@/assets/login_bg.jpg') no-repeat 30% center;
  }
  .Form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background-color: skyblue;
    h1 {
      font-weight: normal;
      font-size: 30px;
    }
    .leftRight {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
