import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { connectWS } from "./ws";

const App = () => {
  const  socket = useRef(null)
  const [userName,setUserName] = React.useState("")

  useEffect(()=>{
    socket.current = connectWS()

    socket.current.on('connect',()=>{
      console.log("connection stablished",socket.current.id);
      socket.current.emit("welcome")
    })
    socket.current.on('disconnect',()=>{
      console.log("disconnected from server");
    })

  },[])

  const handleSetUserName=()=>{
    const name = document.querySelector("input").value
    setUserName(name)
    socket.current.emit("joinRoom",name)
  }

  return <div>
    <h1>Dummy WebSocket Client</h1>
    <div>
      {userName?
      <>
      <h2>{userName}</h2>
      </>:
      <>
      <h2>Enter userName to start chat</h2>
      <input type="text"  placeholder="Enter your name" />
      <button onClick={handleSetUserName}>Start Chat</button>
      </>}
    </div>
  </div>;
};

export default App;
