import React from "react";
import { CheckSquare, Bell, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useWebSocket } from "../hooks/useWebSocket";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { realtimeUpdates } = useWebSocket(user?.id || "");

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Pro</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Real-time notifications */}
            <div className="relative group">
              <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 group-hover:scale-105">
                <Bell className="h-5 w-5" />
              </button>
              {realtimeUpdates.length > 0 && (
                <div className="absolute -top-1 -right-1">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-lg">
                    {realtimeUpdates.length}
                  </span>
                </div>
              )}
            </div>

            {/* User profile */}
            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors">
              <div className="relative">
                <img
                  src={
                    user?.avatar ||
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                  }
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
