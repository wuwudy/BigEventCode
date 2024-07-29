<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>{{ props.title }} </span>
        <button>
          <slot name="buttontext"></slot>
        </button>
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
  width: 100%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    button {
      height: 30px;
      border: 0px;
      border-radius: 5px;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
