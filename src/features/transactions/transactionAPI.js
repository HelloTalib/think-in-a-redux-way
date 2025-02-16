import axios from '../../utils/axios';

export const getTransactions = async () => {
    const response = await axios.get('/');
    return response.data;
}

export const createTransaction = async (transaction) => {
    const wpStructure = {
        ...transaction,
        id: transaction.id,
        title: transaction.name,
        status: 'publish',
        meta: {
            amount: transaction.amount,
            type: transaction.type,
        },
    }
    const response = await axios.post('/', wpStructure);
    return response.data;
}

export const removeTransaction = async (id) => {
    const response = await axios.delete(`/${id}`);
    return response.data;
}

export const editTransaction = async (transaction) => {
    const data = {
        id: transaction.id,
        title: transaction.name,
        meta: {
            amount: transaction.amount,
            type: transaction.type,
        },
    }
    const response = await axios.put(`/${transaction.id}`, data);
    return response.data;
}
