import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { AuthContext } from '../context/AuthContext';
import { TransactionHistory } from './TransactionHistory';
import axios from 'axios';

export const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);
    const [showTransactions, setShowTransactions] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [transactionError, setTransactionError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [balanceResponse, transactionsResponse] = await Promise.all([
                    axios.get('https://quicksend-eight.vercel.app/api/v1/account/balance', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    axios.get('https://quicksend-eight.vercel.app/api/v1/account/transactions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })
                ]);

                setBalance(balanceResponse.data.balance);
                setTransactions(transactionsResponse.data.transactions || []);
                setTransactionError('');
            } catch (error) {
                console.error('Error fetching data:', error);
                setTransactionError('Unable to fetch data at this time. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!user || !user.account) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Appbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold">Welcome, {user.user && user.user.firstName && user.user.lastName ? `${user.user.firstName.charAt(0).toUpperCase()}${user.user.firstName.slice(1)} ${user.user.lastName}` : 'User'}!</h2>
                            <span className="text-gray-600">{user.user.username}</span>
                        </div>
                        <Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Edit Profile</Link>
                    </div>
                    <Balance value={balance} />
                    {/* <button 
                        onClick={() => setShowTransactions(true)}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        View Transaction History
                    </button> */}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Users />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">All Transactions</h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : transactionError ? (
                            <div className="text-red-500 p-4 bg-red-100 rounded">
                                <p>{transactionError}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-2 text-blue-500 underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : transactions.length > 0 ? (
                            <ul className="space-y-3">
                                {transactions.map((transaction, index) => (
                                <li key={index} className="border-b pb-2">
                                    <p className="text-sm text-gray-600">
                                        {new Date(transaction.date).toLocaleString()}
                                    </p>
                                    <p className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                                        {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount.toFixed(2)}
                                    </p>
                                    <p className="text-sm">{transaction.description}</p>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recent transactions.</p>
                        )}
                    </div>
                </div>
            </div>
            {/* {showTransactions && <TransactionHistory transactions={transactions} onClose={() => setShowTransactions(false)} />} */}
        </div>
    );
};
