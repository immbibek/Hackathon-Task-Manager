import React, { useState } from "react";
import {
  Calendar,
  User,
  Edit3,
  Trash2,
  Share,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  Star,
  Users,
  Zap,
} from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onShare, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityConfig = {
    low: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50",
      text: "text-green-700",
      border: "border-green-200",
      icon: "bg-green-100 text-green-600",
    },
    medium: {
      bg: "bg-gradient-to-r from-yellow-50 to-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
      icon: "bg-orange-100 text-orange-600",
    },
    high: {
      bg: "bg-gradient-to-r from-red-50 to-pink-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: "bg-red-100 text-red-600",
    },
  };

  const statusConfig = {
    todo: {
      bg: "bg-gradient-to-r from-gray-50 to-slate-50",
      text: "text-gray-700",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    "in-progress": {
      bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
      text: "text-blue-700",
      icon: Clock,
      iconColor: "text-blue-500",
    },
    completed: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50",
      text: "text-green-700",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
  };

  const StatusIcon = statusConfig[task.status].icon;
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 ${
        isOverdue
          ? "ring-2 ring-red-200 bg-gradient-to-br from-red-50/30 to-white"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div
            className={`p-2 rounded-xl ${priorityConfig[task.priority].icon}`}
          >
            <StatusIcon
              className={`h-4 w-4 ${statusConfig[task.status].iconColor}`}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
            {task.priority === "high" && (
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-3 w-3 text-red-500 fill-current" />
                <span className="text-xs text-red-600 font-medium">
                  High Priority
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onShare(task)}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Share task"
            >
              <Share className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex items-center space-x-2 mb-4">
        <span
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
            priorityConfig[task.priority].bg
          } ${priorityConfig[task.priority].text} ${
            priorityConfig[task.priority].border
          }`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
          Priority
        </span>
        <span
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
            statusConfig[task.status].bg
          } ${statusConfig[task.status].text}`}
        >
          {task.status === "in-progress"
            ? "In Progress"
            : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <div
            className={`p-1.5 rounded-lg ${
              isOverdue ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            <Calendar
              className={`h-4 w-4 ${
                isOverdue ? "text-red-500" : "text-gray-500"
              }`}
            />
          </div>
          <span
            className={`font-medium ${
              isOverdue ? "text-red-600" : "text-gray-700"
            }`}
          >
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year:
                new Date(task.dueDate).getFullYear() !==
                new Date().getFullYear()
                  ? "numeric"
                  : undefined,
            })}
          </span>
          {isOverdue && (
            <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-lg">
              <AlertCircle className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-600 font-medium">Overdue</span>
            </div>
          )}
        </div>

        {task.sharedWith.length > 0 && (
          <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-lg">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-purple-600 font-medium">
              {task.sharedWith.length} shared
            </span>
          </div>
        )}
      </div>

      {/* Quick status change */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>Quick update</span>
          </span>
          <div className="flex space-x-1">
            {["todo", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(task.id, status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                  task.status === status
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "in-progress"
                  ? "Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
