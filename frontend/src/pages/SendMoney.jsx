import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");

    const handleTransfer = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.balance !== undefined) {
                updateBalance(response.data.balance);
            }
            
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Send Money</h2>
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                        {name[0].toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="amount">
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handleTransfer}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Initiate Transfer
                </button>
            </div>
        </div>
    );
};