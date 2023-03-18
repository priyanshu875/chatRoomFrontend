import React, { useEffect, useState } from "react";
import { socket } from '../components/Home'
import '../css/Chat.css';
import { useRef } from "react";
import Image from "./Image";
function Chat(props){
    
    console.log(`my socket id is${props.userId}`);
    
    let comp=<div>
        <p>no active users</p>
    </div>
    // const [id,setId]=useState('');
    const bottomRef = useRef(null);

    const [activeUsers,setActiveUsers]=useState([]);
    const [chats,setChats]=useState([]);
    const [requests,setRequests]=useState([]);
    const [file,setFile]=useState();
    const [msg,setMsg]=useState('');

    const  sendMsg=(event)=>{
        event.preventDefault();
        // console.log(msg);
        if(msg.length===0)return;
        // socket.emit("chat",msg);
        // setMsg('');
        if(file){
            const msgObj={
                type:'image/jpg',
                body:file,
                mimeType:file.type,
                fileName:file.name
            }

            setMsg("");
            setFile();
            socket.emit("chat",msgObj);
        }
        else{
            const msgObj={
                type:'text',
                body:msg
            }
            setMsg("");
            socket.emit("chat",msgObj);
        }

    }

    let updateFile=(e)=>{
        setMsg(e.target.files[0].name);
        console.log(e);
        setFile(e.target.files[0]);
        e.target.value=null;
    }

    const acc=(id)=>{
        console.log(id);
        let user=requests.find(req=>{
            return req.id==id;
        })
        console.log(user);
        socket.emit("accept",user);
        setRequests(oldValues=>{
            return oldValues.filter(req=>req.id!=id);
        })
    }

    useEffect(()=>{
        socket.on("chat",(payload)=>{ 
            console.log(payload);
            setChats([...chats,payload])
            console.log(chats);
        })

        //handling request
        socket.on("request",(userDet)=>{
            console.log(userDet);
            setRequests([...requests,userDet]);
            console.log(userDet.id);
        })

        socket.on("activeUsers",objActiveUsers=>{
            // console.log(objActiveUsers);
            setActiveUsers(objActiveUsers);
        })

    })

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [chats]);

    return (
        <div className="chat-page">
            
            {/* right panel */}
            <div className="left-panel">

                <div className="active-users">

                    <p className="sub-head">*Active users</p>
                    <div className="user-name">
                    {       
                            activeUsers.map(user=>{
                            if(user.id===props.userId)return(<p>- {user.name} (Me)</p>)
                            return(<p>- {user.name}</p>)
                            })

                    }
                    </div>
                
                </div>
                <hr />                        
                {   
                    requests.length
                    ?<div className="user-req">
                        <p className="sub-head">*Requests</p>
                        <div className="user-name">
                        {
                         requests.map((req)=>{
                             return(<div className="tmp-user-req">
                                 <p>- {req.name}</p>
                                 <button onClick={()=>acc(req.id)}>&#10003;</button>
                             </div>)
                         })
                        }
                        </div>
                    </div>      
                    :<p>&nbsp;&nbsp;*Requests (0)</p>
                }
            
                
            </div>
            
            {/* left panel */}
            <div className="right-panel">
                <div className="chat-cont">
                    {
                        chats.map((chat)=>{
                            if(chat.data.type==="image/jpg"){
                                const blob=new Blob([chat.data.body],{type:chat.data.type});
                                return(
                                    <div className="chat">
                                        <p className="chat-user-name">{chat.name}:</p>
                                        <Image fileName={chat.data.fileName} blob={blob} />
                                        <div ref={bottomRef} />
                                    </div>
                                )
                            }

                            return(
                                <div className="chat">
                                    <p className="chat-user-name">{chat.name}:</p>
                                    <p className="chat-user-msg">{chat.data.body}</p>
                                    <div ref={bottomRef} />
                                    
                                </div>
                            
                            )
                        })
                    }
                    <div ref={bottomRef} />
                </div>
                <div className="msg-form-cont">
                    <form onSubmit={sendMsg} className="msg-form" >
                        {/* <input type="text" value={msg} placeholder="type message.." onChange={e=>setMsg(e.target.value)} required /> */}
                        <textarea name="" value={msg} id="" cols="110" rows="1" placeholder="type message.." onChange={e=>setMsg(e.target.value)} ></textarea>
                       <label htmlFor="inputTag"><i class="fa fa-camera"></i>  <input id="inputTag" type="file" onInput={updateFile} multiple/> </label>
                        <input type="submit" value="send" />
                    </form>
                </div>
            </div>
            
        </div>
    )
}
export default Chat;
