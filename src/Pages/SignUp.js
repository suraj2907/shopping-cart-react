import React, { useContext, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../Context/UserContext";
import { Link, NavLink, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid });
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        toast(error.message, { type: "error" });
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
    <div className="d-flex login-mobile justify-content-around align-items-center gap-5 login-bg">
      <div className=" d-flex justify-content-center align-items-center">
        <div className="login-img">
          <img height={500} width={500} src="bg-img.png" alt="signup-img" />
        </div>
      </div>
      <div className="center1">
        <form
          onSubmit={handleSubmit}
          className="signup-container"
          style={{ fontWeight: "bold" }}
        >
          <h3 className="overflow-hidden mb-3 ">SignUp Here</h3>
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
            SignUp
          </button>
          <p className="text-center mt-3 ">Already have and account</p>
          <NavLink tag={Link} to="/signin" className="btn btn-primary  mt-1">
            Login
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
