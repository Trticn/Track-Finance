import { useFetchTransactionsQuery } from "../store";
import Skeleton from "./Skeleton";
import TransactionListItem from "./TransactionListItem";
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function TransactionList({ compact = false, limit, transactionType }) {
  const { data, error, isFetching } = useFetchTransactionsQuery();

  

  let filteredTransactions = data ?? [];

  if (transactionType !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.type === transactionType);
  }
  
  filteredTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  
  

  const transactionsToShow = limit 
    ? filteredTransactions?.slice(0, limit) 
    : filteredTransactions;

  let content;

  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg" times={limit || 5} />
      </div>
    );
  } else if (error) {
    content = (
      <div className="bg-red-50 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <InformationCircleIcon className="h-5 w-5 text-red-500 mr-3" />
          <p className="text-sm text-red-700">
            Error loading transactions. Please try again later.
          </p>
        </div>
      </div>
    );
  } else if (filteredTransactions.length > 0) {
    content = (
      <div className={`${compact ? '' : 'divide-y divide-gray-200'}`}>
        {transactionsToShow.map((transaction) => (
          <TransactionListItem 
            key={transaction.id} 
            transaction={transaction}
            compact={compact}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="bg-blue-50 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
          <p className="text-sm text-blue-700">
            {transactionType === 'all' 
              ? 'No transactions found.' 
              : `No ${transactionType} transactions found.`}
          </p>
        </div>
      </div>
    );
  }

  return content;
}

export default TransactionList;