import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

function BarChartComponent({ data, name }) {
  const barKeys = [
    { key: 'income', name: 'Income', color: '#10b981' },  // Tailwind emerald-500
    { key: 'expense', name: 'Expense', color: '#ef4444' }, // Tailwind red-500
    { key: 'profit', name: 'Profit', color: '#6366f1' }   // Tailwind indigo-500
  ];

  // Custom legend formatter
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={`tooltip-item-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">{entry.name}:</span>
                <span className="font-medium ml-1 text-gray-800">
                  {entry.value.toLocaleString()} €
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[440px] flex flex-col gap-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
      {/* Title with subtle accent */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <div className="w-12 h-1 bg-indigo-100 rounded-full mt-1"></div>
      </div>

      {/* Chart container */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            barGap={12}
            barCategoryGap={24}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f3f4f6" 
              horizontal={false} 
            />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value} €`}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={60}
              tick={{ fontSize: 13, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#f9fafb', stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={renderColorfulLegendText}
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '13px'
              }}
            />
            {barKeys.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color}
                radius={[0, 4, 4, 0]}
                barSize={16}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={item.color} 
                    opacity={0.9}
                    stroke={item.color}
                    strokeWidth={index === data.length - 1 ? 1 : 0}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;