import React from "react";
import { loginWithGoogle } from "../firebase";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/chat"); // Redirect to the chat page after login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
