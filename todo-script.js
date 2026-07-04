// ===================================
// TO-DO LIST APP - LOCAL STORAGE
// ===================================

// Sample tasks for new users
const SAMPLE_TASKS = [
    {
        id: Date.now() - 3000,
        text: 'Complete project documentation',
        completed: false,
        priority: 'high',
        category: 'work',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        dueDate: null
    },
    {
        id: Date.now() - 2000,
        text: 'Go grocery shopping',
        completed: false,
        priority: 'medium',
        category: 'shopping',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        dueDate: null
    },
    {
        id: Date.now() - 1000,
        text: 'Morning workout',
        completed: true,
        priority: 'low',
        category: 'health',
        createdAt: new Date().toISOString(),
        dueDate: null
    }
];

// ===================================
// TASK MANAGER CLASS
// ===================================
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentView = 'all';
        this.editingId = null;
    }

    // Load tasks from local storage
    loadTasks() {
        try {
            const stored = localStorage.getItem('mediahub-tasks');
            return stored ? JSON.parse(stored) : SAMPLE_TASKS;
        } catch (error) {
            console.error('Error loading tasks:', error);
            return SAMPLE_TASKS;
        }
    }

    // Save tasks to local storage
    saveTasks() {
        try {
            localStorage.setItem('mediahub-tasks', JSON.stringify(this.tasks));
            return true;
        } catch (error) {
            console.error('Error saving tasks:', error);
            showToast('Failed to save tasks', 'error');
            return false;
        }
    }

    // Add new task
    addTask(text, priority = 'medium', category = 'personal') {
        if (!text.trim()) {
            showToast('Please enter a task', 'warning');
            return null;
        }

        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            priority: priority,
            category: category,
            createdAt: new Date().toISOString(),
            dueDate: null
        };

        this.tasks.push(newTask);
        this.saveTasks();
        showToast('✅ Task added successfully', 'success');
        return newTask;
    }

    // Update task
    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates);
            this.saveTasks();
            return task;
        }
        return null;
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.updateTask(id, {
            completed: !this.tasks.find(t => t.id === id).completed
        });
        if (task.completed) {
            showToast('🎉 Task completed!', 'success');
        }
        return task;
    }

    // Delete task
    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            showToast('🗑️ Task deleted', 'success');
            return true;
        }
        return false;
    }

    // Delete all completed tasks
    clearCompleted() {
        const initialCount = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);
        const deletedCount = initialCount - this.tasks.length;
        if (deletedCount > 0) {
            this.saveTasks();
            showToast(`✨ Cleared ${deletedCount} completed task(s)`, 'success');
        } else {
            showToast('No completed tasks to clear', 'warning');
        }
    }

    // Get filtered tasks
    getFilteredTasks(view) {
        switch (view) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'high':
                return this.tasks.filter(t => t.priority === 'high');
            case 'all':
            default:
                return this.tasks;
        }
    }

    // Get stats
    getStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            remaining: this.tasks.filter(t => !t.completed).length
        };
    }

    // Export tasks as JSON
    exportTasks() {
        return JSON.stringify(this.tasks, null, 2);
    }

    // Import tasks from JSON
    importTasks(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (Array.isArray(imported)) {
                this.tasks = imported;
                this.saveTasks();
                showToast(`📥 Imported ${imported.length} task(s)`, 'success');
                return true;
            }
        } catch (error) {
            showToast('Invalid file format', 'error');
            return false;
        }
    }

    // Reset all tasks
    resetAll() {
        if (confirm('⚠️ This will delete ALL tasks. Are you sure?')) {
            this.tasks = [];
            this.saveTasks();
            showToast('🔄 All tasks cleared', 'success');
            return true;
        }
        return false;
    }
}

// ===================================
// UI CONTROLLER
// ===================================
class UIController {
    constructor(taskManager) {
        this.tm = taskManager;
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.tasksList = document.getElementById('tasksList');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.categorySelect = document.getElementById('categorySelect');
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
        this.resetBtn = document.getElementById('resetBtn');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.remainingTasksEl = document.getElementById('remainingTasks');
    }

    attachEventListeners() {
        // Add task
        this.addBtn.addEventListener('click', () => this.handleAddTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTask();
        });

        // View filters
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e.target));
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => {
            this.tm.clearCompleted();
            this.render();
        });

        // Export/Import
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.handleImport(e));

        // Reset
        this.resetBtn.addEventListener('click', () => {
            if (this.tm.resetAll()) {
                this.render();
            }
        });

        // Auto-focus input
        this.taskInput.focus();
    }

    handleAddTask() {
        const priority = this.prioritySelect.value;
        const category = this.categorySelect.value;
        this.tm.addTask(this.taskInput.value, priority, category);
        this.taskInput.value = '';
        this.taskInput.focus();
        this.render();
    }

    handleViewChange(btn) {
        this.viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tm.currentView = btn.dataset.view;
        this.render();
    }

    handleExport() {
        const data = this.tm.exportTasks();
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', `tasks-${new Date().toISOString().split('T')[0]}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showToast('📥 Tasks exported successfully', 'success');
    }

    handleImport(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (this.tm.importTasks(event.target.result)) {
                    this.render();
                }
            };
            reader.readAsText(file);
        }
        this.importFile.value = '';
    }

    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`;
        
        const createdDate = new Date(task.createdAt).toLocaleDateString();
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="app.handleToggleTask(${task.id})"
            >
            <div class="task-content">
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <div class="task-meta">
                    <span class="task-badge priority-badge ${task.priority}">
                        ${this.getPriorityEmoji(task.priority)} ${task.priority}
                    </span>
                    <span class="task-badge category-badge">
                        ${this.getCategoryEmoji(task.category)} ${task.category}
                    </span>
                    <span class="task-date">📅 ${createdDate}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="task-btn delete-btn" onclick="app.handleDeleteTask(${task.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
        
        return li;
    }

    getPriorityEmoji(priority) {
        const emojis = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };
        return emojis[priority] || '🟡';
    }

    getCategoryEmoji(category) {
        const emojis = {
            work: '💼',
            personal: '👤',
            shopping: '🛒',
            health: '💪',
            other: '📌'
        };
        return emojis[category] || '📌';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        const stats = this.tm.getStats();
        this.totalTasksEl.textContent = stats.total;
        this.completedTasksEl.textContent = stats.completed;
        this.remainingTasksEl.textContent = stats.remaining;
    }

    render() {
        const tasks = this.tm.getFilteredTasks(this.tm.currentView);
        
        // Update stats
        this.updateStats();

        // Render tasks
        this.tasksList.innerHTML = '';
        
        if (tasks.length === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.className = 'empty-state';
            emptyLi.innerHTML = '<p>✨ No tasks here yet!</p>';
            this.tasksList.appendChild(emptyLi);
        } else {
            tasks.forEach(task => {
                this.tasksList.appendChild(this.createTaskElement(task));
            });
        }
    }

    handleToggleTask(id) {
        this.tm.toggleTask(id);
        this.render();
    }

    handleDeleteTask(id) {
        if (confirm('Delete this task?')) {
            this.tm.deleteTask(id);
            this.render();
        }
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// INITIALIZATION
// ===================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    app = new UIController(taskManager);
    console.log('📝 To-Do List App initialized!');
});
