import { useRemoveTransactionMutation } from "../store";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';

function TransactionListItem({ transaction}) {
  const [removeTransaction, results] = useRemoveTransactionMutation();
  
const handleRemoveTransaction = async () => {
    try {
      await removeTransaction(transaction).unwrap();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs hover:shadow-sm transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`p-3 rounded-lg mr-4 ${
            transaction.type === 'income' 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {transaction.type === 'income' ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {transaction.title}
            </h3>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:flex-wrap">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-1">Category:</span>
                <span className="capitalize">{transaction.category}</span>
              </div>
              <br/>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-1">Source:</span>
                <span className="capitalize">{transaction.source}</span>
              </div>
              <br/>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-1">Date:</span>
                {new Date(transaction.date).toLocaleDateString()}
              </div>
            </div>
            {transaction.description && (
              <p className="mt-2 text-sm text-gray-600">
                {transaction.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <p className={`text-lg font-semibold ${
              transaction.type === 'income' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </p>
            <button
              onClick={handleRemoveTransaction}
              type="button"
              disabled={results.isLoading}
              className="ml-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete transaction"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionListItem;