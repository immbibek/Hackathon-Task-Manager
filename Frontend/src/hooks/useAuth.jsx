import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Your backend base URL - adjust this to match your backend
  const API_BASE_URL = "http://localhost:5000"; // Your backend runs on port 5000

  // Debug: Log the URL being called
  console.log("Auth URL will be:", `${API_BASE_URL}/auth/google`);

  useEffect(() => {
    // Check for existing authentication on app load
    checkAuth();

    // Handle OAuth callback (when redirected back from Google)
    handleOAuthCallback();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        // Verify token is still valid by making a request to backend
        // Since you might not have a verify endpoint, we'll decode the token
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Check if token is expired
        if (payload.exp * 1000 > Date.now()) {
          // Token is valid, get user from localStorage
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          // Token expired, clear it
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Clear invalid data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = () => {
    // Check if we're on the OAuth success page with a token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setLoading(true);

      try {
        // Store the token
        localStorage.setItem("authToken", token);

        // Decode the JWT to get user info
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Create user object from token payload
        // Adjusted to match your User schema (email, username, googleId, avatar)
        const userData = {
          id: payload.id,
          email: payload.email || "user@example.com",
          name: payload.username || payload.email?.split("@")[0] || "User", // Use username or email prefix
          avatar:
            payload.avatar ||
            "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Debug: Check if user data is set correctly
        console.log("User authenticated:", userData);

        // Clean up the URL (remove the token from URL bar)
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        console.error("Failed to process OAuth callback:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    }
  };

  const login = async () => {
    // Simply redirect to your backend's Google OAuth route
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const logout = () => {
    // Clear all authentication data
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
