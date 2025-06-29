import React from "react";
import {
  CheckSquare,
  Chrome,
  Sparkles,
  Zap,
  Users,
  Shield,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <CheckSquare className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            TaskFlow Pro
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Transform your productivity with intelligent task management and
            seamless team collaboration
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your personalized workspace and collaborate with
              your team
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={login}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group transform hover:scale-105"
          >
            <div className="relative">
              <Chrome className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
              {loading && (
                <div className="absolute inset-0 animate-spin">
                  <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            <span className="font-semibold text-lg">
              {loading ? "Signing you in..." : "Continue with Google"}
            </span>
          </button>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-6 text-center">
              🚀 What awaits you inside:
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Real-time Collaboration
                  </span>
                  <p className="text-xs text-gray-600">
                    Live updates and instant notifications
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Smart Team Sharing
                  </span>
                  <p className="text-xs text-gray-600">
                    Seamless task delegation and tracking
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    Priority Intelligence
                  </span>
                  <p className="text-xs text-gray-600">
                    AI-powered task prioritization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 leading-relaxed">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
