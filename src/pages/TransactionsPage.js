import { useState } from 'react';
import TransactionList from "../components/TransactionList";
import { ArrowUpIcon, ArrowDownIcon} from '@heroicons/react/24/outline';

function TransactionsPage() {
  const [transactionType, setTransactionType] = useState('all');

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">All Transactions</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setTransactionType('all')}
                className={`px-3 py-1 rounded-md text-sm ${
                  transactionType === 'all' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setTransactionType('income')}
                className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 ${
                  transactionType === 'income' 
                    ? 'bg-white shadow-sm text-green-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowUpIcon className="h-4 w-4" />
                Income
              </button>

              <button
                onClick={() => setTransactionType('expense')}
                className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 ${
                  transactionType === 'expense' 
                    ? 'bg-white shadow-sm text-red-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowDownIcon className="h-4 w-4" />
                Expense
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <TransactionList 
            transactionType={transactionType}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;