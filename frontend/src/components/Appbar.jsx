import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Appbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/signin');
    };
  
    return (
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-2xl font-bold px-4">QickSend</div>
        {user && user.user ? (
          <div className="flex items-center space-x-4">
            {/* <span>Hello, {user.user.firstName ? user.user.firstName.charAt(0).toUpperCase() + user.user.firstName.slice(1) : 'User'}</span>             */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/signin" className="hover:underline">Sign In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </div>
        )}
      </div>
    );
  };