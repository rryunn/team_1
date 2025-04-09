<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header class="header">
    <img
      src="@/assets/backArrow.png"
      alt="뒤로가기"
      class="back-arrow"
      @click="$router.back()"
    />
    <div class="title">{{ props.label }}</div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.back-arrow {
  width: 15px;
  height: 15px;
  margin-right: 15px;
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}
</style>
