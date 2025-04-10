<template>
  <div class="dashboard">
    <ProfileMain></ProfileMain>
    <MonthSelector v-model="selectedMonth" />
    <SummaryCards />
    <RecentTransactions></RecentTransactions>
    <div class="button-container">
      <button class="circle" @click="goToRegistration">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';

import ProfileMain from '@/components/ProfileMain.vue';
import MonthSelector from '@/components/MonthSelector.vue';
import SummaryCards from '@/components/SummaryCards.vue';
import RecentTransactions from '@/components/RecentTransactions.vue';

const router = useRouter();
const store = useTransactionStore(); // totalIncome, totalExpense, fetchTotal

// 현재 선택된 월 (기본값: 현재 월 (= 4월))
const selectedMonth = ref(new Date().getMonth() + 1);

const currentYear = new Date().getFullYear();

// selectedMonth(월) 변경될 때마다 store에서 합계 가져오기
watch(selectedMonth, (newMonth) => {
  store.fetchTotals(newMonth, currentYear);
});

// 초기 mount 시 데이터 불러오기
onMounted(() => {
  store.fetchTotals(selectedMonth.value, currentYear);
});
// + 버튼 누르면 등록 페이지로 이동
const goToRegistration = () => {
  router.push('/transactions')
}
</script>

<style scoped>
.dashboard {
  max-width: 640px;
  margin: 0 0.5rem;
  padding-top: 0;
  margin-top: 0.5rem;
  padding: 0 1rem;
}
.button-container {
  display: flex;
  justify-content: flex-end;    
}
.circle {
  border: none;
  width: 2em;
  height: 2em;
  color: white;
  border-radius: 50%;
  font-size: larger;
  font-weight: bolder;
  background-color: rgb(249, 225, 149);
  margin-top: 3px;
}
</style>
