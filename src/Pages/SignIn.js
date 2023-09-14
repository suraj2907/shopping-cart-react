import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        const userData = { email: res.user.email, uid: res.user.uid };
        context.setUser(userData);
        console.log("UUID:-", res.user.uid);
        window.localStorage.setItem("userData", JSON.stringify(userData));
        window.localStorage.setItem("isloggedin", true);
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, { type: "error" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (context.user?.email && context.user?.password) {
      handleSignIn();
    } else {
      toast("error", { type: "error" });
    }
  };
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isloggedin");
    if (isLoggedIn) {
      // If there's a logged-in user, update the user context
      const userData = JSON.parse(window.localStorage.getItem("userData"));
      context.setUser(userData); // You can set the actual user data here from localStorage
    }
  }, [context]);

  const handleShowPasswordToggle = () => {
    setShowPassword((prevShowPassoword) => !prevShowPassoword);
  };

  if (context.user?.uid) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex login-mobile justify-content-around align-items-center  login-bg ">
      <div className="d-flex justify-content-center align-items-center">
        <div className="login-img">
          <img height={500} width={500} src="bg-img.png" alt="signup-img" />
        </div>
      </div>

      <div className="center">
        <form
          onSubmit={handleSubmit}
          className="signin-container"
          style={{ fontWeight: "bold" }}
        >
          <h3 className="overflow-hidden mb-3 ">LogIn Here</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required="true"
              style={{ border: "1px solid black", borderRadius: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required="true"
              style={{ border: "1px solid black", borderRadius: "10px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              checked={showPassword}
              onChange={handleShowPasswordToggle}
            />
            <label class="form-check-label" for="exampleCheck1">
              Show Password
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
