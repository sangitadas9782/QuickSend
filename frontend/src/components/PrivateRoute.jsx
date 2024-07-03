import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};