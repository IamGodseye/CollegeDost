import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import land from "./DrawKit-daily-life-vector-illustrations/PNG/1.png";
import Question from "./Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShadowScrollbars from "./ShadowScrollbars";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import Header from "./Header.js";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import Content from "./Content";
import "./Home.css";
import {Link} from 'react-router-dom';
import land1 from "./landing_1.jpg";
import UnivContent from "../UnivContent";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { API } from "./API";
export default function College() {
  const[hashTag,setHashTag]=useState([]);


  const getLastestHashtags=async(e)=>{
    const d = await axios.get(`${API}/topHashtagsUniv`,{
      headers:{
        Authorization: "CollegeDost " + localStorage.getItem("jwt"),
      }
    });
    if(d.status===201){
      setHashTag(d.data);
    }
  }

  useEffect(()=>{
    getLastestHashtags();
  },[hashTag])

  return (
    <div className="home college">
       <Helmet>

<title>College</title>
</Helmet>
      <Header />
      <div className="landing">
        <img
          className="landing-img"
          src={land}
          style={{
            height: "33%",
            width: "33%",
            marginTop: "10px",
            float: "left",
            marginLeft: "20px",
          }}
          alt=""
        />
        <div className="landing-line">Get your questions answered....</div>
      </div>
      {/* <AwesomeSlider>
        <div data-src="https://images.unsplash.com/photo-1565151284956-f36a351d6157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" />
        <div data-src="https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
          1
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </AwesomeSlider> */}

      {/* <img
        className="landing-img"
        src={land1}
        style={{
          height: "30%",
          width: "30%",
          float: "right",
          marginLeft: "20px",
        }}
      /> */}
      <div className="sec-nav">
      { 
        hashTag.map(h=>(

          <div class="secnav-items one1">
          <Link  to = {`/hashtagCollege/?${h.hashTagtext.replace("#","")}`}>{h.hashTagtext}</Link>
          </div>
        ))
      }
        <div className="secnav-items add-Question">
          {/* <button className="btn btn-outline-success">
            <b>+</b>
          </button> */}
        </div>
      </div>
      <UnivContent />

      <div className="footer-huge">
        <Footer />
      </div>
      <div className="footer-small">
        <SecFooter />
      </div>
    </div>
  );
}
