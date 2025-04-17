// React & React Router
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Queries & Store
import { useFetchTransactionsQuery } from '../store';

//Pages
import Skeleton from '../components/Skeleton';
import ChartsPage from './ChartsPage';

// Components
import LineChartComponent from '../components/LineChartComponent';
import TransactionList from '../components/TransactionList';

// Helpers
import {
  getStartDate,
  getPreviousPeriodStart,
  generateFinancialTrend,
  calculateBasicMetrics,
  calculateComparisonMetrics,
  getSafeData
} from '../helpers';

// Icons
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  InformationCircleIcon,
  ChartBarIcon

} from '@heroicons/react/24/outline';

// Constants / Config
import { ALL_CATEGORIES } from '../config';
import { SOURCES } from '../config';

// Date utilities
import { isAfter } from 'date-fns';


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

  

// Main hook with the refactored logic
const calculatedStats = useMemo(() => {
  const safeFilteredData = getSafeData(filteredData);
  const safeOriginalData = getSafeData(data);

  // Current period metrics
  const currentMetrics = calculateBasicMetrics(safeFilteredData);

  // Previous period metrics
  const previousPeriodStart = getPreviousPeriodStart(timeRange);
  const previousPeriodData = safeOriginalData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= previousPeriodStart && itemDate < startDate;
  });
  const previousMetrics = calculateBasicMetrics(previousPeriodData);

  // Comparison metrics
  const comparison = calculateComparisonMetrics(currentMetrics, previousMetrics);

  return {
    ...currentMetrics,
    comparison,
  };
}, [filteredData, timeRange, startDate, data]);

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
  {calculatedStats.comparison && (
    <p className={`mt-1 text-sm ${
      calculatedStats.comparison.profitPercentage >= 0 
        ? 'text-green-600' 
        : 'text-red-600'
    }`}>
      {calculatedStats.comparison.profitPercentage >= 0 ? '+' : ''}
      {calculatedStats.comparison.profitPercentage.toFixed(0)}% from last {timeRange}
      {calculatedStats?.comparison?.profitChange !== 0 && (
  <span className="text-xs text-gray-500 ml-1">
    ({calculatedStats.comparison.profitPercentage >= 0 ? '+' : '-'}
     {Math.abs(calculatedStats.comparison.profitChange).toFixed(2)})
  </span>
)}


    </p>
  )}
</div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
            <ArrowUpIcon className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            ${calculatedStats.totalIncome.toFixed(2)}
          </p>
         
  {calculatedStats.comparison && (
    <p className={`mt-1 text-sm ${
      calculatedStats.comparison.incomePercentage >= 0 
        ? 'text-green-600' 
        : 'text-red-600'
    }`}>
      {calculatedStats.comparison.incomePercentage >= 0 ? '+' : ''}
      {calculatedStats.comparison.incomePercentage.toFixed(0)}% from last {timeRange}
      {calculatedStats.comparison.incomeChange !== 0 && (
        <span className="text-xs text-gray-500 ml-1">
          (${calculatedStats.comparison.incomeChange >= 0 ? '+' : '-'}
          {Math.abs(calculatedStats.comparison.incomeChange).toFixed(2)})
        </span>
      )}
    </p>
  )}
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
    <ArrowDownIcon className="h-5 w-5 text-red-500" />
  </div>
  <p className="mt-2 text-2xl font-semibold text-gray-900">
    ${calculatedStats.totalExpenses.toFixed(2)}
  </p>
  
  {calculatedStats.comparison && (
    <p className={`mt-1 text-sm ${
      calculatedStats.comparison.expensePercentage <= 0  // Smanjenje troškova je dobro
        ? 'text-green-600' 
        : 'text-red-600'
    }`}>
      {calculatedStats.comparison.expensePercentage <= 0 ? '+' : '-'}
      {Math.abs(calculatedStats.comparison.expensePercentage).toFixed(0)}% from last {timeRange}
      {calculatedStats.comparison.expenseChange !== 0 && (
        <span className="text-xs text-gray-500 ml-1">
          (${calculatedStats.comparison.expenseChange <= 0 ? '+' : '-'}
          {Math.abs(calculatedStats.comparison.expenseChange).toFixed(2)})
        </span>
      )}
    </p>
  )}
</div>


      </div>
    );
  }


  return (
<div className="py-6 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex items-center gap-4">
  <ChartBarIcon className="h-6 w-6 text-blue-500" />
  <div>
    <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
    <p className="text-sm text-gray-500 mt-1">Your activity and insights at a glance</p>
  </div>
</div>




      <div className="flex flex-wrap gap-3">
        {/* Time Range */}
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none bg-white text-gray-900 pr-10 pl-4 py-2 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <CalendarIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-white text-gray-900 pr-10 pl-4 py-2 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          >
            <option value="all">Category</option>
            {ALL_CATEGORIES.map(cat => (
              <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <ArrowDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        {/* Source Filter */}
        <div className="relative">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="appearance-none bg-white text-gray-900 pr-10 pl-4 py-2 rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
          >
            <option value="all">Source</option>
            {SOURCES.map(src => (
              <option key={src.toLowerCase()} value={src.toLowerCase()}>
                {src}
              </option>
            ))}
          </select>
          <ArrowDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
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
  <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
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
