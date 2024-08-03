<!-- 文章分类选择框 -->
<template>
  <el-select
    :model-value="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width: props.width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>

<script setup>
import { ref } from 'vue'
import { getArticleChannel } from '@/api/articleChannel'

const props = defineProps(['modelValue', 'width'])

const emit = defineEmits(['update:modelValue'])

const channelList = ref([])

/**
 * 获取分类列表
 */
const getChannelList = async () => {
  const { data } = await getArticleChannel()
  channelList.value = data
}

getChannelList()
</script>

<style scoped></style>
