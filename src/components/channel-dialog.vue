<!-- 文章分类弹出的新增编辑框 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
    @close="handleClose"
  >
    <el-form :model="formModel" :rules="rules" ref="form">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="center" type="primary" round @click="handleConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import {
  getArticleChannelDetail,
  addArticleChannel,
  updateArticleChannel
} from '@/api/articleChannel'

const emit = defineEmits(['renderPage'])

const form = ref(null)

const ifEdit = ref(null)

const dialogVisible = ref(false)

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '名称应是1-10非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^\w{1,20}$/, message: '别名应是1-20字母、数字或下划线组合', trigger: 'blur' }
  ]
}

const openDialog = async (id) => {
  console.log(id)
  //如果是修改
  if (id) {
    ifEdit.value = true
    //获取分类详情
    const { data } = await getArticleChannelDetail(id)
    //回显
    formModel.value = data
  } else {
    //如果是新增
    ifEdit.value = false
  }
  //打开弹窗
  dialogVisible.value = true
}

const handleConfirm = async () => {
  try {
    if (ifEdit.value) {
      //如果是修改
      await form.value.validate()
      console.log(formModel.value)
      //发起更新请求
      await updateArticleChannel(formModel.value)
    } else {
      //如果是新增
      await form.value.validate()
      console.log(formModel.value)
      //发起新增请求
      await addArticleChannel(formModel.value)
    }
  } catch (error) {
    console.log(error)
  }
  //关闭弹窗
  dialogVisible.value = false

  //重新渲染
  emit('renderPage')
}

const handleClose = () => {
  //表单重置
  form.value.resetFields()
}

defineExpose({
  openDialog
})
</script>

<style lang="scss" scoped>
.center {
  margin: 0 auto;
  padding: 0px 30px;
}
</style>
