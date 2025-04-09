<template>
  <div class="total-category">
    <header class="header">
      <span class="back" @click="goBack">&larr;</span>
      거래 내역
    </header>

    <div class="summary-filter">
      <select class="filter" v-model="selectedMonth">
        <option value="all">전체</option>
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>

      <div class="summary">
        <div class="income">
          총 수입<br />
          <span>+{{ formatMoney(totalIncome) }}</span>
        </div>
        <div class="expense">
          총 지출<br />
          <span>-{{ formatMoney(totalExpense) }}</span>
        </div>
      </div>

      <div class="tab">
        <button
          :class="{ active: activeTab === 'daily' }"
          @click="activeTab = 'daily'"
        >
          일일
        </button>
        <button
          :class="{ active: activeTab === 'category' }"
          @click="activeTab = 'category'"
        >
          카테고리별
        </button>
      </div>
    </div>

    <DailyTransaction
      v-if="activeTab === 'daily'"
      :selectedMonth="selectedMonth"
    />
    <CategoryTransaction
      v-if="activeTab === 'category'"
      :selectedMonth="selectedMonth"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';

import DailyTransaction from '@/pages/DailyTransaction.vue';
import CategoryTransaction from '@/pages/CategoryTransaction.vue';

const activeTab = ref('daily');
const selectedMonth = ref('all');

const store = useTransactionStore();
const { totalIncome, totalExpense } = storeToRefs(store);

const fetchTotals = () => {
  store.fetchTotals(selectedMonth.value);
};

watch(selectedMonth, () => {
  fetchTotals();
});

onMounted(() => {
  fetchTotals();
});

const goBack = () => {
  window.history.back();
};

const formatMoney = (amount) => {
  return amount.toLocaleString() + '원';
};
</script>

<style scoped>
@import '@/styles/totalTransaction.css';
</style>
