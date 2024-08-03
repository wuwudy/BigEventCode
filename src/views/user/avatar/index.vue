<!--  -->
<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { updateUserAvatar } from '@/api/user'
import { useUserStore } from '@/stores'

const uploader = ref(null)
const userStore = useUserStore()
const imageUrl = ref(userStore.userInfo.user_pic)
const handleChange = (file) => {
  //将上传的文件转换为base64形式
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}

const submit = async () => {
  //更新用户头像
  await updateUserAvatar(imageUrl.value)
  //刷新userInfo
  await userStore.setUserInfo()
  ElMessage.success('更换成功')
}
</script>

<template>
  <operate-card title="更换头像">
    <!-- 一个upload -->
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
      ref="uploader"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button
      type="success"
      style="margin-top: 20px; width: 80px"
      @click="uploader.$el.querySelector('input').click()"
      >更换图片</el-button
    >
    <!-- 提交按钮 -->
    <el-button type="primary" style="margin-top: 20px; width: 80px" @click="submit">提交</el-button>
  </operate-card>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
