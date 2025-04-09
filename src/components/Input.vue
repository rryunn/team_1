<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <div class="input-wrapper">
    <label class="label">{{ label }}</label>
    <input type="text" class="input-value" v-model="inputValue" />
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.label {
  color: #374151;
  font-size: 14px;
  font-weight: bold;
}

.input-value {
  border-radius: 12px;
  border: 2px solid #d1d5db;
  height: 45px;
  padding: 10px;
}
</style>
