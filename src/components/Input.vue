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
  type: {
    type: String,
    default: 'text',
  },
  max: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get: () => {
    if (
      props.type === 'datetime-local' &&
      typeof props.modelValue === 'string'
    ) {
      return props.modelValue.slice(0, 16);
    }
    return props.modelValue;
  },
  set: (val) => {
    if (
      props.type === 'datetime-local' &&
      typeof val === 'string' &&
      val.length === 16
    ) {
      emit('update:modelValue', `${val}:00`);
    } else {
      emit('update:modelValue', val);
    }
  },
});
</script>

<template>
  <div class="input-wrapper">
    <label class="label">{{ label }}</label>
    <input :type="type" class="input-value" v-model="inputValue" :max="max" />
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
