import React, { useState } from "react";
import { useRef, useEffect, useContext } from "react";
import axios from "../../api/axios";
import "./LoginStyle.css";
import AuthContext from "../../context/AuthProvider";

const LOGIN_URL = "https://jsonplaceholder.typicode.com/users";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-type": "application.json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response ));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Passowrd ");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      <div id="main">
        {success ? (
          <section>
            <div id="logged">
              <h1>You Are Logged In </h1>
              <br />
              <p>
                <a href="#a"> Go To Home</a>
              </p>
            </div>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="heading">
              <h1>LOGIN</h1>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="username">Your Name: </label>
              <input
                id="username"
                type="text"
                placeholder="Email or Username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                value={user}
                required
              />
              <label htmlFor="password">Password : </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                required
              />
              <button className="btn"> Sign In </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
