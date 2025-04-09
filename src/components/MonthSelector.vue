<template>
  <div class="month-selector">
    <select v-model="selectedMonth" class="month-dropdown">
      <option value="all">전체</option>
      <option v-for="month in months" :key="month" :value="month">
        {{ month }}월
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 부모에서 내려준 v-model(selectedMonth) 값 받기
const props = defineProps({
  modelValue: [String, Number],
})
// 사용자가 선택한 월을 부모에게 알려주기
const emit = defineEmits(['update:modelValue'])

// 월 리스트 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const months = Array.from({ length: 12 }, (_, i) => i + 1)

// v-model 사용을 위한 selectedMonth 계산 속성
const selectedMonth = computed({  
  get(){
    return props.modelValue       
  },
  set(value){
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
.month-selector {
  display: flex;
  /* justify-content: flex-end; */
  margin-bottom: 16px;  
}

.month-dropdown {  
  background-color: #f9fafb; 
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #111827; 
  cursor: pointer;
}

.month-dropdown:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6; /* 포커스 시 파란 테두리 */
}
</style>
