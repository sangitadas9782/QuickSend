import { useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
    }, [filter]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <input
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border rounded-md border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="space-y-4">
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    console.log("user: ", user)
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center items-center text-white text-xl font-bold mr-4">
                    {user.firstName[0]}
                </div>
                <div>
                    <div className="font-semibold">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-500">{user.username}</div>
                    <div className="text-sm text-gray-500">{user._id}</div>
                </div>
            </div>
            <Button
                onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                label="Send Money"
            />
        </div>
    );
}