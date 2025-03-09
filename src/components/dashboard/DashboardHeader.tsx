
import React from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';

interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  searchQuery, 
  setSearchQuery,
  activeTab
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'today':
        return 'Today\'s Tasks';
      case 'upcoming':
        return 'Upcoming Tasks';
      case 'important':
        return 'Important Tasks';
      case 'completed':
        return 'Completed Tasks';
      default:
        if (activeTab.startsWith('project-')) {
          // This would be better with a context or prop that includes the project name
          return 'Project Tasks';
        }
        return 'All Tasks';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out",
    });
    
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm animate-fade-in">
      <h1 className="text-xl font-bold text-gray-800">{getHeaderTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
        </div>
        
        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User */}
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          onClick={handleLogout}
        >
          <User size={18} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
