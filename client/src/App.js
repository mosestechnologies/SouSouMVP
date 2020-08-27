import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Axios from "axios"
import { Home } from "./components/home/home";
import {Login}  from "./components/auth/login";
import { Register } from "./components/auth/register";
import { Header } from "./components/header/header";
import {GlobalState} from "./context/GlobalState"

function App() {

const [userData,setUserData] = useState({
	token :undefined,
	user : undefined
})

useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/api/auth/login",
        null,
        { headers: { "auth-token": token } }
      );
      if (tokenRes) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "auth-token": token },
        });
        setUserData({
          token,
          user: userRes,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
	<GlobalState.Provider value={{userData,setUserData}}>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
	  </GlobalState.Provider>
    </>
  );
}

export default App;
