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
  console.log(data)
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
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
