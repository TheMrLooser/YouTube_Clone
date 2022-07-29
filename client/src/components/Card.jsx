import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format} from "timeago.js";
import MoreVertIcon from '@mui/icons-material/MoreVert';
 



const Container = styled.div`
width:${(props)=>(props.mode==="small" ? "360px":"360px")};
margin-bottom:${(props)=>(props.mode==="small" ? "10px":"40px")};
display:${(props)=>(props.mode==="small" && "flex")};
height:${(props)=>(props.mode==="small" && "160px")};
@media only screen and (max-width:1100px){
     
    width:${(props)=>(props.mode==="small" && "300px")};


};
@media only screen and (max-width:900px){
    width:${(props)=>(props.mode==="small" && "200px")};

};
@media only screen and (max-width:450px){
    overflow-y:${(props)=>(props.mode==="small" && "hidden")};
    height:${(props)=>(props.mode==="small" && "100%")};
    margin-bottom:${(props)=>(props.mode==="small" && "20px")};
    margin-left:${(props)=>(props.mode==="small" && "0px")};
    width:${(props)=>(props.mode==="small" && "100%")};
    display:${(props)=>(props.mode==="small" && "block")};
    
    
}

`
const VideoImage = styled.div`
width:${(props)=>(props.mode==="small"  ? "250px" :"100%")};
background-color:#999;
overflow-y:hidden;
height:${(props)=>(props.mode==="small"  ? "150px":"200px")};
cursor:pointer;
@media only screen and (max-width:1100px){
    width:${(props)=>(props.mode==="small"  && "150px")};

};
@media only screen and (max-width:450px){
    width:${(props)=>(props.mode==="small"  && "100%")};
    
}
 


`

const Image = styled.img`
width:100%;
height:100%;
height:${(props)=>(props.mode==="small"  && "150px")};
background-color:#999;
 
@media only screen and (max-width:450px){
    height:${(props)=>(props.mode==="small"  && "150px")};

};
`

const Detail = styled.div`    
display:flex;
margin-top:${(props)=>(props.mode==="small"  ? "0px" :"10px")};
gap:12px;
width:${(props)=>(props.mode==="small"  ? "100px" :"100%")};

@media only screen and (max-width:450px){
    width:${(props)=>(props.mode==="small"  && "100%" )};
    margin-left:${(props)=>(props.mode==="small"  ? "0px" :"10px")};
    margin-top:${(props)=>(props.mode==="small"  ? "10px" :"10px")};


};

`
const ChannelImage = styled.img`
background-color:#999;
width:36px;
height:36px;
border-radius:50%;
display:${(props)=>(props.mode === "small" && "none" )};
border:none;
@media only screen and (max-width:450px){
display:${(props)=>(props.mode === "small" && "block" )};
margin-top:20px;
}
`

const Text = styled.div`
margin-left:${(props)=>(props.mode === "small" && "10px" )};
display:${(props)=>(props.mode === "small" && "flex" )};
flex-direction:${(props)=>(props.mode === "small" && "column" )};
height:${(props)=>(props.mode === "small" && "100%" )};
width:${(props)=>(props.mode === "small" && "200%" )}


`
const Tital = styled.h1`
font-size:16px;
font-weight:500;
display:flex;
color:${({theme})=>theme.text};
width:${(props)=>(props.mode==="small"  ? "100%" :"100%")};
height:${(props)=>(props.mode==="small"  && "70px" )};
overflow-y:${(props)=>(props.mode==="small"  && "hidden")};
@media only screen and (max-width:450px){
height:${(props)=>(props.mode==="small"  && "30px" )};


}

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

const MoreOptionContainer = styled.div`
position:absolute;
margin-left:200px;
border:1px solid gray;
border-radius:10px;
padding:5px;
background-color:${({theme})=>theme.bg}

`
const MoreOptionWrapper = styled.div`
display:flex;
flex-direction:column;
gap:10px;
background-color:${({theme})=>theme.bg}
`
const MoreOptionElement = styled.div`
color:${({theme})=>theme.text};
border:1px solid gray;
border-radius:8px;
padding:10px;
cursor:pointer;


`


const Card = ({mode,video,page})=>{ 
    const [channel,setChannel] = useState({})
    const {currentVideo} = useSelector(state=>state.video)
    const [moreOption,setMoreOption] = useState(false)

    useEffect(()=>{
        const fetchVideos =  async ()=>{
            const res = await axios.get(`/api/users/find/${video.userId}`);
            setChannel(res.data)
        }
        fetchVideos();  
        
    },[video.userId])


     

    const countView = async ()=>{
        
        await axios.put(`/api/video/addview/${currentVideo._id}`) 
    }

    const deleteVideo = async ()=>{
        await axios.delete(`api/video/delete/${video._id}`)
        window.location.reload(true)
    }

    const updateVideo = async ()=>{
        
    }

    return(
            
            <Container mode={mode} onClick={countView}>
                <Link to={`/video/${video._id}`} style={{textDecoration:"none"  ,height: "280px" ,cursor:"unset"}} onClick={"location.reload(true)"}   >
                    <VideoImage mode={mode}><Image mode={mode} src= {video.imgUrl} alt="image"/></VideoImage>
                </Link>
                 
                <Detail mode={mode}>
                    <ChannelImage mode={mode} src= {channel.img}/>
                    <Text mode={mode}>
                        <Tital mode={mode}> {video.tital} { page ==="profile" && <MoreVertIcon style={{marginLeft:"280px",position:"absolute" , cursor:"pointer" }}  onClick={()=> moreOption === false? setMoreOption(true) : setMoreOption(false)}/> }</Tital>
                        
                            {moreOption && 
                            <>
                                <MoreOptionContainer >
                                    <MoreOptionWrapper   >
                                        <MoreOptionElement onClick={deleteVideo } > Delete video</MoreOptionElement>
                                        <MoreOptionElement onClick={updateVideo} > Update video</MoreOptionElement>
                                    </MoreOptionWrapper>
                                </MoreOptionContainer>
                            </>
                            }

                        <ChannelName mode={mode}>{ channel.name}</ChannelName>
                        <Info mode={mode}>{ video.views} views .  {format(video.createdAt)} </Info>
                    </Text>
                </Detail>
            </Container>
            
    )
}

export default Card