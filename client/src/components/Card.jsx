import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format} from "timeago.js";




const Container = styled.div`
width:${(props)=>(props.mode==="smal" ? "200px":"300px")};
${'' /* cursor:pointer; */}
margin-bottom:${(props)=>(props.mode==="smal" ? "10px":"40px")};
display:${(props)=>(props.mode==="smal" && "flex")};
 

`
const VideoImage = styled.div`
width:100%;
height: 200px;
background-color:#999;

`

const Image = styled.img`
width:100%;
height:${(props)=>(props.mode==="smal"  && "150px")};
background-color:#999;

`

const Detail = styled.div`    
display:flex;
margin-top:10px;
gap:12px;

`
const ChannelImage = styled.img`
background-color:#999;
width:36px;
height:36px;
border-radius:50%;
display:${(props)=>(props.mode === "smal" && "none" )};
border:none;
`

const Text = styled.div`
margin-left:${(props)=>(props.mode === "smal" && "10px" )}

`
const Tital = styled.h1`
font-size:16px;
font-weight:500;
color:${({theme})=>theme.text};
width:${(props)=>(props.mode === "smal" && "150px" )};

`
const Info = styled.div`
font-size:13px;
font-weight:500;
color:${({theme})=>theme.textSoft};
margin-top:5px;

`
const ChannelName = styled.h2`
font-size:14px;
font-weight:500;
color:${({theme})=>theme.text};
margin-top:5px;

`

const Card = ({mode,video})=>{ 
    const [channel,setChannel] = useState({})

    useEffect(()=>{
        const fetchVideos =  async ()=>{
            const res = await axios.get(`/api/users/find/${video.userId}`);
            setChannel(res.data)
        }
        fetchVideos();  
        
    },[video.userId])
    return(
        <Link to={`/video/${video._id}`} style={{textDecoration:"none"  ,height: "280px"}}  >
            <Container mode={mode} >
                <VideoImage mode={mode}><Image mode={mode} src= {video.imgUrl} alt="image"/></VideoImage>
                <Detail mode={mode}>
                    <ChannelImage mode={mode} src= {channel.img}/>
                    <Text mode={mode}>
                        <Tital mode={mode}> {video.tital} </Tital>
                        <ChannelName mode={mode}>{ channel.name}</ChannelName>
                        <Info mode={mode}>{ video.views} views .  {format(video.createdAt)}</Info>
                    </Text>
                </Detail>
            </Container>
        </Link>
    )
}

export default Card