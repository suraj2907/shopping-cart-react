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

firebase.initializeApp(FireBaseConfig);
const App =()=> {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />

      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Signup" element={<SignUp />} />
          <Route exact path="/Signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
