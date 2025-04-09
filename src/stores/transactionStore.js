import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { validateTransactionPayload } from '@/utils/validators/transactionValidator';

export const useTransactionStore = defineStore('transaction', () => {
  const totalIncome = ref(0);
  const totalExpense = ref(0);
  const transactions = ref([]);
  const selectedTransaction = ref(null);

  const filterByMonth = (list, month) => {
    if (month === 'all') return list;
    return list.filter((item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return itemMonth === Number(month);
    });
  };

  const fetchTotals = async (month = 'all') => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get('/api/transactions?type=수입'),
        axios.get('/api/transactions?type=지출'),
      ]);

      const filteredIncome = filterByMonth(incomeRes.data, month);
      const filteredExpense = filterByMonth(expenseRes.data, month);

      totalIncome.value = filteredIncome.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
      totalExpense.value = filteredExpense.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
    } catch (err) {
      console.error('store에서 합계 가져오기 실패:', err);
    }
  };

  const getTransactionById = async (id) => {
    try {
      const response = await axios.get(`/api/transactions/${id}`);
      selectedTransaction.value = response.data;
    } catch (e) {
      console.error('상세 조회 실패:', e);
      throw e;
    }
  };

  const registerTransaction = async (payload) => {
    try {
      validateTransactionPayload(payload);
      const response = await axios.post('/api/transactions', payload);
      transactions.value.push(response.data);
    } catch (e) {
      console.error('등록 실패:', e);
      throw e;
    }
  };

  const editTransaction = async (id, payload) => {
    try {
      validateTransactionPayload(payload);
      const response = await axios.put(`/api/transactions/${id}`, payload);
      const index = transactions.value.findIndex((tx) => tx.id === id);
      if (index !== -1) {
        transactions.value[index] = response.data;
      }
    } catch (e) {
      console.error('수정 실패:', e);
      throw e;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      transactions.value = transactions.value.filter((tx) => tx.id !== id);
    } catch (e) {
      console.error('삭제 실패:', e);
      throw e;
    }
  };

  return {
    totalIncome,
    totalExpense,
    transactions,
    selectedTransaction,
    fetchTotals,
    getTransactionById,
    registerTransaction,
    editTransaction,
    deleteTransaction,
    totalExpense,
    totalIncome
  };
});
