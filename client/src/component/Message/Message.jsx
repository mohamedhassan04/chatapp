import React from "react";
import "./Message.css";
import profile from "../../images/profile.png";

const Message = ({ user, message, classs }) => {
  if (user) {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} /> {`${user}:${message}`}
      </div>
    );
  } else {
    return (
      <div className={`message-box ${classs}`}>
        <img src={profile} />
        {`${message}`}
      </div>
    );
  }
};

export default Message;
