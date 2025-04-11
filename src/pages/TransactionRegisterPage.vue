<script setup>
import { ref, watch } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';
import DropDown from '@/components/DropDown.vue';
import { transactionCategories, categoryOptions } from '@/constants/category';
import { useRouter } from 'vue-router';
import { getCurrentDatetimeLocal } from '@/utils/date';

const store = useTransactionStore();
const router = useRouter();

const transactionTitle = ref('');
const transactionType = ref('');
const transactionAmount = ref('');
const transactionTime = ref('');
const transactionCategory = ref('');
const transactionMemo = ref('');

const now = getCurrentDatetimeLocal();

function handleTimeInput(event) {
  const selectedValue = event.target.value;
  const selectedDate = new Date(selectedValue);
  const nowDate = new Date();

  if (selectedDate > nowDate) {
    alert('미래 시간은 선택할 수 없습니다.');
    event.target.value = '';
    transactionTime.value = '';
    return;
  }

  transactionTime.value = selectedValue;
}

async function handleSubmit() {
  const payload = {
    title: transactionTitle.value,
    type: transactionType.value,
    amount: transactionAmount.value,
    date: transactionTime.value + ':00',
    category: transactionCategory.value,
    memo: transactionMemo.value,
  };

  try {
    await store.registerTransaction(payload);
    alert('등록 성공');
    router.push({ path: '/' });
  } catch (error) {
    console.error('등록 실패:', error);
    alert('등록 실패: ' + error.message);
  }
}
</script>

<template>
  <div class="container">
    <Header label="거래 등록"></Header>
    <div class="wrapper">
      <Input type="text" label="거래명" v-model="transactionTitle" />
      <DropDown
        label="거래 분류"
        :options="transactionCategories"
        v-model:selected="transactionType"
      />
      <Input type="number" label="거래 금액" v-model="transactionAmount" />
      <Input
        type="datetime-local"
        label="거래 시간"
        v-model="transactionTime"
        :max="now"
        @input="handleTimeInput"
      />
      <DropDown
        label="거래 카테고리"
        :options="categoryOptions"
        v-model:selected="transactionCategory"
      />
      <Input type="text" label="거래 메모" v-model="transactionMemo" />

      <button class="button" @click="handleSubmit">등록</button>
    </div>
  </div>
</template>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0 20px;
}

.button {
  background-color: #4318ff;
  border-radius: 12px;
  border: 0;
  color: #fff;
  width: 100%;
  height: 40px;
}
</style>
