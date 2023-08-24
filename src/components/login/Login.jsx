import React, { useState } from "react";
import { useRef, UseState, useEffect } from "react";
import "./LoginStyle.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser("");
    setPwd("");
    setSuccess(true);
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You Are Logged In</h1>
          <br />
          <p>
            <a href="#"> Go To Home</a>
          </p>
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

            
                <form onSubmit={handleSubmit}>
                  <label htmlFor="username">Your Name </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Email or Username"
                    ref={useRef}
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
                    placeholder="Email or password"
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
    </>
  );
};

export default Login;
