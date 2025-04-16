import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { transactionsApi } from "./apis/transactionsApi";
import { transactionFormReducer, changeAmount,changeCategory,changeDate,changeDescription,changeSource,changeTitle,changeType,resetForm } from "./apis/slices/transactionFormSlice";


export const store = configureStore({
    reducer:{
        [transactionsApi.reducerPath]:transactionsApi.reducer,
        transactionForm: transactionFormReducer
    },

    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(transactionsApi.middleware)
    }
});

setupListeners(store.dispatch);


console.log(store)
export {
    changeAmount,changeCategory,changeDate,changeDescription,changeSource,changeTitle,changeType,resetForm
}

export {
    useFetchTransactionsQuery,
    useAddTransactionMutation,
    useRemoveTransactionMutation,
} from './apis/transactionsApi';