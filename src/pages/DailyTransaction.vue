<template>
  <div>
    <h2>
      📅 선택된 월:
      {{ selectedMonth === 'all' ? '전체' : selectedMonth + '월' }}
    </h2>
    <!-- 여기에 일별 내역 등 추가 -->
  </div>
</template>

<script>
export default {
  name: 'DailyTransaction',
  props: {
    selectedMonth: {
      type: [String, Number],
      default: 'all',
    },
  },
};
</script>
