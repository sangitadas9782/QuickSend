import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUserProfile } from '../services/userService';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (!firstName || !lastName) {
        setError('Please enter all required fields');
      } else {
        const updatedUser = await updateUserProfile(
          { firstName, lastName, password },
          localStorage.getItem('token')
        );
        login(updatedUser, localStorage.getItem('token'));
        setMessage('Profile updated successfully');
      }
    } catch (error) {
      setError('Error updating profile');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <InputBox
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <InputBox
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <InputBox
            label="New Password (leave blank to keep current)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <Button 
              label="Back" 
              onClick={handleBack} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            />
            <Button label="Update Profile" type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" />
          </div>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};