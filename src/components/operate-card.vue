<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>{{ props.title }} </span>
        <slot name="button"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  width: 100%;
  overflow: visible;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
}
</style>
