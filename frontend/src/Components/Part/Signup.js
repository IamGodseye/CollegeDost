import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import a1 from "./PNG/256x256/1.png";
import a2 from "./PNG/256x256/2.png";
import a3 from "./PNG/256x256/3.png";
import a4 from "./PNG/256x256/4.png";
import a5 from "./PNG/256x256/5.png";
import a6 from "./PNG/256x256/6.png";
import a7 from "./PNG/256x256/7.png";
import a8 from "./PNG/256x256/8.png";
import a9 from "./PNG/256x256/9.png";
import a10 from "./PNG/256x256/10.png";
import a11 from "./PNG/256x256/11.png";
import a12 from "./PNG/256x256/12.png";
import { Helmet } from "react-helmet";
import a13 from "./PNG/256x256/13.png";
import a14 from "./PNG/256x256/14.png";
import a15 from "./PNG/256x256/15.png";
import a16 from "./PNG/256x256/16.png";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";

const SignupValues = {
  name: "",
  email: "",
  password: "",
  university: "",
  avatar:""
};

const Login = () => {

  const [signup, setSignup] = useState(SignupValues);
  const [isActive, setActive] = useState("true");
  const [show, setShow] = useState(false);
  const [hasposts, setHasposts] = useState(false);
  const [university, setUniversity] = useState("");
  const [error, setError] = useState("");
  const [unis, setUnis] = useState([]);
  const [avatar, setAvatars] = useState("");
  const history = useHistory();

  const toast = useToast();

  const inputChange = (e) => {
    setError("");
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };

  const setAvatar = (e) => {
    e.preventDefault();
    setAvatars(e.target.src);
    setSignup({ ...signup, avatar: avatar });
    console.log(signup);
    toast({
      title: "Avatar Selected",
      status: "success",
      isClosable: true,
      position:"top-right"
    })
  };

  const getUnivs = async () => {
    const uni = await axios.get(`${API}/getUnivs`);
    console.log(uni.data);
    setUnis(uni.data);
  };

  const collegeName = (e) => {
    console.log(e.target.value);
    setUniversity(e.target.value);
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const SignupUser = async (e) => {
    setShow(true);
    e.preventDefault();
    if (/.+@.+\.[A-Za-z]+$/.test(signup.email)) {
      const url = `${API}/signup`;
      const res1 = await axios.post(url, signup);
      if (res1.data.success) {
        setShow(false); 
        history.push("/Login");
        toast({
          title: "Success",
          description: res1.data.message,
          status:"success",
          isClosable:false
        });
      } else {
        setShow(false); 
        toast({
          title: "Failed",
          description: res1.data.message,
          status: "error",
          isClosable:false
        });
      }
    } else {
      console.log("Enter a Valid Email");
      setShow(false);
      setError("Please Enter a Valid Email");
    }
  };


  useEffect(() => {
    getUnivs();
  }, []);
  return (
    unis.length > 0 ?
    <div className="signup">
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div className={isActive ? "light" : null}>
        <div className="wrapper-header">
          <header className="text-center mt-2" style={{ color: "white" }}>
            College Dost
          </header>
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <Link
              to="/Login"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="btn-choice change1">
                <button className="login_btn ">
                  <span>
                    <h3>Signup</h3>
                  </span>
                </button>
              </div>
            </Link>

            <label htmlFor="username">Name:</label>
            <input
              id="username"
              type="text"
              onChange={(e) => inputChange(e)}
              name="name"
              placeholder="enter name"
              autoComplete="off"
            />
            <label htmlFor="name">Email:</label>
            <input
              id="name"
              name="email"
              type="email"
              onChange={(e) => inputChange(e)}
              placeholder="enter college email"
              autoComplete="off"
            />
            <label htmlFor="email">Password:</label>
            <input
              id="email"
              name="password"
              onChange={(e) => inputChange(e)}
              type="password"
              placeholder="enter password"
              autoComplete="off"
            />
            <label htmlFor="clgname">College name:</label>

            <select
              className="clg_option"
              onChange={(e) => collegeName(e)}
              name="university"
            >
              <option>College name</option>
              {unis.map((i) => (
                <option>{i.universityName}</option>
              ))}
            </select>

            <label htmlFor="avatar">Avtar:</label>
            <div className="avatars">
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476210/cgggp1qrgbdp0usoahrf.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476264/fqnrpqlujucrotiazxvc.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476302/yeigarimtuvnm3r8mjvy.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476328/awqgh8niuek04vnxrq59.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476367/upzq6aqidrzbvfepyez8.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476410/q1rjnignh5djpnujltyy.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476431/sv8yhn3hhzvdehkzyrqj.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476457/gg18aoxmhauhikebflml.png"
                  style={{ height: "50px", width: "50px" }}
                />{" "}
              </button>

              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476485/phfc68umdpq7lpwtruai.png"
                  style={{ height: "50px", width: "50px" }}
                />
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476511/m69ozf74efzjivynwajg.png"
                  style={{ height: "50px", width: "50px" }}
                />
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476537/avwhp38wgcc0wwiuw9hj.png"
                  style={{ height: "50px", width: "50px" }}
                />
              </button>
              <button onClick={(e) => setAvatar(e)}>
                <img
                  src="https://res.cloudinary.com/harshit111/image/upload/v1627476585/yx7abrmbkzciw4xzjsyg.png"
                  style={{ height: "50px", width: "50px" }}
                />
              </button>
            </div>
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
              <button id="submit" onClick={(e) => SignupUser(e)}>
                Signup
              </button>
            )}
            <Link
              to="/Login"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Already a User ? Login
            </Link>
          </form>
        </div>
      </div>
      </div> :
          <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            className="spinner-border spinner-border-md text-center"
            style={{
              height: "100px",
              width: "100px",
            }}
            role="status"
            aria-hidden="true"
          ></span>
        </div>
  );
};
export default Login;
