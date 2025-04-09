<template>
  <div class="category-transaction">
    <h3>{{ selectedMonthLabel }} 수입/지출 카테고리별 내역</h3>

    <div class="category-group">
      <h4>💰 수입</h4>
      <ul v-if="Object.keys(incomeByCategory).length > 0">
        <li
          v-for="(amount, category) in incomeByCategory"
          :key="category"
          class="category-item"
        >
          <span class="category">{{ category }}</span>
          <span class="amount income">+{{ amount.toLocaleString() }}원</span>
        </li>
      </ul>
      <p v-else class="no-data">수입 내역이 없습니다.</p>
    </div>

    <div class="category-group">
      <h4>💸 지출</h4>
      <ul v-if="Object.keys(expenseByCategory).length > 0">
        <li
          v-for="(amount, category) in expenseByCategory"
          :key="category"
          class="category-item"
        >
          <span class="category">{{ category }}</span>
          <span class="amount expense">-{{ amount.toLocaleString() }}원</span>
        </li>
      </ul>
      <p v-else class="no-data">지출 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  selectedMonth: {
    type: [String, Number],
    default: 'all',
  },
});

const transactions = ref([]);

const fetchTransactions = async () => {
  try {
    const res = await axios.get('http://localhost:3000/transactions');
    const allTransactions = res.data;

    if (props.selectedMonth === 'all') {
      transactions.value = allTransactions;
    } else {
      const year = new Date().getFullYear();
      const padded = String(props.selectedMonth).padStart(2, '0');
      transactions.value = allTransactions.filter((t) =>
        t.date.startsWith(`${year}-${padded}`)
      );
    }
  } catch (err) {
    console.error('카테고리 거래내역 로딩 실패:', err);
  }
};

const incomeByCategory = computed(() => {
  const result = {};
  transactions.value
    .filter((t) => t.type === '수입')
    .forEach((t) => {
      result[t.category] = (result[t.category] || 0) + Number(t.amount);
    });
  return result;
});

const expenseByCategory = computed(() => {
  const result = {};
  transactions.value
    .filter((t) => t.type === '지출')
    .forEach((t) => {
      result[t.category] = (result[t.category] || 0) + Number(t.amount);
    });
  return result;
});

const selectedMonthLabel = computed(() =>
  props.selectedMonth === 'all' ? '전체' : `${props.selectedMonth}월`
);

onMounted(fetchTransactions);
watch(() => props.selectedMonth, fetchTransactions);
</script>

<style scoped>
.category-transaction {
  padding: 16px;
  font-family: sans-serif;
  font-size: 14px;
}

h3 {
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: bold;
}

.category-group {
  margin-bottom: 24px;
}

h4 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.category {
  color: #444;
}

.amount {
  font-weight: bold;
}

.amount.income {
  color: #ff3366;
}

.amount.expense {
  color: #007bff;
}

.no-data {
  padding: 6px 0;
  font-style: italic;
  color: #999;
}
</style>
