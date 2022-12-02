import React from "react";
import "./Message.css";
import profile from "../../images/profile.png";
import ReactEmoji from "react-emoji";

const Message = ({ user, message, classs }) => {
  const time =
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  console.log(time);
  if (user) {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} alt="logo" /> {ReactEmoji.emojify(`${message}`)}{" "}
        <br />
        {time}
      </div>
    );
  } else {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} alt="logo" />
        {ReactEmoji.emojify(`${message}`)} <br />
        {time}
      </div>
    );
  }
};

export default Message;
