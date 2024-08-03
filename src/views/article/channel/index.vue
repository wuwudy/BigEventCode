<!-- 文章分类 -->
<template>
  <operate-card title="文章分类">
    <template #button>
      <el-button type="primary" @click="openDialog">添加分类</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="200">
        <template #default="obj">
          <el-button
            plain
            type="primary"
            :icon="Edit"
            circle
            @click="dialog.openDialog(obj.row.id)"
          />
          <el-button plain type="danger" :icon="Delete" circle @click="handleDel(obj.row.id)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="您还没有添加任何分类，快去试试吧~" />
      </template>
    </el-table>
  </operate-card>

  <channel-dialog ref="dialog" @renderPage="getArticleChannelData"></channel-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { getArticleChannel, deleteArticleChannel } from '@/api/articleChannel'

const tableData = ref([])

const dialog = ref(null)

const loading = ref(true)
/**
 * 获取文章分类
 */
const getArticleChannelData = async () => {
  if (loading.value === false) loading.value = true
  const res = await getArticleChannel()
  tableData.value = res.data
  loading.value = false
}

/**
 * 打开新增框
 */
const openDialog = () => {
  dialog.value.openDialog()
}

/**
 * 删除分类
 */
const handleDel = async (id) => {
  await deleteArticleChannel(id)

  getArticleChannelData()
}

getArticleChannelData()
</script>

<style lang="scss" scoped></style>
