import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../features/transactions/slice";
export const store = configureStore({
    reducer: {
        transactions: transactionsSlice,
    },
});
