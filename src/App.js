import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./Context/UserContext";
import { useState } from "react";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import firebase from "firebase/compat/app";
import FireBaseConfig from "./FireBaseConfig/FireBaseConfig";
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";

firebase.initializeApp(FireBaseConfig);
const App = () => {
  const loggedIn = window.localStorage.getItem("isloggedin");
  console.log(loggedIn);

  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />

      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={loggedIn?<Home /> : <SignIn />} />
          <Route exact path="/Signup" element={<SignUp />} />
          <Route exact path="/Signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
