import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      return navigate("/login");
    }

    // Save token to localStorage
    localStorage.setItem("token", token);

    // Fetch actual user from backend
    axios
      .get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        login({ ...res.data, token }); // Save full user data
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login failed", err);
        navigate("/login");
      });
  }, [login, navigate]);

  return <p className="p-4 text-center">Logging you in with Google...</p>;
};

export default OAuthSuccess;
