export const Balance = ({ value }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
        <div className="text-3xl font-bold text-blue-600">
          ₹ {value.toFixed(2)}
        </div>
      </div>
    );
  };