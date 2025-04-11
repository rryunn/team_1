<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Input from '@/components/Input.vue';
import DropDown from '@/components/DropDown.vue';
import { transactionCategories, categoryOptions } from '@/constants/category';
import { useTransactionStore } from '@/stores/transactionStore';
import { getCurrentDatetimeLocal } from '@/utils/date';

const store = useTransactionStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

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

onMounted(async () => {
  try {
    await store.getTransactionById(id);
    const detail = store.selectedTransaction;

    transactionTitle.value = detail.title;
    transactionType.value = detail.type;
    transactionAmount.value = detail.amount;
    transactionTime.value = detail.date;
    transactionCategory.value = detail.category;
    transactionMemo.value = detail.memo;
  } catch (error) {
    console.error('상세 조회 실패:', error);
    alert('상세 조회에 실패했습니다.');
  }
});

const handleModify = async () => {
  const payload = {
    title: transactionTitle.value,
    type: transactionType.value,
    amount: transactionAmount.value,
    date: transactionTime.value + ':00',
    category: transactionCategory.value,
    memo: transactionMemo.value,
  };

  try {
    await store.editTransaction(id, payload);
    alert('수정 성공');
    router.back();
  } catch (error) {
    console.error('수정 실패:', error);
    alert('수정 실패');
  }
};

const handleDelete = async () => {
  try {
    await store.deleteTransaction(id);
    alert('삭제 성공');
    router.back();
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('삭제 실패');
  }
};
</script>

<template>
  <div class="container">
    <Header label="거래 상세조회 및 수정"></Header>
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

      <div class="button-wrapper">
        <button class="button-delete" @click="handleDelete">삭제</button>
        <button class="button-complete" @click="handleModify">수정 완료</button>
      </div>
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
  gap: 10px;
  margin: 0 20px;
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.button-complete {
  background-color: #4318ff;
  border-radius: 12px;
  border: 0;
  color: #fff;
  width: 48%;
  height: 40px;
}

.button-delete {
  background-color: #fe324e;
  border-radius: 12px;
  border: 0;
  color: #fff;
  width: 48%;
  height: 40px;
}
</style>
