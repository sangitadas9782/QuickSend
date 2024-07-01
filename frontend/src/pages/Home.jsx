import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';

export const Home = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">QuickSend</h1>
          <div>
            <Link to="/signin" className="text-gray-800 hover:text-blue-500 px-3 py-2">Sign In</Link>
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">Sign Up</Link>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Easy and Secure Money Transfers</h2>
            <p className="text-xl text-gray-600 mb-6">Send money to friends and family with just a few clicks. Fast, reliable, and secure.</p>
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold">Get Started</Link>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="Money Transfer" className="rounded-lg ml-8" />
          </div>
        </div>
      </main>

      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose QickSend?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Fast Transfers</h4>
              <p className="text-gray-600">Send money instantly to anyone, anytime.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure Transactions</h4>
              <p className="text-gray-600">Your security is our top priority.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Zero Fees</h4>
              <p className="text-gray-600">Enjoy no rates on all transactions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 QuickSend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};