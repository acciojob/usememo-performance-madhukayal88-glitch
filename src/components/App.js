import React, { useState, useMemo } from 'react';
import './styles.css';

// Utility function to generate 50 tasks (25 completed, 25 active)
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Task ${i}: ${['Learn React', 'Build App', 'Write Code', 'Fix Bugs', 'Deploy Project'][i % 5]}`,
      completed: i <= 25,
      priority: ['Low', 'Medium', 'High'][i % 3]
    });
  }
  return tasks;
};

// Artificially slow function to simulate complex computation
const slowRender = (tasks) => {
  // Simulate heavy computation (5ms delay per item)
  for (let i = 0; i < tasks.length * 100; i++) {
    // Intentionally empty loop to simulate work
    const temp = Math.sqrt(i * i);
  }
  return tasks;
};

function App() {
  const [tasks] = useState(generateTasks);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [renderTime, setRenderTime] = useState(0);

  // Memoized filtered tasks - only recalculates when filter or tasks change
  const filteredTasks = useMemo(() => {
    const startTime = performance.now();
    
    let result = [];
    if (filter === 'all') {
      result = tasks;
    } else if (filter === 'active') {
      result = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = tasks.filter(task => task.completed);
    }

    // Artificially slow down the rendering
    slowRender(result);
    
    const endTime = performance.now();
    setRenderTime(Math.round(endTime - startTime));
    
    return result;
  }, [tasks, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getFilterCount = () => {
    switch(filter) {
      case 'all': return tasks.length;
      case 'active': return tasks.filter(t => !t.completed).length;
      case 'completed': return tasks.filter(t => t.completed).length;
      default: return 0;
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <h1>📋 Task Manager</h1>
        <p className="subtitle">Performance Optimization with useMemo</p>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active</span>
          <span className="stat-value">{tasks.filter(t => !t.completed).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{tasks.filter(t => t.completed).length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Render Time</span>
          <span className="stat-value">{renderTime}ms</span>
        </div>
      </div>

      <div className="filter-section">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          Active ({tasks.filter(t => !t.completed).length})
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
        <span className="filter-info">
          Showing: {filteredTasks.length} tasks
        </span>
      </div>

      <div className="task-list-container">
        <div className="task-list-header">
          <span className="task-header-title">Task Title</span>
          <span className="task-header-status">Status</span>
          <span className="task-header-priority">Priority</span>
        </div>
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>🎯 No tasks in this category</p>
          </div>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : 'active'}`}>
                <span className="task-title">
                  <span className="task-id">#{task.id}</span>
                  {task.title}
                </span>
                <span className="task-status">
                  {task.completed ? (
                    <span className="status-badge completed">✅ Completed</span>
                  ) : (
                    <span className="status-badge active">⏳ Active</span>
                  )}
                </span>
                <span className="task-priority">
                  <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="performance-info">
        <h3>⚡ Performance Insights</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>useMemo Benefits</h4>
            <p>Filtered tasks are memoized and only recalculated when filter or tasks change.</p>
          </div>
          <div className="info-card">
            <h4>Current Filter</h4>
            <p>Showing <strong>{filter}</strong> tasks</p>
            <p>Filtered count: <strong>{filteredTasks.length}</strong></p>
          </div>
          <div className="info-card">
            <h4>Render Optimization</h4>
            <p>Simulated delay: ~{filteredTasks.length * 5}ms</p>
            <p>Actual render time: {renderTime}ms</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>💡 Tasks are artificially slowed to demonstrate useMemo performance benefits</p>
      </div>
    </div>
  );
}

export default App;
