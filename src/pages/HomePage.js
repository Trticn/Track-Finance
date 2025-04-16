import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchTransactionsQuery } from '../store';
import Skeleton from '../components/Skeleton';
import ChartsPage from './ChartsPage';

import { useMemo } from 'react';
import { calculateBalance, calculateExpense, calculateIncome,getStartDate, generateFinancialTrend } from '../helpers';
import LineChartComponent from '../components/LineChartComponent';
import { isAfter } from 'date-fns';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { ALL_CATEGORIES } from '../config';
import { SOURCES } from '../config';
import TransactionList from '../components/TransactionList';



function HomePage() {
  const { data, error, isFetching } = useFetchTransactionsQuery();
  const [timeRange, setTimeRange] = useState('month');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const startDate = useMemo(() => getStartDate(timeRange), [timeRange]);

  // Memoize the filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter(transaction => {
      const categoryMatches = categoryFilter === 'all' || transaction.category?.toLowerCase() === categoryFilter;
      const sourceMatches = sourceFilter === 'all' || transaction.source?.toLowerCase() === sourceFilter;
      const transactionDate = new Date(transaction.date);
      const dateMatches = isAfter(transactionDate, startDate);
      
      return categoryMatches && sourceMatches && dateMatches;
    });
  }, [data, categoryFilter, sourceFilter, startDate]);

  const calculatedStats = useMemo(() => {
    return {
      totalIncome: calculateIncome(filteredData),
      totalExpenses: calculateExpense(filteredData),
      balance: calculateBalance(filteredData),
      mostSpentCategory: '', // TODO: implement
      largestTransaction: filteredData.reduce((max, curr) => 
        curr.amount > max.amount ? curr : max, 
        { amount: 0 }
      )
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    return generateFinancialTrend(filteredData);
  }, [filteredData]);

  let content;
  
  
  if (isFetching) {
    content = (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg" times={5} />
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
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
            <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ${calculatedStats.balance.toFixed(2)}
          </p>
          <p className={`mt-1 text-sm ${calculatedStats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {calculatedStats.balance >= 0 ? 'Positive' : 'Negative'} balance
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
            <ArrowUpIcon className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ${calculatedStats.totalIncome.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-green-600">+12% from last {timeRange}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <ArrowDownIcon className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ${calculatedStats.totalExpenses.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-red-600">-8% from last {timeRange}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Largest Transaction</h3>
            <ChartBarIcon className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 capitalize">
        
          </p>
          <p className="mt-1 text-sm text-gray-500"></p>
        </div>
      </div>
    );
  }


  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option key='all' value = 'all'>All</option>
                {ALL_CATEGORIES.map(cat => (
                  <option key={cat.toLowerCase()} value={cat.toLowerCase()}>{cat}</option>
                ))}
                
              </select>
              <ArrowDownIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-600" />
            </div>

            <div className="relative">
              
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
           <option key='all' value = 'all'>All</option>
                {SOURCES.map(src => (
                  <option key={src.toLowerCase()} value={src.toLowerCase()}>{src}</option>
                ))}
                
                
              </select>
              <ArrowDownIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-600" />
            </div>

            
          </div>
        </div>

        {content}

        {/* Charts and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Spending Overview</h3>
          
              <LineChartComponent data={chartData} />
            
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
            <Link to='/transactions' className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </Link>
            </div>
  
            <TransactionList transactionType={'all'} limit={2} />
          </div>
        </div>

        {/* All Transactions */}
        <ChartsPage data = {filteredData} isFetching={isFetching} error = {error}/>
      </div>
    </div>
  );
}

export default HomePage;
