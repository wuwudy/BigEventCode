<!-- 文章管理 -->
<template>
  <operate-card title="文章管理">
    <template #button>
      <el-button type="primary" @click="drawer.openDrawer()">发布文章</el-button>
    </template>
    <el-form inline :model="params">
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id" style="width: 180px"></channel-select>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-select v-model="params.state" style="width: 180px">
          <el-option v-for="item in status" :key="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchArticle">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading">
      <el-table-column prop="title" label="文章标题" />
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间" width="200">
        <template #default="{ row }">
          {{ dateShift(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="obj">
          <el-button
            plain
            type="primary"
            :icon="Edit"
            circle
            @click="drawer.openDrawer(obj.row.id)"
          />
          <el-button plain type="danger" :icon="Delete" circle @click="handleDel(obj.row.id)" />
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="您还没有添加任何文章，快去试试吧~" />
      </template>
    </el-table>

    <div class="pagination" style="margin-top: 10px">
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[3, 5, 7, 10]"
        :background="true"
        :disabled="false"
        layout="jumper,total, sizes, prev, pager, next "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <article-drawer ref="drawer" @success="handleSuccess"></article-drawer>
  </operate-card>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { getArticleList, deleteArticle } from '@/api/articleManager'
import { dateShift } from '@/utils/dateShift'

const status = ref(['已发布', '草稿'])

const defaultParams = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: null,
  state: ''
})

//获取文章列表参数
const params = ref({ ...defaultParams.value })

//文章总数
const total = ref(0)

//该页文章列表
const articleList = ref([])

//添加编辑 抽屉
const drawer = ref(null)

//加载
const loading = ref(false)

//获取文章
const getArticle = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  //初始该页文章列表
  articleList.value = res.data
  //初始总共的文章数
  total.value = res.total
  console.log(articleList.value)

  loading.value = false
}

//搜索文章
const searchArticle = () => {
  //搜索文章默认从第一页渲染
  params.value.pagenum = 1
  getArticle()
}

//重置搜索条件
const resetSearch = () => {
  params.value = { ...defaultParams.value }
}

/**
 * 分页器
 */
//页大小修改
const handleSizeChange = () => {
  //页面大小修改就都从第一页开始渲染
  params.value.pagenum = 1
  getArticle()
}

//当前页修改
const handleCurrentChange = () => {
  console.log(params.value.pagenum)

  getArticle()
}

/**
 * 处理抽屉处理成功情况
 */
const handleSuccess = (isEdit) => {
  if (isEdit) {
    //如果是编辑
    //保持当前页
  } else {
    //如果是新增
    //跳转至最新一页
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getArticle()
}

//删除文章
const handleDel = async (id) => {
  //弹出消息框
  await ElMessageBox.confirm('确定删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  //删除文章
  await deleteArticle(id)

  ElMessage.success('删除成功')

  //如果当前页文章数等于1且不是第一页，需往前退一页
  if (articleList.value.length === 1 && params.value.pagenum !== 1) {
    params.value.pagenum -= 1
  }
  getArticle()
}

getArticle()
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
