import React, { useEffect, useState } from "react";
import {socket} from './Home';
import Chat from "./Chat";
import '../css/FormPage.css'


function JoinRoom(){
    let comp;
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [onRequest,setOnRequest]=useState(false);
    const [log,setLog]=useState(false);
    const [id,setId]=useState('');

    const join=(e)=>{
        e.preventDefault();
        socket.emit("request",{name,room});
        setOnRequest(true);
    }
    useEffect(()=>{
        
        socket.on("failed",(msg)=>{
            console.log(msg);
        })

        socket.on("accept",msg=>{
            console.log(msg);
            socket.emit("i am in",(room));
        })
        socket.on("canChat",msg=>{
            setLog(true);
            setOnRequest(false);
        })
        socket.on("connect",()=>{
            setId(socket.id);
        })

    })
    if(!log && !onRequest){

        comp= <div className="form-cont">
                <h1 className="form-heading">"Welcome_To_Join"</h1>

            <form onSubmit={join} >
                <input type="text" value={name} placeholder="name" onChange={e=>setName(e.target.value)} required/>
                <input type="text" value={room} placeholder="room" onChange={e=>setRoom(e.target.value)} required/>
                <input type="submit" value="join room"/>
            </form>
        </div>
    }
    else if(onRequest && !log){
        comp=<div>
                <p className="notify">Your response is hoping on its way...🐰</p>
        </div>
    }
    else if(log && !onRequest){
        comp=<Chat 
                userId={id}
                userName={name}
             />
    }

    return (
        <div className="form-page-cont">
            {comp}
        </div>
    )
}
export {JoinRoom}