<!-- 重置密码 -->
<script setup>
import { ref } from 'vue'
import { updateUserPassword } from '@/api/user'
import { ElMessage } from 'element-plus'

const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const formRef = ref(null)

const rules = ref({
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码需是6-15位的非空字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码需是6-15位的非空字符', trigger: 'blur' },
    // 新密码不能与旧密码一致
    {
      validator: (rule, value, callback) => {
        if (value === form.value.old_pwd) {
          callback(new Error('新密码不能与旧密码一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码需是6-15位的非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.new_pwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const resetForm = () => {
  formRef.value.resetFields()
}

const submitForm = async () => {
  await formRef.value.validate()
  await updateUserPassword(form.value)
  ElMessage.success('修改成功')
  resetForm()
}
</script>

<template>
  <operate-card title="重置密码">
    <!-- 三个表单项，原密码，新密码，确认新密码，三个字段分别绑定为old_pwd, new_pwd, re_pwd,以及两个按钮，提交和重置 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="form">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="form.old_pwd" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="form.new_pwd" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="form.re_pwd" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="resetForm">清空</el-button>
      </el-form-item>
    </el-form>
  </operate-card>
</template>

<style lang="scss" scoped></style>
