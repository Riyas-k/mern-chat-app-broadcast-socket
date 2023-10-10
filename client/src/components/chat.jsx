import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import EmojiInput from "react-input-emoji";
import "bootstrap-icons/font/bootstrap-icons.css";

const socket = io.connect("http://localhost:4000"); // Replace with your server URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    try {
      socket.on("receive_message", (data) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on("error", (error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendMessage = () => {
    try {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);

      // Emit the message to other users
      socket.emit("send_message", message, "12345678");

      // Clear the input field
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {receivedMessages.map((msg, index) => (
          <div key={index}>
            <h1 style={{ color: "black" }}>{msg}</h1>
          </div>
        ))}
      </div>
      <EmojiInput
        value={message}
        onChange={(value) => setMessage(value)}
        placeholder="Write something..."
        cleanOnEnter
      />
      <button className="btn btn-warning ml-2" onClick={sendMessage}>
        <i className="bi bi-send"></i>
      </button>
    </div>
  );
};

export default Chat;
