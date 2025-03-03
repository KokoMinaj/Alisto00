
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="KazutoKei03"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Link to="/set-password" className="text-blue-500 hover:underline text-sm">
                Change password
              </Link>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive email notifications for task reminders</p>
                </div>
                <div className="form-switch">
                  <input 
                    type="checkbox" 
                    className="h-5 w-10 rounded-full cursor-pointer" 
                    defaultChecked 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                </div>
                <div className="form-switch">
                  <input 
                    type="checkbox" 
                    className="h-5 w-10 rounded-full cursor-pointer" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-red-500 hover:underline">
            Log out
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Settings;
