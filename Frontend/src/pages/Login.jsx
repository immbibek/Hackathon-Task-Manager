// pages/Login.jsx
const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
