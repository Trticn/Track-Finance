function ChartCard({ title, children }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 transition hover:shadow-lg">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        {children}
      </div>
    );
  }
  
  export default ChartCard;