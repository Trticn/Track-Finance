import { 
  subDays, 
  subMonths, 
  subQuarters, 
  subYears, 
  parseISO, 
  eachDayOfInterval, 
  format 
} from 'date-fns';

//
// ──────────────────────────────────────────────
//    OSNOVNE KALKULACIJE
// ──────────────────────────────────────────────
//

export function calculateBalance(data) {
  return data.reduce((total, item) => {
    const amount = Number(item.amount) || 0;
    return item.type === 'income'
      ? total + amount
      : item.type === 'expense'
      ? total - amount
      : total;
  }, 0);
}

export function calculateIncome(data) {
  return data
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

export function calculateExpense(data) {
  return data
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

export const calculateBasicMetrics = (data) => ({
  totalIncome: calculateIncome(data),
  totalExpenses: calculateExpense(data),
  balance: calculateBalance(data),
});

export const getSafeData = (data) => data || [];

//
// ──────────────────────────────────────────────
//   UPOREDNE METRIKE
// ──────────────────────────────────────────────
//

export const calculateComparisonMetrics = (current, previous) => {
  const incomeChange = current.totalIncome - previous.totalIncome;
  const expenseChange = current.totalExpenses - previous.totalExpenses;
  const profitChange = 
    (current.totalIncome - current.totalExpenses) - 
    (previous.totalIncome - previous.totalExpenses);

  const calculatePercentage = (change, previousValue) => {
    if (previousValue !== 0) return (change / previousValue) * 100;
    return change > 0 ? 100 : change < 0 ? -100 : 0;
  };

  return {
    incomePercentage: calculatePercentage(incomeChange, previous.totalIncome),
    expensePercentage: calculatePercentage(expenseChange, previous.totalExpenses),
    profitPercentage: calculatePercentage(profitChange, previous.balance),
    incomeChange,
    expenseChange,
    profitChange,
  };
};

//
// ──────────────────────────────────────────────
//    OBRADA DATUMA
// ──────────────────────────────────────────────
//

export function getStartDate(range) {
  const now = new Date();
  switch (range) {
    case 'week':
      return subDays(now, 7);
    case 'month':
      return subMonths(now, 1);
    case 'quarter':
      return subQuarters(now, 1);
    case 'year':
      return subYears(now, 1);
    default:
      return new Date(0);
  }
}

export function getPreviousPeriodStart(timeRange) {
  const now = new Date();
  switch (timeRange) {
    case 'week':
      return subDays(now, 14);
    case 'month':
      return subMonths(now, 2);
    case 'quarter':
      return subQuarters(now, 2);
    case 'year':
      return subYears(now, 2);
    default:
      return new Date(0);
  }
}

//
// ──────────────────────────────────────────────
//   GRAFIČKI PODACI
// ──────────────────────────────────────────────
//

export function groupAndChart(array, groupByKey) {
  const grouped = {};

  array?.forEach(item => {
    const group = item[groupByKey];
    if (!group) return;

    if (!grouped[group]) {
      grouped[group] = { income: 0, expense: 0 };
    }

    if (item.type === 'income') {
      grouped[group].income += item.amount;
    } else if (item.type === 'expense') {
      grouped[group].expense += item.amount;
    }
  });

  return Object.entries(grouped).map(([name, values]) => ({
    name,
    income: values.income,
    expense: values.expense,
    profit: values.income - values.expense,
  }));
}

export function getTotalChartData(array) {
  return array.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.amount;
      } else if (item.type === 'expense') {
        acc.expense += item.amount;
      }
      acc.profit = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, profit: 0 }
  );
}

export function generateFinancialTrend(data) {
  if (data.length === 0) return [];

  const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const start = parseISO(sorted[0].date);
  const end = parseISO(sorted[sorted.length - 1].date);

  const allDates = eachDayOfInterval({ start, end }).map(date => format(date, 'yyyy-MM-dd'));

  let income = 0;
  let expense = 0;

  return allDates.map(date => {
    const daily = data.filter(tx => tx.date.split('T')[0] === date);

    daily.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else if (tx.type === 'expense') expense += tx.amount;
    });

    return {
      date,
      income,
      expense,
      profit: income - expense,
    };
  });
}
