import React from "react";
import "./Message.css";
import profile from "../../images/profile.png";
import ReactEmoji from "react-emoji";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} alt="logo" /> {ReactEmoji.emojify(`${message}`)}
      </div>
    );
  } else {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} alt="logo" />
        {ReactEmoji.emojify(`${message}`)}
      </div>
    );
  }
};

export default Message;
