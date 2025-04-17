import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4CAF50', '#F44336', '#6C63FF']; // income, expense, profit

function PieChartComponent({ data }) {
    const chartData = [
        { name: 'Income', value: data.income },
        { name: 'Expense', value: data.expense },
        {
          name: data.profit >= 0 ? 'Profit' : 'Loss',
          value: Math.abs(data.profit)
        }
      ];

    
        // Custom legend formatter
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };

  return (
    <div className="w-full h-[440px] flex flex-col gap-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
    <Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius="90%"
  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#4B5563" // modernija tamnosiva
        fontSize={14} // manji, ali čitljiv
        fontWeight="500"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  }}
  isAnimationActive={true}
  labelLine = {false}
>
  {chartData.map((entry, index) => (
<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
  ))}
</Pie>


      <Tooltip contentStyle={{ fontSize: '12px', color: '#374151' }} />
      <Legend
              iconType="circle"
              iconSize={10}
              formatter={renderColorfulLegendText}
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '13px'
              }}
            />
    </PieChart>
  </ResponsiveContainer>
</div>

  );
}

export default PieChartComponent;
