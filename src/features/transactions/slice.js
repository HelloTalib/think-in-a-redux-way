import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, createTransaction, removeTransaction, editTransaction } from "./transactionAPI";

const initialState = {
    transactions: [],
    loading: false,
    error: null,
};

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        const transactions = await getTransactions();
        return transactions;
    }
);

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transaction) => {
        return await createTransaction(transaction);
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id) => {
        return await removeTransaction(id);
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async (transaction) => {
        return await editTransaction(transaction);
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(
                    (transaction) => transaction.id !== action.payload.id
                );
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(
                    (transaction) => transaction.id === action.payload.id
                );
                state.transactions[index] = action.payload;
            });
    },
});

export default transactionsSlice.reducer;

