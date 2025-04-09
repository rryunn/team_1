<template>
  <div class="recent-transactions">
    <div class="header">
      <span class="title">최근 거래 내역</span>
      <button class="view-all" @click="goToAllTransationcs">></button>
    </div>
    
    <ul class="transaction-list">
      <li v-for="tx in recentTransactions" :key="tx.id" class="transaction-item">
        <div class="info">
          <div class="txtitle">{{ tx.title }}</div>
          <div class="date">{{ formatDate(tx.date) }}</div>
        </div>
        <div
          class="amount"
          :class="{ income: tx.type === '수입', expense: tx.type === '지출' }"
        >
          {{ (tx.type === '수입' ? '+' : '-') + tx.amount.toLocaleString() }}원
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// 최근 거래 내역
const recentTransactions = ref([]);

const fetchRecentTransactions = async () => {
  try {
    const res = await axios.get('/api/transactions?_sort=date&_order=desc&_limit=6')
    recentTransactions.value = res.data
    //console.log(res.data);
  } catch (error) {
    console.error('최근 거래 불러오기 실패:', error)
  }
}

onMounted(()=>{
  fetchRecentTransactions()
})

const goToAllTransationcs= ()=>{
  router.push('/totalTransaction')
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.recent-transactions {
  margin-top: 24px;
  
}
.header{
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}
.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}
.view-all{
  background: none;
  border: none;
  cursor: pointer;
  font-weight:500;
  color: #87888a;
}
.info {
  display: flex;
  flex-direction: column;
}
.txtitle {
  font-weight: 500;
}
.date {
  font-size: 12px;
  color: #6b7280;
}
.amount {
  font-weight: bold;
}
.amount.expense {
  color: rgb(24, 119, 228);
}
.amount.income {
  color: rgb(235, 45, 45);
}
</style>