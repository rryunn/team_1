<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  selected: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get: () => props.selected,
  set: (val) => emit('update:selected', val),
});
</script>

<template>
  <div class="select-wrapper">
    <label class="label">{{ props.label }}</label>
    <select v-model="selectedValue" class="dropdown">
      <option disabled value="">선택하세요</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.label {
  font-size: 14px;
  color: #374151;
  font-weight: bold;
}

.dropdown {
  padding: 10px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
}
</style>
