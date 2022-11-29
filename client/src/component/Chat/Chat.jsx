import React, { useEffect, useState } from "react";
import "./Chat.css";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import Message from "../Message/Message";
import profile from "../../images/profile.png";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { Link } from "react-router-dom";

const ENDPOINT = "http://localhost:8080/";
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const send = () => {
    const message = document.getElementById("chat-input").value;
    socket.emit("message", { message, id });
    document.getElementById("chat-input").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.disconnect("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>To Talk</h2>
          <h3>
            <img src={profile} /> {user}
          </h3>
          <Link to="/">
            <h6>Close</h6>
          </Link>
        </div>
        <ReactScrollToBottom className="chat-box">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="input-box">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="chat-input"
          />
          <button onClick={send} className="send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
