import "./Messenger.css";
import React, { useEffect,useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import Header from "./Part/Header";
import axios from "axios";
import EmptyChat from "./EmptyChat";
import Menu from "./Part/Messenger/menu/Menu";
import ChatBox from "./Part/Messenger/chat/ChatBox";
const Messenger = () => {

  const [chats, setChats] = useState([]);

  const getChats = async() => {
    const c = await axios.get("http://localhost:4000/getUserChats", {
      headers: {
        Authorization: "CollegeDost " + localStorage.getItem("jwt")
      }
    });

    if (c.status === 201) {
      console.log(c?.data);
      setChats(c?.data);
    }
  }

  useEffect(() => {
    getChats();
  }, [])
  return (
    <>
      <Header />
      <div className="msger">
        {/* <h1 className="nav"></h1> */}
        <div className="messenger">
          <div className="messenger-sidebar">
            <div className="messenger-heading pt-4 text-center">
              College Dost Messenger
            </div>
            {/* <div className="messenger-search">
              <input type="text" placeholder="search user" className="p-1" />
              <button>
                <SearchIcon />
              </button>
            </div> */}
           <Menu/>
            {/* <div className="mb-1 mt-1" style={{ backgroundColor: "#90e0ef" }}>
            <img
              className="profile_pic1 mr-2 ml-2 pt-2 pb-2"
              src={
                "https://static.smalljoys.me/2020/11/3917931_shiba-cheems-meme-dog-balltze-36-5f030f09448d7__700_1606057754.jpg"
              }
              style={{
                height: "50px",
                width: "50",
                borderRadius: "40px",
              }}
              alt=""
            />
            User name
          </div> */}

            {/* <div className="mb-1 mt-1" style={{ backgroundColor: "#90e0ef" }}>
            <img
              className="profile_pic1 mr-2 ml-2 pt-2 pb-2"
              src={
                "https://static.smalljoys.me/2020/11/3917931_shiba-cheems-meme-dog-balltze-36-5f030f09448d7__700_1606057754.jpg"
              }
              style={{
                height: "50px",
                width: "50",
                borderRadius: "40px",
              }}
              alt=""
            />
            User name
          </div> */}
          </div>
          <div className="messenger-chat ">
            {/* <div
            className="col-md-12 mx-auto pt-4"
            style={{
              height: "10vh",
              fontSize: "20px",
              backgroundColor: "#03045e",
              color: "white",
            }}
          >
            Title bolte
          </div> */}
            {/* <div className="messenger-heading p-3">
              <img
                className="profile_pic1"
                src={
                  "https://static.smalljoys.me/2020/11/3917931_shiba-cheems-meme-dog-balltze-36-5f030f09448d7__700_1606057754.jpg"
                }
                style={{
                  height: "50px",
                  width: "50",
                  borderRadius: "40px",
                }}
                alt=""
              />
              UserName
            </div> */}

            <ChatBox/>

            {/* <div
              className="chat"
              style={{
                minHeight: "80%",
              }}
            >
              <div
                className="chat-answer p-2 m-2"
                style={{
                  background: "#023e8a",
                  float: "left",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  color: "white",
                }}
              >
                Answer
              </div>
              <br />
              <div
                className="chat-reply p-2 m-2"
                style={{
                  float: "right",
                  background: "#00b4d8",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  color: "white",
                }}
              >
                Reply
              </div>
            </div> */}
            {/* <div className="chat-msg">
              <textarea className="chat-msg-textarea"></textarea>
            </div> */}
            {/* <EmptyChat/> */}
          </div>
        </div>
      </div>

    </>
  );
};
export default Messenger;
