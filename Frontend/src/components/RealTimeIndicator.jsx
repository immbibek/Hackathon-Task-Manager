import React from "react";
import { X, Clock, Zap } from "lucide-react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useAuth } from "../hooks/useAuth";

const RealTimeIndicator = () => {
  const { user } = useAuth();
  const { realtimeUpdates, clearUpdate } = useWebSocket(user?.id || "");

  if (realtimeUpdates.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      {realtimeUpdates.map((update, index) => (
        <div
          key={index}
          className="bg-white/95 backdrop-blur-xl border border-blue-100 rounded-2xl p-4 shadow-2xl min-w-80 animate-slide-in-right transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Live Update
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">"{update.task.title}"</span> was
                  updated by{" "}
                  <span className="font-medium text-blue-600">
                    {update.updatedBy}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => clearUpdate(index)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default RealTimeIndicator;
