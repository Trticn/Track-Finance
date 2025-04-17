import { useDispatch, useSelector } from "react-redux";
import { 
  changeTitle, 
  changeAmount, 
  changeCategory, 
  changeDate, 
  changeDescription, 
  changeSource, 
  changeType,
  useAddTransactionMutation,
  resetForm,
} from "../store";
import { INCOME_CATEGORIES,EXPENSE_CATEGORIES } from "../config";
import { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { SOURCES } from "../config";

function AddTransaction() {
  const [addTransaction, results] = useAddTransactionMutation();
  const dispatch = useDispatch();
  
  const { 
    title, 
    amount, 
    category, 
    date, 
    description, 
    source,
    type 
  } = useSelector(state => state.transactionForm);

  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !amount || !category || !source || !type) {
      showNotification('Please fill in all required fields!', false);
      return;
    }
    
    try {
      await addTransaction({
        title, 
        amount: parseFloat(amount), 
        category, 
        description, 
        source, 
        date: date,
        type
      }).unwrap();
      
      showNotification('Transaction added successfully!', true);
      dispatch(resetForm())
    } catch (error) {
      showNotification('Failed to add transaction!', false);
      console.error('Transaction error:', error);
    }
  };




  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 1500);
  };

  const handleUseCurrentDate = () => {
    const now = new Date().toISOString();
    dispatch(changeDate(now));
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center"> 
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
              <PlusCircleIcon className="h-6 w-6" />
            </span>
            Add New Transaction
          </h2>
          
          {notification && (
            <div className={`mb-4 p-3 rounded-lg flex items-center ${notification.isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {notification.isSuccess ? (
                <CheckCircleIcon className="h-5 w-5 mr-2" />
              ) : (
                <XCircleIcon className="h-5 w-5 mr-2" />
              )}
              {notification.message}
            </div>
          )}

          <form name="add-transaction" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  id="title"
                  value={title}
                  name="title"
                  onChange={(e) => dispatch(changeTitle(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  placeholder="Transaction title"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                  <input
                    id="amount"
                    value={amount}
                    onChange={(e) => dispatch(changeAmount(e.target.value))}
                    className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="number"
                    step="0.01"
                    name="amount"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">Transaction Type*</span>
              <div id="transaction-type" className="grid grid-cols-2 gap-3">
                <button
          
                  type="button"
                  id="income-btn"
                  onClick={() => dispatch(changeType('income'))}
                  className={`flex cursor-pointer items-center justify-center p-3 rounded-lg border transition-all ${
                    type === 'income' 
                      ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ArrowUpIcon className={`h-5 w-5 mr-2 ${
                    type === 'income' ? 'text-green-600' : 'text-gray-500'
                  }`} />
                  <span className="font-medium">Income</span>
                  {type === 'income' && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
                
                <button
                  type="button"
                  id="expense-btn"
                  onClick={() => dispatch(changeType('expense'))}
                  className={`flex cursor-pointer items-center justify-center p-3 rounded-lg border transition-all ${
                    type === 'expense' 
                      ? 'bg-red-50 border-red-200 text-red-700 shadow-sm' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ArrowDownIcon className={`h-5 w-5 mr-2 ${
                    type === 'expense' ? 'text-red-600' : 'text-gray-500'
                  }`} />
                  <span className="font-medium">Expense</span>
                  {type === 'expense' && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <select
                  id="category"
                  value={category}
                  name="category"
                  onChange={(e) => dispatch(changeCategory(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {(type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Source*</label>
                <select
                  id="source"
                  value={source}
                  name="source"
                  onChange={(e) => dispatch(changeSource(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select source</option>
                  {SOURCES.map(src => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="flex space-x-2">
                <input
                  id="date"
                  value={date ? date.split('T')[0] : ''} // prikazuje samo datum
                  onChange={(e) => {
                  const selectedDate = e.target.value;
                   const currentTime = new Date().toISOString().split('T')[1]; // uzima trenutno vreme
                   dispatch(changeDate(`${selectedDate}T${currentTime}`)); // spoji i pošalji kompletan ISO string
                            }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="date"
                 name="date"
                  />

                  <button
                    type="button"
                    id="today-btn"
                    onClick={handleUseCurrentDate}
                    className="px-4 py-2 bg-gray-100 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Today
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Additional details..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={results.isLoading}
                className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex justify-center items-center"
              >
                {results.isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;