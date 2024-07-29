<!-- 布局页 -->
<template>
  <div>
    <el-container class="layout">
      <el-aside width="200px"
        ><el-menu
          :default-active="$route.path"
          active-text-color="#ffd04b"
          background-color="#232323"
          text-color="#fff"
          class="sidebar"
          router
        >
          <div class="title">
            <img src="@/assets/logo.png" />
          </div>
          <el-menu-item index="/article/channel">
            <el-icon><List /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manager">
            <el-icon><Management /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="userCenter">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu></el-aside
      >
      <el-container>
        <el-header class="header">
          <div class="left-nickname">
            <span>黑马程序员 : </span>
            <span class="nickname">NICKNAME</span>
          </div>
          <el-dropdown @command="handleCommand">
            <div class="right-avatar">
              <img src="@/assets/default.png" />
              <el-icon><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  <span>基本资料</span>
                </el-dropdown-item>
                <el-dropdown-item command="avatar">
                  <el-icon><Crop /></el-icon>
                  <span>更换头像</span>
                </el-dropdown-item>
                <el-dropdown-item command="password">
                  <el-icon><EditPen /></el-icon>
                  <span>重置密码</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-footer class="footer">
          <span>大事件 2024 Created by Fish</span>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  SwitchButton,
  CaretBottom,
  EditPen,
  Crop,
  User,
  UserFilled,
  List,
  Management
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleCommand = (command) => {
  //如果是退出
  if (command === 'logout') {
    //清空本地数据
    userStore.removeToken()
    setTimeout(() => {
      ElMessage.success('已退出！')
    }, 1000)
    router.push('/login')
    return
  }
  const preUrlStr = '/user/'
  router.push(preUrlStr + command)
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;
  .sidebar {
    height: 100%;
    .title {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .header {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    font-size: 14px;
    .nickname {
      font-weight: bolder;
    }
    .right-avatar {
      display: flex;
      align-items: center;
      img {
        height: 30px;
        margin-right: 5px;
      }
    }
  }
  .main {
  }
  .footer {
    height: 40px;
    text-align: center;
    font-size: 12px;
    font-weight: lighter;
  }
}
</style>
