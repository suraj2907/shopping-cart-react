import React, { useState, useContext, useEffect } from "react";
import "../index.css";
import signup from "../Assests/signup.png";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import { useToast } from "../Components/Toast";
// Removed unused import { div } from "framer-motion/client";

const SignIn = () => {
  const context = useContext(UserContext);
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // Do not set context here; App.jsx will handle it via onAuthStateChanged
        window.localStorage.setItem(
          "userData",
          JSON.stringify({ email: res.user.email, uid: res.user.uid })
        );
        window.localStorage.setItem("isloggedin", true);
      })
      .catch((error) => {
        console.log(error);
        showToast(error.message, "error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isloggedin");
    if (isLoggedIn) {
      // If there's a logged-in user, update the user context
      const userData = JSON.parse(window.localStorage.getItem("userData"));
      // context.setUser(userData); // No need to set context here, App.jsx handles it
    }
  }, [context]);

  const handleShowPasswordToggle = () => {
    setShowPassword((prevShowPassoword) => !prevShowPassoword);
  };

  if (context.user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-bl bg-slate-50 p-4 ">
      {/* Left: Sign In Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form className="gap-6 " onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-gray-700 font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-bold text-lg shadow-md transition-all duration-200 mt-6"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      {/* Right: Dummy Image */}
      <div className="hidden flex-1 md:flex items-center justify-center mt-8 md:mt-0">
        <img
          src={signup}
          alt="Dummy"
          className="rounded-3xl w-full max-w-xs max-h-[500px] h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
