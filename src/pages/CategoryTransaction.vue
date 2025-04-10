<template>
  <div class="category-transaction">
    <h3 class="title">
      {{ selectedYear }}년 {{ selectedMonthLabel }} 수입/지출 카테고리별 내역
    </h3>

    <div class="category-group">
      <h4>< 수입 ></h4>
      <ul v-if="Object.keys(incomeByCategory).length > 0">
        <li
          v-for="(amount, category) in incomeByCategory"
          :key="category"
          class="category-item"
        >
          <span class="category">
            {{ categoryIcons[category] || '💳' }} {{ category }}
          </span>
          <span class="amount income">+{{ amount.toLocaleString() }}원</span>
        </li>
      </ul>
      <p v-else class="no-data">수입 내역이 없습니다.</p>
    </div>

    <div class="category-group">
      <h4>< 지출 ></h4>
      <ul v-if="Object.keys(expenseByCategory).length > 0">
        <li
          v-for="(amount, category) in expenseByCategory"
          :key="category"
          class="category-item"
        >
          <span class="category">
            {{ categoryIcons[category] || '💳' }} {{ category }}
          </span>
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
  selectedYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

const transactions = ref([]);

const categoryIcons = {
  월급: '💸',
  용돈: '💰',
  식비: '🍽️',
  교통: '🚌',
  문화생활: '🎬',
  쇼핑: '🛍️',
  기타: '📦',
  여행: '✈️',
  교육: '📚',
};

const fetchTransactions = async () => {
  try {
    const res = await axios.get('http://localhost:3000/transactions');
    const allTransactions = res.data;

    const year = props.selectedYear;
    const month =
      props.selectedMonth === 'all' ? null : Number(props.selectedMonth);

    transactions.value = allTransactions.filter((t) => {
      const date = new Date(t.date);
      const txYear = date.getFullYear();
      const txMonth = date.getMonth() + 1;
      return txYear === year && (month ? txMonth === month : true);
    });
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
watch(() => [props.selectedMonth, props.selectedYear], fetchTransactions);
</script>

<style scoped>
.category-transaction {
  padding: 0 16px;
  font-family: sans-serif;
  font-size: 14px;
}

.title {
  font-size: 15px;
  font-weight: bold;
  color: #222;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.category-group {
  margin-bottom: 28px;
  background-color: #fafafa;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

h4 {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
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
  border-bottom: 1px dashed #e0e0e0;
}

.category-item:last-child {
  border-bottom: none;
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
  text-align: center;
  padding: 16px 0;
  font-style: italic;
  color: #999;
}
</style>
