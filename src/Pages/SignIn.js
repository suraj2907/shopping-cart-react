import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../Context/UserContext";
import { NavLink, Navigate } from "react-router-dom";
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
    handleSignIn();
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
    <section
      className="vh-100 overflow-hidden"
      style={{ backgroundColor: "#9A616D" }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="col-sm-8 col-md-10 col-lg-8 signin-container">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-flex flex-column ">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    height={580}
                    className="img-fluid"
                    width={650}
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className=" container-fluid col-lg-7   d-flex login-mobile justify-content-center align-items-center">
                  <div className="text-black ">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                      </div>

                      <h2
                        className="fw-bold  mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h2>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg w-100"
                          required="true"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="form2Example27"
                          className="form-control form-control-lg"
                          required="true"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={showPassword}
                          onChange={handleShowPasswordToggle}
                        />
                        <label className="form-check-label" for="exampleCheck1">
                          Show Password
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg btn-block login-button"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <NavLink to="/signup" style={{ color: "#393f81" }}>
                          Register here
                        </NavLink>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
