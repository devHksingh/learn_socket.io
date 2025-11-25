import { useEffect } from "react";
import { useState } from "react";
import socket from "./ws";
import { use } from "react";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessages] = useState("");
  const [chatMessage, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");

  useEffect(() => {
    // connect to server
    socket.connect();
    // listen for connection
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected:", socket.id);
    });
    // listen for welcome message from server

    socket.on("welcome", (msg) => {
      console.log("Server welcome message", msg);
      setWelcomeMsg(msg);
    });

    socket.on("sendMessage", (msg) => {
      console.log("setChatMessages", msg);
      setChatMessages((prev)=>[...prev,msg]);
    });

    //listen for disconnection
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnect:", socket.id);

      //  Cleanup on unmount
      return () => {
        socket.off("disconnect");
        socket.off("connect");
        socket.off("joinRoom");
        socket.disconnect();
      };
    });
  }, []);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    console.log("userName", userName);
    socket.emit("joinRoom", userName);
  };
  const handleSendMsg = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { userName: userName, msg: message });
  };

  return (
    <div>
      <h1>enter user name</h1>

      <>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter your name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </>

      {welcomeMsg}

      <form onSubmit={handleSendMsg}>
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setMessages(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>users message</h2>
        {chatMessage &&
          chatMessage.map((msg, index) => (
            <>
              <div key={index}>{msg}</div>
            </>
          ))}
      </div>
    </div>
  );
};

export default App;
