<template>
    <div class="summary-cards">
      <div class="summary-card income">
        <p class="label">총 수입</p>
        <p class="amount">{{ Number(totalIncome).toLocaleString()}}원</p>
      </div>
      <div class="summary-card expense">
        <p class="label">총 지출</p>
        <p class="amount">{{ Number(totalExpense).toLocaleString() }}원</p>
      </div>
      
      <div class="summary-card net">
        <p class="label">순수익</p>
        <p class="amount">{{ (Number(totalIncome) - Number(totalExpense)).toLocaleString() }}원</p>
      </div>
    </div>
</template>
  
<style scoped>
  .summary-cards {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .summary-card {
    flex: 1;
    min-width: 30px;
    border-radius: 12px;
    padding: 10px;
    color: white;
    justify-content: center;
    /* box-shadow: 0 4px 6px rgba(0,0,0,0.1); */
  }
  
  .summary-card .label {
    font-size: 12px;
    margin-bottom: 4px;
  }
  
  .summary-card .amount {
    font-size: 13px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top:8px;        
  }
  
  .summary-card.income {
    background: linear-gradient(to right, #fc8d98, #f05aa5); 
  }
  
  .summary-card.net {
    background: linear-gradient(to right, #8893f9, #6b6ef8); 
  }
  
  .summary-card.expense {
    background: linear-gradient(to right, #75bffc, #498df9); 
  }
</style>
  
  
<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';

const store = useTransactionStore();
const { totalIncome, totalExpense } = storeToRefs(store)

</script>
  
