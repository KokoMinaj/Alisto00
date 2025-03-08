
import React from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface AddTaskModalProps {
  newTask: {
    title: string;
    location: string;
    category: string;
    tag: string;
    project: string;
  };
  setNewTask: React.Dispatch<React.SetStateAction<{
    title: string;
    location: string;
    category: string;
    tag: string;
    project: string;
  }>>;
  handleAddTask: () => void;
  setShowAddTaskModal: (show: boolean) => void;
  projects: Project[];
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  newTask, 
  setNewTask, 
  handleAddTask, 
  setShowAddTaskModal,
  projects
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in-50 zoom-in-95">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-600">Edit Task</h2>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            className="w-full p-2 text-xl font-medium placeholder-gray-400 border-none focus:outline-none"
            placeholder="Enter Task Name"
          />
          
          <input
            type="text"
            value={newTask.location}
            onChange={(e) => setNewTask({...newTask, location: e.target.value})}
            className="w-full p-2 text-sm text-gray-500 border-none focus:outline-none"
            placeholder="Description"
          />
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              className="px-2 py-1 text-xs border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => {/* Add functionality */}}
            >
              ⏰ Today
            </button>
            
            <button 
              className="px-2 py-1 text-xs border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => {/* Add functionality */}}
            >
              📌 Project
            </button>
            
            <button 
              className="px-2 py-1 text-xs border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => {/* Add functionality */}}
            >
              🏷️ Tags
            </button>
          </div>
          
          <div className="flex justify-end space-x-3 pt-8 mt-8 border-t">
            <button
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded"
              onClick={() => setShowAddTaskModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
              onClick={handleAddTask}
              disabled={!newTask.title.trim()}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
