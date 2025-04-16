import Skeleton from '../components/Skeleton';
import { groupAndChart, getTotalChartData } from '../helpers';
import { useMemo } from 'react';
import ChartSwitcher from '../components/CartSwitcher';

function ChartsPage({ data, isFetching, error }) {
  
  const chartData = useMemo(() => ({
    bySource: groupAndChart(data, 'source'),
    byCategory: groupAndChart(data, 'category'),
    totals:getTotalChartData(data)

  }), [data]);

  if (isFetching) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-16 w-full rounded-lg" times={5} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 p-4">Greška pri dohvaćanju podataka.</p>;
  }

  return (
    <div className="space-y-6 p-4">
      <ChartSwitcher chartData={chartData} />
    </div>
  );
}

export default ChartsPage;
