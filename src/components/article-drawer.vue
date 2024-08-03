<!-- 抽屉组件 -->
<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { publishArticle, updateArticle, getArticleDetail } from '@/api/articleManager'
import { baseURL } from '@/utils/request'
import { urlToFile } from '@/utils/urlToFile'

//父子通信
const emit = defineEmits(['success'])

//是否是编辑
const isEdit = computed(() => {
  if (formModel.value.id) return true
  return false
})

//抽屉是否可见
const drawerVisible = ref(false)

//表单元素
const formRef = ref(null)

//默认数据
const DefaultFormModel = ref({
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: null,
  state: ''
})

//表单绑定数据
const formModel = ref({ ...DefaultFormModel.value })

//富文本编辑器
const editor = ref(null)

//分类自定义校验
const validatePassId = (rule, value, callback) => {
  if (formModel.value.cate_id === '') callback(new Error('请选择分类'))
  callback()
}
//封面自定义校验
const validatePassImg = (rule, value, callback) => {
  if (formModel.value.cover_img === null) callback(new Error('请选择文件'))
  callback()
}

//内容自定义校验
const validatePassContent = (rule, value, callback) => {
  if (
    formModel.value.content === '<p><br></p>' ||
    (formModel.value.content === '<p></p>') | (formModel.value.content === '')
  )
    callback(new Error('请编辑文章内容'))
  callback()
}

//表单规则，各项都要非空
const formRules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ validator: validatePassId }, { required: true }],
  cover_img: [{ validator: validatePassImg }, { required: true }],
  content: [{ validator: validatePassContent }, { required: true }]
}

//触发各表单项相应的自定义校验
watch(
  formModel,
  () => {
    // console.log('change')
    nextTick(() => {
      formRef.value.validateField('cate_id').catch(() => {})
      formRef.value.validateField('cover_img').catch(() => {})
      formRef.value.validateField('content').catch(() => {})
    })
  },
  {
    deep: true
  }
)

//头像URL
const imgUrl = ref('')

//根据选择的图片，生成本地Url赋值给imgUrl
const handleChangeAvatar = (file) => {
  //获取本地图片url
  imgUrl.value = URL.createObjectURL(file.raw)
  //将file对象 保存至formModel的cover_img
  formModel.value.cover_img = file.raw
}

//重置所有内容
const reset = () => {
  //重置formModel
  formModel.value = { ...DefaultFormModel.value }

  //重置文章封面
  imgUrl.value = ''

  //重置富文本编辑器
  editor.value.setHTML('')

  //重置校验字段
  //确保dom更新后再清除校验信息
  setTimeout(() => {
    formRef.value.clearValidate()
  }, 0)
}

//抽屉关闭处理
const handleClose = () => {
  ElMessageBox.confirm('确认退出编辑吗，退出内容将不会保存', 'Warning', {
    confirmButtonText: '退出',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //确认退出
      //重置表单
      reset()
      //关闭抽屉
      drawerVisible.value = false
    })
    .catch(() => {})
}

//提交
const submit = async (state) => {
  formModel.value.state = state

  await formRef.value.validate()
  if (isEdit.value) {
    //如果是编辑
    //创建formdata对象
    const formData = new FormData()
    //将formModel.value中的值添加到formData对象
    for (let key in formModel.value) {
      formData.append(key, formModel.value[key])
    }
    //发送更新请求
    await updateArticle(formData)
    ElMessage.success('编辑成功')
  } else {
    //如果是添加
    //创建formdata对象
    const formData = new FormData()
    //将formModel.value中的值添加到formData对象
    for (let key in formModel.value) {
      if (key !== 'id') {
        formData.append(key, formModel.value[key])
      }
    }
    //发送发布请求
    await publishArticle(formData)
    ElMessage.success('发布成功')

    console.log(formModel.value)
  }
  //编辑或发布成功
  //关闭抽屉
  drawerVisible.value = false
  //向父组件发送成功消息
  emit('success', isEdit.value)
}

/**
 *
 * 向外暴露的openDrawer方法
 * 参数：编辑文章传入的id
 */
const openDrawer = async (articleId) => {
  drawerVisible.value = true
  if (articleId) {
    //如果是编辑文章
    //先发请求获取详细信息
    const {
      data: { id, title, cate_id, cover_img, content, state }
    } = await getArticleDetail(articleId)

    //完整url
    imgUrl.value = baseURL + cover_img
    //获取图片文件
    const imgFile = await urlToFile(imgUrl.value, cover_img, 'image/jpeg')

    formModel.value = { id, title, cate_id, cover_img: imgFile, content, state }
    console.log(formModel.value)
  } else {
    //如果是发布文章
  }
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    :before-close="handleClose"
    :title="isEdit ? '编辑文章' : '发布文章'"
    size="50%"
  >
    <el-form :model="formModel" :rules="formRules" label-width="100px" ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChangeAvatar"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content" class="editorContainer">
        <div class="editor">
          <QuillEditor
            ref="editor"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('已发布')">{{
          isEdit ? '编辑文章' : '发布文章'
        }}</el-button>
        <el-button type="info" @click="submit('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    height: 200px;
  }
}
</style>
