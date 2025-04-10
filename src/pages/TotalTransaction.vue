<template>
  <div class="total-category">
    <Header label="거래내역"></Header>

    <div class="summary-filter">
      <!-- 연도 선택 -->
      <div class="year-navigation">
        <button class="year-btn" @click="prevYear">&lt;</button>
        <span class="year-label">{{ selectedYear }}년</span>
        <button class="year-btn" @click="nextYear">&gt;</button>
      </div>

      <!-- 월 select 드롭다운 -->
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
      :selectedYear="selectedYear" 
    />
    <CategoryTransaction
      v-if="activeTab === 'category'"
      :selectedMonth="selectedMonth"
      :selectedYear="selectedYear"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import Header from '@/components/Header.vue';
import DailyTransaction from '@/pages/DailyTransaction.vue';
import CategoryTransaction from '@/pages/CategoryTransaction.vue';

const activeTab = ref('daily');
const selectedMonth = ref('all');
const selectedYear = ref(new Date().getFullYear()); // 연도 필터 선언

const store = useTransactionStore();
const { totalIncome, totalExpense } = storeToRefs(store);

const fetchTotals = () => {
  store.fetchTotals(selectedMonth.value, selectedYear.value); // 연도 같이 넘기도록
};

watch([selectedMonth, selectedYear], () => {
  fetchTotals();
});

onMounted(() => {
  fetchTotals();
});

//  연도 변경용 함수
const prevYear = () => {
  selectedYear.value--;
};
const nextYear = () => {
  selectedYear.value++;
};
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
