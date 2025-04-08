import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    totalIncome: 0,
    totalExpense: 0,
  }),
  actions: {
    async fetchTotals(month = 'all') {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get('/api/transactions?type=수입'),
          axios.get('/api/transactions?type=지출'),
        ]);

        const filterByMonth = (list) => {
          if (month === 'all') return list;
          return list.filter((item) => {
            const itemMonth = new Date(item.date).getMonth() + 1;
            return itemMonth === Number(month);
          });
        };

        const filteredIncome = filterByMonth(incomeRes.data);
        const filteredExpense = filterByMonth(expenseRes.data);

        this.totalIncome = filteredIncome.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        this.totalExpense = filteredExpense.reduce(
          (sum, item) => sum + item.amount,
          0
        );
      } catch (err) {
        console.error('store에서 합계 가져오기 실패:', err);
      }
    },
  },
});
