<!-- 基本资料 -->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const formModel = ref({ ...userStore.userInfo })
const formRef = ref(null)

//设置规则，用户昵称，用户邮箱必要，且邮箱要符合格式
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '用户昵称长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]
}

//提交修改
const submit = async () => {
  await formRef.value.validate()
  const { id, nickname, email } = formModel.value
  userStore.updateUserInfo({ id, nickname, email })
  ElMessage.success('修改成功')
}
</script>

<template>
  <operate-card title="基本资料">
    <!-- 包含用户名称（username 禁用），用户昵称，用户邮箱 三个表单项 以及提交修改按钮 -->
    <el-form :model="formModel" ref="formRef" label-width="120px" :rules="rules">
      <el-form-item label="用户名称">
        <el-input v-model="formModel.username" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </operate-card>
</template>

<style lang="scss" scoped></style>
