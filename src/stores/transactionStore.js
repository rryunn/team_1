import { defineStore } from 'pinia';
import axios from 'axios';
import { validateTransactionPayload } from '@/utils/validators/transactionValidator';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    totalIncome: 0,
    totalExpense: 0,
    transactions: [],
    selectedTransaction: null,
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

    async getTransactionById(id) {
      try {
        const response = await axios.get(`/api/transactions/${id}`);
        this.selectedTransaction = response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async registerTransaction(payload) {
      try {
        validateTransactionPayload(payload);
        const response = await axios.post('/api/transactions', payload);
        this.transactions.push(response.data);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async editTransaction(id, payload) {
      try {
        validateTransactionPayload(payload);
        const response = await axios.put(`/api/transactions/${id}`, payload);
        const index = this.transactions.findIndex((tx) => tx.id === id);
        if (index !== -1) this.transactions[index] = response.data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async deleteTransaction(id) {
      try {
        await axios.delete(`/api/transactions/${id}`);
        this.transactions = this.transactions.filter((tx) => tx.id !== id);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
});
