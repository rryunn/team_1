<template>
  <div class="transaction-list">
    <!-- 상단 고정 필터 -->
    <div class="date-range-filter">
      <input type="date" v-model="startDate" class="date-input" />
      <span class="tilde">~</span>
      <input type="date" v-model="endDate" class="date-input" />
      <button class="filter-btn" @click="applyDateFilter">검색</button>
    </div>

    <div class="scroll-area">
      <div class="scroll-content">
        <!-- 거래 내역 있을 때 -->
        <div v-if="groupedPaginatedTransactions.length > 0">
          <div
            v-for="[date, items] in groupedPaginatedTransactions"
            :key="date"
            class="day-group"
          >
            <h4 class="date">{{ date }}</h4>
            <ul>
              <li
                v-for="tx in items"
                :key="tx.id"
                class="transaction-item"
                @click="goToDetail(tx.id)"
              >
                <span class="icon">{{ getIcon(tx.category) }}</span>
                <span class="name">{{ tx.title }}</span>
                <span
                  class="amount"
                  :class="{
                    income: tx.type === '수입',
                    expense: tx.type === '지출',
                  }"
                >
                  {{ tx.type === '수입' ? '+' : '-' }}
                  {{ tx.amount.toLocaleString() }}원
                </span>
              </li>
            </ul>
          </div>

          <div class="pagination" v-if="totalPages > 1">
            <span
              v-for="n in totalPages"
              :key="n"
              @click="currentPage = n"
              :class="{ 'page-number': true, active: currentPage === n }"
            >
              {{ n }}
            </span>
          </div>
        </div>

        <!-- 거래 내역 없을 때 -->
        <div v-else class="empty-message">거래 내역이 없습니다.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
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

const filteredTransactions = ref([]);
const startDate = ref('');
const endDate = ref('');
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 10;

const groupedTransactions = computed(() => {
  const grouped = {};
  filteredTransactions.value.forEach((tx) => {
    const date = new Date(tx.date);
    const year = date.getFullYear();
    const label = `${year}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(tx);
  });

  return Object.entries(grouped).sort((a, b) => {
    const d1 = new Date(b[1][0].date);
    const d2 = new Date(a[1][0].date);
    return d1 - d2;
  });
});

const groupedTransactionsByItems = computed(() => {
  const result = [];
  let page = [];
  let count = 0;

  for (const group of groupedTransactions.value) {
    const [, items] = group;
    if (count + items.length > itemsPerPage && page.length > 0) {
      result.push(page);
      page = [];
      count = 0;
    }
    page.push(group);
    count += items.length;
  }

  if (page.length > 0) result.push(page);
  return result;
});

const groupedPaginatedTransactions = computed(() => {
  return groupedTransactionsByItems.value[currentPage.value - 1] || [];
});

const totalPages = computed(() => groupedTransactionsByItems.value.length);

const fetchTransactions = async (ignoreDateFilter = false) => {
  try {
    const res = await axios.get('http://localhost:3000/transactions');
    let list = res.data;

    if (!ignoreDateFilter) {
      const year = Number(props.selectedYear);
      const month =
        props.selectedMonth === 'all' ? null : Number(props.selectedMonth);

      list = list.filter((tx) => {
        const date = new Date(tx.date);
        const txYear = date.getFullYear();
        const txMonth = date.getMonth() + 1;

        const yearMatches = txYear === year;
        const monthMatches = month ? txMonth === month : true;

        return yearMatches && monthMatches;
      });
    }

    filteredTransactions.value = list;
    currentPage.value = 1;
  } catch (err) {
    console.error('거래내역 가져오기 실패:', err);
  }
};

const applyDateFilter = async () => {
  try {
    let url = 'http://localhost:3000/transactions';

    if (!startDate.value && !endDate.value) {
      await fetchTransactions();
      return;
    }

    if (startDate.value && endDate.value) {
      const end = new Date(endDate.value);
      const endWithTime = `${end.toISOString().slice(0, 10)}T23:59:59`;
      url += `?date_gte=${startDate.value}&date_lte=${endWithTime}`;
    } else if (startDate.value) {
      url += `?date_gte=${startDate.value}&date_lte=${startDate.value}T23:59:59`;
    } else if (endDate.value) {
      //  endDate만 선택된 경우
      const end = new Date(endDate.value);
      const endWithTime = `${end.toISOString().slice(0, 10)}T23:59:59`;
      url += `?date_lte=${endWithTime}`;
    }

    const res = await axios.get(url);
    filteredTransactions.value = res.data;
    currentPage.value = 1;
  } catch (err) {
    console.error('날짜 필터링 실패:', err);
  }
};

const getIcon = (category) => {
  const icons = {
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
  return icons[category] || '💳';
};

const goToDetail = (id) => {
  router.push(`/transactions/edit/${id}`);
};

onMounted(() => {
  fetchTransactions();
});

watch(
  () => [props.selectedMonth, props.selectedYear],
  async () => {
    startDate.value = '';
    endDate.value = '';
    await fetchTransactions();
  }
);

watch(filteredTransactions, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.date-range-filter {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  margin-bottom: 16px;
  font-size: 14px;
}

.scroll-area {
  overflow-y: unset;
  height: auto;
}
.scroll-content {
  flex-direction: column;
}

.date-input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
}
.filter-btn {
  white-space: nowrap;
  padding: 6px;
  min-width: 50px;
  border-radius: 6px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  margin-right: 6px;
}
.filter-btn:hover {
  background-color: #0056b3;
}

.day-group {
  margin-bottom: 12px;
}

.date {
  font-size: 14px;
  margin-bottom: 5px;
  color: #444;
}
.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.transaction-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 10px;
}
.name {
  flex: 1;
  text-align: left;
}
.amount {
  font-weight: bold;
}
.income {
  color: red;
}
.expense {
  color: blue;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}
.page-number {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.page-number:hover {
  background-color: #f0f0f0;
}
.page-number.active {
  font-weight: bold;
  border: 1px solid #007bff;
  background-color: #e6f0ff;
  color: #007bff;
}

/* ✨ 거래 내역 없을 때 */
.empty-message {
  padding: 40px 0;
  text-align: center;
  color: #888;
  font-size: 14px;
  font-style: italic;
}
</style>
