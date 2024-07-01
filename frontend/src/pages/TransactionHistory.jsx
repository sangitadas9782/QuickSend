import React from 'react';

export const TransactionHistory = ({ transactions, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
                <div className="mt-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Transaction History</h3>
                    <div className="mt-2 px-7 py-3">
                        {transactions.length === 0 ? (
                            <p className="text-center">No transactions found.</p>
                        ) : (
                            <ul className="space-y-3 max-h-60 overflow-y-auto">
                                {transactions.map((transaction, index) => (
                                    <li key={index} className="border-b pb-2">
                                        <p className="text-sm text-gray-600">
                                            {new Date(transaction.date).toLocaleString()}
                                        </p>
                                        <p className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                                            {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount.toFixed(2)}
                                        </p>
                                        <p className="text-sm">{transaction.description}</p>
                                        <p className="text-sm text-gray-800">To: {transaction.recipientName}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
