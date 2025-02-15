import axios from '../../utils/axios';

export const getTransactions = async () => {
    const response = await axios.get('/transactions');
    return response.data;
}

export const createTransaction = async (transaction) => {

    const response = await axios.post('/transactions', transaction);
    return response.data;
}

export const removeTransaction = async (id) => {
    const response = await axios.delete(`/transactions/${id}`);
    return response.data;
}

export const editTransaction = async (transaction) => {
    const response = await axios.put(`/transactions/${transaction.id}`, transaction);
    return response.data;
}
