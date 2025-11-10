import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Network</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social Network.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              required
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              type="email"
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              type="Password"
              required
              ref={password}
              placeholder="password"
              className="loginInput"
              minLength={6}
            />
            <input
              type="Password"
              required
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
