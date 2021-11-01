import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Login.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import { AccountContext } from "../../ContextProvider/AccountProvider";
import "react-circular-progressbar/dist/styles.css";
import { Helmet } from "react-helmet";
import ChangingProgressProvider from "./ChangingProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";

const LoginValues = {
  email: "",
  password: "",
};

const VerifyLink = (props) => {
  const { account, setAccount,showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
  const [isActive, setActive] = useState("false");
  const [login, setLogin] = useState(LoginValues);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  // const { account, setAccount } = useContext(LoginContext);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const inputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    let res1;
    setShow(true);
    if (login.email != "" && login.password != " ") {
      const url = `${API}/login`;
      const res = await axios.post(url, login);
      res1 = res.data;

      console.log(res1);
      console.log("efvbhwefb");
    } else {
      console.log("Fake");
      setError("Please Enter your Email and Password");
      setShow(false);
      return;
    }

    if (res1) {
      if (res1.error) {
        console.log("Fake");
        setError("Invalid Credentials");
        setShow(false);
        return;
      } else {
        console.log(res1.token);
        console.log(res1.user._id);
        localStorage.setItem("id",res1.user._id);
        setAccount(res1.user);
        setShowloginButton(false);
        setShowlogoutButton(true);
        localStorage.setItem("jwt", res1.token);
        localStorage.setItem("user", JSON.stringify(res1.user));
        // console.log(JSON.parse(localStorage.getItem("user")).isAdmin);
        history.push("/home");
        setShow(false);
      }
    }
  };

  return (
    <div className="login signup">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className={isActive ? "light" : null}>
        <div className="wrapper-header">
          <header className="mt-2 text-center" style={{ color: "white" }}>
            College Dost
          </header>
        </div>
        <form className="form">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="btn-choice change1 change2">
              <button className="signup_btn">
                <span>
                  <h3>Forgot Password</h3>
                </span>
              </button>
            </div>
          </Link>
          <label htmlFor="email">Email:</label>
          <input
            id="username"
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Enter email"
            onChange={(e) => inputChange(e)}
          />
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
          {show ? (
            <button id="submit" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button id="submit" onClick={(e) => LoginUser(e)}>
              Send Link
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
export default VerifyLink;
