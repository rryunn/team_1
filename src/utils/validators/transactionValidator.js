export function validateTransactionPayload(payload) {
  const requiredFields = ['title', 'type', 'amount', 'date', 'category'];

  for (const field of requiredFields) {
    if (!payload[field] || payload[field].toString().trim() === '') {
      throw new Error(`필수 항목 누락`);
    }
  }

  if (isNaN(Number(payload.amount))) {
    throw new Error('금액은 숫자여야 합니다.');
  }

  return true;
}
