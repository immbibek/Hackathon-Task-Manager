import React, { useState } from "react";
import { X, Mail, Search, Plus, UserPlus, Users, Send } from "lucide-react";

const ShareTaskModal = ({ isOpen, onClose, task, onShare }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (emails.includes(email)) {
      setError("This email is already added");
      return;
    }

    setEmails((prev) => [...prev, email]);
    setEmail("");
    setError("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails((prev) => prev.filter((e) => e !== emailToRemove));
  };

  const handleShare = () => {
    if (emails.length === 0) {
      setError("Please add at least one email address");
      return;
    }

    if (task) {
      onShare(task.id, emails);
      setEmails([]);
      setEmail("");
      setError("");
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform animate-modal-appear">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Share Task</h2>
                <p className="text-purple-100 text-sm">
                  Collaborate with your team
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Task info */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  Share this task with team members to collaborate
                </p>
              </div>
            </div>
          </div>

          {/* Email input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="flex items-center text-sm font-semibold text-gray-700 mb-3"
            >
              <Mail className="h-4 w-4 mr-2 text-purple-500" />
              Add Team Members
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="colleague@company.com"
                  className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 ${
                    error
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              </div>
              <button
                onClick={handleAddEmail}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Added emails */}
          {emails.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                Will be shared with ({emails.length}):
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-1.5 rounded-lg">
                        <Mail className="h-3 w-3 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {email}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="p-1.5 text-purple-400 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              disabled={emails.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Share Task</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ShareTaskModal;
