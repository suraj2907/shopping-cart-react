import React, { useContext, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../Context/UserContext";
import { Link, NavLink, Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { useToast } from "../Components/Toast";
import signup from "../Assests/signin.png";

const SignUp = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast("Account created successfully!", "success");
      })
      .catch((error) => {
        toast(error.message, "error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  const handleShowPasswordToggle = () => {
    setShowPassword((prevShowPassoword) => !prevShowPassoword);
  };

  if (context.user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br bg-slate-50 p-4">
      {/* Left: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-center text-slate-800 mb-8 text-base">
            Sign up to get started
          </p>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-slate-800 font-semibold text-base mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-semibold text-base mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm outline-none pr-20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={handleShowPasswordToggle}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none px-2"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition-all duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      {/* Right: Image */}
      <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
        <img
          src={signup}
          alt="Sign up visual"
          className="rounded-3xl w-full max-w-xs max-h-[500px] h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
