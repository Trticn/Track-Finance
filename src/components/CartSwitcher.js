import { useState } from 'react';
import classNames from 'classnames';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import ChartCard from './ChartCard';


const TABS = [
  { key: 'overview', label: 'Total Overview' },
  { key: 'category', label: 'By Category' },
  { key: 'source', label: 'By Source' },

];

function ChartSwitcher({ chartData}) {
  const [activeTab, setActiveTab] = useState('overview');

  const currentLabel = TABS.find(tab => tab.key === activeTab)?.label || '';
  return (
    <div className="max-w-screen-lg">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'py-2 px-4 border-b-2 text-sm sm:text-base transition-all duration-300',
              {
                'border-indigo-500 text-indigo-600 font-semibold': activeTab === tab.key,
                'border-transparent text-gray-500 hover:text-gray-700': activeTab !== tab.key
              }
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
        
      {/* Chart inside ChartCard */}
      <ChartCard title={currentLabel}>
        {activeTab === 'overview' ? (
          <PieChartComponent data={chartData.totals} />
        ) : (
          <BarChartComponent data={chartData[`by${capitalize(activeTab)}`]} />
        )}
      </ChartCard>
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default ChartSwitcher;
