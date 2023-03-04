import React from "react";
import '../css/Home.css';
import { Link } from "react-router-dom";
import io from "socket.io-client";
// import { CreateRoom } from "./CreateRoom";
// import { JoinRoom } from "./JoinRoom";
const socket=io.connect("https://chatroombackend-vgu5.onrender.com");


function Home(){
    return (
        <div className="home-cont">
            <div className="heading"><h1>Chat_Rooms</h1></div>
            <div className="links-cont">
                    
                <Link to="/fnrgjn484" className="link-one"><p>JoinRoom </p></Link>
                <Link to="/nfrub84rfn" className="link-two"><p>CreateRoom</p></Link>
            </div>
            
        </div>
    )
}
export {Home, socket};