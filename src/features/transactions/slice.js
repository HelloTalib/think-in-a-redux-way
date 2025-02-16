import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, createTransaction, removeTransaction, editTransaction } from "./transactionAPI";

const initialState = {
    transactions: [],
    loading: false,
    error: null,
    activeEditing: null,
    cancelEditing: null,
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
    reducers: {
        activeEditing: (state, action) => {
            state.activeEditing = action.payload;

        },
        cancelEditing: (state) => {
            state.activeEditing = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction.id !== action.payload.id
                );
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.error = false;
                state.loading = false;

                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default transactionsSlice.reducer;
export const { activeEditing, cancelEditing } = transactionsSlice.actions;

