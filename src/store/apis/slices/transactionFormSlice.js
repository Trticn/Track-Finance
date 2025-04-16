import { createSlice } from "@reduxjs/toolkit";

const transactionFormSlice = createSlice({
    name:'transactionForm',
    initialState:{
        title:"",
        amount: 0,
        category: "",
        description:"",
        source: "",
        date: "",
        type:""
    },
    
    reducers:{
        changeTitle(state,action){
            state.title = action.payload
        },
        changeAmount(state,action){
            state.amount = action.payload
        },
        changeCategory(state,action){
            state.category = action.payload
        },
        changeDescription(state,action){
            state.description = action.payload
        },
        changeSource(state,action){
            state.source = action.payload
        },
        changeDate(state,action){
            state.date = action.payload
        },

        changeType(state,action){
            state.type = action.payload
        },
        resetForm(state) {
            state.title = "";
            state.amount = 0;
            state.category = "";
            state.description = "";
            state.source = "";
            state.date = "";
            state.type = "";
          }

        
    }
})


export const {changeTitle,changeAmount,changeCategory,changeDate,changeDescription,changeSource,changeType,resetForm} = transactionFormSlice.actions;

export const transactionFormReducer = transactionFormSlice.reducer