import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('error',(error)=>{
      console.log(error);
    })
  }, []);
  const sendMessage = ()=>{
    socket.emit('message',message,'12345678');
    setMessage('')
  }
  return (
    <div>
      <div>
        {
          receivedMessages.map((msg,index)=>(
            <div key={index}>
              <h1 style={{color:'white'}}>{msg}</h1>
            </div>
          ))
        }
      </div>
      <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
