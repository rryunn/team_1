<template>
  <div class="total-category">
    <header class="header">
      <!-- 뒤로가기 SVG 버튼 -->
      <button @click="goBack" class="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="back-icon"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </button>
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
