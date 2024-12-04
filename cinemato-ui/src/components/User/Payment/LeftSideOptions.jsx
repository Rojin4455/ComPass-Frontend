// LeftSideOptions.js
import React, { useState } from 'react';

function LeftSideOptions() {
  const [selectedMethod, setSelectedMethod] = useState('Debit Card');

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">Select Payment Method</h2>
      <div className="flex flex-col space-y-2">
        {['Debit Card', 'Credit Card'].map((method) => (
          <button
            key={method}
            onClick={() => handleSelectMethod(method)}
            className={`p-3 text-left rounded-lg border ${
              selectedMethod === method ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300 bg-white'
            }`}
          >
            <span className="text-md font-medium text-gray-700">{method}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LeftSideOptions;
