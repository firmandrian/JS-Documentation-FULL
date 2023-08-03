import React, { useState } from "react";
import "./chat.css";
import { io } from "socket.io-client";
import State from "./State.jsx";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [cookie] = useCookies(["token"]);
  const [socket, setSocket] = useState(null);

  const joinRoom = () => {
    if (room === "") {
      return;
    }

    if (cookie.token) {
      const decodedToken = jwt_decode(cookie.token);
      console.log(decodedToken);
      // const { username } = decodedToken;
      /* const { username } = decodedToken;
      pada code diatas merupakan teknik "destructing assignment",
      ini adalah cara singkat untuk mengambil nilai dari objek maupun array ke variable berbeda.
      dan dibawah ini adalah code jika tidak ingin menggunakan destructing assignment
      */ 
      const username = decodedToken.username
      const socket = io("http://localhost:4100", {
        query: {
          token: cookie.token
        }
      });
      setSocket(socket);

      socket.on("connect", () => {
        socket.emit("join_room", room, cookie.token);
        // console.log(room, cookie.token);
        setUsername(username);
        setShowChat(true);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          <Link to="/home">
            <button>Back</button>
          </Link>
        </div>
      ) : (
        <State socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
