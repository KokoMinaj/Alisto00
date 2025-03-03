
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  LayoutDashboard, 
  Calendar, 
  Star, 
  CheckSquare, 
  Hash, 
  Menu, 
  Plus, 
  ChevronDown 
} from 'lucide-react';
import { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowAddTaskModal: (show: boolean) => void;
  completedTasksCount: number;
  totalTasksCount: number;
  uncompletedTasksCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  projects, 
  activeTab, 
  setActiveTab, 
  setShowAddTaskModal,
  completedTasksCount,
  totalTasksCount,
  uncompletedTasksCount
}) => {
  return (
    <div className="w-60 bg-white border-r flex flex-col h-full">
      {/* Logo and User */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-2xl flex items-center">
            <span className="text-blue-500">A</span>
            <span className="text-green-500">L</span>
            <span className="text-blue-500">istō</span>
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Menu size={20} />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <span>U</span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium">KazutoKei03</div>
            <div className="text-xs text-gray-500">{completedTasksCount}/{totalTasksCount} Tasks Done</div>
          </div>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </div>

      {/* Add Task Button */}
      <div className="p-4">
        <button 
          className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
          onClick={() => setShowAddTaskModal(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2">
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === 'inbox' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
            onClick={() => setActiveTab('inbox')}
          >
            <Inbox size={18} className="mr-3" />
            <span>Inbox</span>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{totalTasksCount}</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === 'today' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
            onClick={() => setActiveTab('today')}
          >
            <LayoutDashboard size={18} className="mr-3" />
            <span>Today</span>
            <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-md">{uncompletedTasksCount}</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
            onClick={() => setActiveTab('upcoming')}
          >
            <Calendar size={18} className="mr-3" />
            <span>Upcoming</span>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">3</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === 'important' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
            onClick={() => setActiveTab('important')}
          >
            <Star size={18} className="mr-3" />
            <span>Important</span>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">2</span>
          </li>
          <li 
            className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
            onClick={() => setActiveTab('completed')}
          >
            <CheckSquare size={18} className="mr-3" />
            <span>Completed</span>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{completedTasksCount}</span>
          </li>
        </ul>

        <div className="px-4 pt-6 pb-2">
          <h3 className="text-xs font-semibold text-blue-500 uppercase tracking-wider">My Projects</h3>
        </div>

        <ul className="px-2">
          {projects.map(project => (
            <li 
              key={project.id} 
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${activeTab === `project-${project.id}` ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
              onClick={() => setActiveTab(`project-${project.id}`)}
            >
              <Hash size={18} className="mr-3" />
              <span>{project.name}</span>
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{project.count}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
