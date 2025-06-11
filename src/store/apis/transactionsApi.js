
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transactionsApi = createApi({
    reducerPath:'transactions',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://trackfinancebackend-production.up.railway.app'
    }),
    

    endpoints(builder){
        return{
            fetchTransactions:builder.query({
                query:()=> '/transactions',
                providesTags:["Transactions"]
            }),

            addTransaction:builder.mutation({
                query:(transaction)=>({
                    url:'/transactions',
                    method:'POST',
                    body:{
                        title:transaction.title,
                        amount: transaction.amount,
                        category: transaction.category,
                        description:transaction.description,
                        source: transaction.source,
                        date: transaction.date,
                        type:transaction.type
                    }
                }),
                invalidatesTags:["Transactions"]
            }),

            removeTransaction: builder.mutation({
                query: (transaction) => ({
                  url: `/transactions/${transaction.id}`,  
                  method: 'DELETE',
                }),
                invalidatesTags: ['Transactions'],
              }),
        }
    }
});



export const {
    useFetchTransactionsQuery,
    useAddTransactionMutation,
    useRemoveTransactionMutation,
} = transactionsApi;


export {transactionsApi}