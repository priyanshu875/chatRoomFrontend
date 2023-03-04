import React, { useEffect, useState } from "react";

function Image(props){
    const [imageSrc, setImageSrc]=useState("");
    const link=document.createElement('a');
    
    const download=()=>{
        // link.download='chatRoomImage.jpg';
        // console.log(props);
        link.href=imageSrc;
        link.target="_blank";
        console.log(imageSrc);
        // link.click();
        var url=window.URL.createObjectURL(props.blob);
        link.href=url;
        link.target="_blank";
        link.click();
      
    }
    useEffect(()=>{
        

        const reader=new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend=function(){
            setImageSrc(reader.result);
        }
    });

    return (
        <img src={imageSrc} alt="" style={{width:350,height:"auto",margin:"1rem"}} onClick={download} />
    )
}
export default Image;