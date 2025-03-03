
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings, LayoutDashboard, Inbox, Calendar, Star, CheckSquare, Hash } from 'lucide-react';
import { Task, Project } from '../types';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Buy Cat Food', location: 'Loc: Consolacion', tag: 'Home', completed: false, project: 'home' },
    { id: '2', title: 'Visit Mr. DIY Ayala', category: 'Home Supplies', tag: 'Home', completed: false, project: 'home' },
    { id: '3', title: 'Review CAO', category: 'Long Quiz F2F', tag: 'School', completed: false, project: 'school' },
    { id: '4', title: 'Article(s) for Algo 2', category: 'Long Quiz F2F', tag: 'School', completed: false, project: 'school' },
    { id: '5', title: 'Call John', tag: 'Friends', completed: false, project: 'friends' },
    { id: '6', title: 'Check emails', tag: 'Random', completed: false, project: 'random' },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: 'school', name: 'School', count: 2 },
    { id: 'home', name: 'Home', count: 2 },
    { id: 'random', name: 'Random', count: 1 },
    { id: 'friends', name: 'Friends', count: 1 },
  ]);

  const [activeTab, setActiveTab] = useState('today');
  const [newTask, setNewTask] = useState({
    title: '',
    location: '',
    category: '',
    tag: '',
    project: ''
  });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate completed tasks
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const uncompletedTasksCount = totalTasksCount - completedTasksCount;

  // Filter tasks based on active tab
  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply search filter if there's a query
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.location && task.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.tag && task.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply tab filter
    switch (activeTab) {
      case 'inbox':
        return filtered;
      case 'today':
        return filtered;
      case 'completed':
        return filtered.filter(task => task.completed);
      case 'important':
        // For demo purposes, let's consider tasks with 'School' tag as important
        return filtered.filter(task => task.tag === 'School');
      default:
        if (activeTab.startsWith('project-')) {
          const projectId = activeTab.replace('project-', '');
          return filtered.filter(task => task.project === projectId);
        }
        return filtered;
    }
  };

  // Add new task
  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;
    
    const newTaskItem: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      location: newTask.location || undefined,
      category: newTask.category || undefined,
      tag: newTask.tag || undefined,
      completed: false,
      project: newTask.project || undefined
    };
    
    setTasks([...tasks, newTaskItem]);
    
    // Update project count
    if (newTask.project) {
      setProjects(projects.map(project => 
        project.id === newTask.project 
          ? { ...project, count: project.count + 1 } 
          : project
      ));
    }
    
    // Reset form
    setNewTask({
      title: '',
      location: '',
      category: '',
      tag: '',
      project: ''
    });
    setShowAddTaskModal(false);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  // Delete task
  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    // Update project count
    if (taskToDelete?.project) {
      setProjects(projects.map(project => 
        project.id === taskToDelete.project 
          ? { ...project, count: project.count - 1 } 
          : project
      ));
    }
    
    setShowTaskMenu(null);
  };

  // Get tab title
  const getTabTitle = () => {
    switch (activeTab) {
      case 'inbox':
        return 'Inbox';
      case 'today':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      case 'important':
        return 'Important';
      case 'completed':
        return 'Completed';
      default:
        if (activeTab.startsWith('project-')) {
          const projectId = activeTab.replace('project-', '');
          const project = projects.find(p => p.id === projectId);
          return project ? project.name : 'Project';
        }
        return 'Tasks';
    }
  };

  // Get tab icon
  const getTabIcon = () => {
    switch (activeTab) {
      case 'inbox':
        return <Inbox size={16} className="mr-2" />;
      case 'today':
        return <LayoutDashboard size={16} className="mr-2" />;
      case 'upcoming':
        return <Calendar size={16} className="mr-2" />;
      case 'important':
        return <Star size={16} className="mr-2" />;
      case 'completed':
        return <CheckSquare size={16} className="mr-2" />;
      default:
        if (activeTab.startsWith('project-')) {
          return <Hash size={16} className="mr-2" />;
        }
        return <LayoutDashboard size={16} className="mr-2" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        projects={projects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddTaskModal={setShowAddTaskModal}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        uncompletedTasksCount={uncompletedTasksCount}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="border-b p-4 flex justify-between items-center bg-white">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Tasks"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <Link to="/settings">
            <button className="ml-4 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings size={20} />
            </button>
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">{getTabTitle()}</h1>
            <div className="flex items-center text-gray-500 mb-6">
              {getTabIcon()}
              <span>To do ({getFilteredTasks().filter(t => !t.completed).length})</span>
            </div>

            <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white">
              {getFilteredTasks().length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No tasks found</p>
                </div>
              ) : (
                getFilteredTasks().map(task => (
                  <TaskItem 
                    key={task.id}
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                    showTaskMenu={showTaskMenu}
                    setShowTaskMenu={setShowTaskMenu}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <AddTaskModal 
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          setShowAddTaskModal={setShowAddTaskModal}
          projects={projects}
        />
      )}
    </div>
  );
};

export default Dashboard;
