
import React, { useState } from 'react';
import { Task, Project } from '../types';
import Sidebar from '../components/Sidebar';
import AddTaskModal from '../components/AddTaskModal';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TaskList from '../components/dashboard/TaskList';

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

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const uncompletedTasksCount = totalTasksCount - completedTasksCount;

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.location && task.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.tag && task.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    switch (activeTab) {
      case 'inbox':
        return filtered;
      case 'today':
        return filtered;
      case 'completed':
        return filtered.filter(task => task.completed);
      case 'important':
        return filtered.filter(task => task.tag === 'School');
      default:
        if (activeTab.startsWith('project-')) {
          const projectId = activeTab.replace('project-', '');
          return filtered.filter(task => task.project === projectId);
        }
        return filtered;
    }
  };

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
    
    if (newTask.project) {
      setProjects(projects.map(project => 
        project.id === newTask.project 
          ? { ...project, count: project.count + 1 } 
          : project
      ));
    }
    
    setNewTask({
      title: '',
      location: '',
      category: '',
      tag: '',
      project: ''
    });
    setShowAddTaskModal(false);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (taskToDelete?.project) {
      setProjects(projects.map(project => 
        project.id === taskToDelete.project 
          ? { ...project, count: project.count - 1 } 
          : project
      ));
    }
    
    setShowTaskMenu(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        projects={projects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddTaskModal={setShowAddTaskModal}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        uncompletedTasksCount={uncompletedTasksCount}
      />

      <div className="flex-1 flex flex-col bg-white">
        <DashboardHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <TaskList 
            activeTab={activeTab}
            filteredTasks={getFilteredTasks()}
            projects={projects}
            showTaskMenu={showTaskMenu}
            setShowTaskMenu={setShowTaskMenu}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        </main>
      </div>

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
