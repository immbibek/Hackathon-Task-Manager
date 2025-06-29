import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Filter,
  Search,
  Calendar,
  CheckSquare,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ShareTaskModal from "../components/ShareTaskModal";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Modal states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskFormMode, setTaskFormMode] = useState("create");
  const [editingTask, setEditingTask] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharingTask, setSharingTask] = useState(null);

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    const mockTasks = [
      {
        id: "1",
        title: "Design new landing page",
        description:
          "Create a modern, responsive landing page for the new product launch with improved UX/UI design patterns.",
        dueDate: "2024-12-25T00:00:00Z",
        priority: "high",
        status: "in-progress",
        createdBy: user?.id || "1",
        assignedTo: [user?.id || "1"],
        sharedWith: ["user2@example.com"],
        createdAt: "2024-12-20T00:00:00Z",
        updatedAt: "2024-12-21T00:00:00Z",
      },
      {
        id: "2",
        title: "Review pull requests",
        description:
          "Review and approve pending pull requests from the team members.",
        dueDate: "2024-12-22T00:00:00Z",
        priority: "medium",
        status: "todo",
        createdBy: user?.id || "1",
        assignedTo: [user?.id || "1"],
        sharedWith: [],
        createdAt: "2024-12-20T00:00:00Z",
        updatedAt: "2024-12-20T00:00:00Z",
      },
      {
        id: "3",
        title: "Prepare presentation slides",
        description:
          "Create slides for the quarterly review meeting with stakeholders.",
        dueDate: "2024-12-30T00:00:00Z",
        priority: "low",
        status: "completed",
        createdBy: user?.id || "1",
        assignedTo: [user?.id || "1"],
        sharedWith: ["manager@example.com", "team@example.com"],
        createdAt: "2024-12-19T00:00:00Z",
        updatedAt: "2024-12-21T00:00:00Z",
      },
      {
        id: "4",
        title: "Fix authentication bug",
        description:
          "Resolve the issue with OAuth login redirects on mobile devices.",
        dueDate: "2024-12-23T00:00:00Z",
        priority: "high",
        status: "todo",
        createdBy: user?.id || "1",
        assignedTo: [user?.id || "1"],
        sharedWith: [],
        createdAt: "2024-12-21T00:00:00Z",
        updatedAt: "2024-12-21T00:00:00Z",
      },
    ];

    setTasks(mockTasks);
  }, [user]);

  // Filter tasks
  useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const handleCreateTask = () => {
    setTaskFormMode("create");
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskFormMode("edit");
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleShareTask = (task) => {
    setSharingTask(task);
    setIsShareModalOpen(true);
  };

  const handleStatusChange = (taskId, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleTaskSubmit = (taskData) => {
    if (taskFormMode === "create") {
      const newTask = {
        id: Date.now().toString(),
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        createdBy: user?.id || "1",
        assignedTo: [user?.id || "1"],
        sharedWith: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    } else if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
    }
  };

  const handleTaskShare = (taskId, emails) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, sharedWith: [...task.sharedWith, ...emails] }
          : task
      )
    );
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() && task.status !== "completed"
    ).length;

    return { total, completed, inProgress, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to conquer your goals? Let's make today productive! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
                <p className="text-xs text-blue-600 mt-1">📋 All tasks</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-2xl">
                <CheckSquare className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {stats.completed}
                </p>
                <p className="text-xs text-green-600 mt-1">✅ Well done!</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-2xl">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {stats.inProgress}
                </p>
                <p className="text-xs text-blue-600 mt-1">⚡ Keep going!</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-2xl">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Overdue</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {stats.overdue}
                </p>
                <p className="text-xs text-red-600 mt-1">🚨 Needs attention</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-pink-100 p-3 rounded-2xl">
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Filter className="h-5 w-5 text-gray-600" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                >
                  <option value="all">All Status</option>
                  <option value="todo">📋 To Do</option>
                  <option value="in-progress">⚡ In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                >
                  <option value="all">All Priority</option>
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>

              {/* Create Task Button */}
              <button
                onClick={handleCreateTask}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onShare={handleShareTask}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-lg max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-100 to-blue-100 p-4 rounded-2xl w-20 h-20 mx-auto mb-6">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {searchTerm ||
                  statusFilter !== "all" ||
                  priorityFilter !== "all"
                    ? "No tasks match your filters 🔍"
                    : "Ready to start your journey? 🚀"}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {searchTerm ||
                  statusFilter !== "all" ||
                  priorityFilter !== "all"
                    ? "Try adjusting your search criteria or filters to find what you're looking for"
                    : "Create your first task and begin organizing your workflow like a pro"}
                </p>
                {!searchTerm &&
                  statusFilter === "all" &&
                  priorityFilter === "all" && (
                    <button
                      onClick={handleCreateTask}
                      className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Create Your First Task</span>
                      <Sparkles className="h-5 w-5" />
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleTaskSubmit}
        task={editingTask}
        mode={taskFormMode}
      />

      <ShareTaskModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        task={sharingTask}
        onShare={handleTaskShare}
      />
    </div>
  );
};

export default Dashboard;
