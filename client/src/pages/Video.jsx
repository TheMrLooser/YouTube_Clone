import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {fetchFailure, fetchStart, fetchSuccess} from "../redux/videoSlice.js"
import { format} from "timeago.js";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";






const Container = styled.div`
display:flex;
gap:24px;
background-color:${({theme})=>theme.bg};
@media only screen and (max-width:900px){
margin-left:50px;
}
@media only screen and (max-width:450px){
flex-direction:column;
justify-content:center;
align-items:center;
margin-left:0px;

}

`
const Content = styled.div`
flex:5;
padding:10px;

`
const VideoWrapper = styled.div`
@media only screen and (max-width:450px){
     if(offsetTop>300){
        margin-top:500px;
     }
     
}

`
const Tital = styled.h1`
font-size:18px;
font-weight:400;
color:${({theme})=>theme.text};
margin-top:7px;
margin-bottom:7px;


`
const Detail = styled.div`
display:flex;
align-items:center;
justify-content:space-between;


`
const Info = styled.span`
color:${({theme})=>theme.textSoft};
font-size:14px;


`
const Buttons = styled.div`
display:flex;
gap:15px;
color:${({theme})=>theme.text};
`
const Button = styled.div`
display:flex;
gap:5px;
cursor:pointer;

`
const Hr = styled.hr`
border:0.5px solid  #999;
margin: 10px 0px;

`

const Channel = styled.div`
display:flex;
justify-content:space-between;

`
const ChannelDetail = styled.div`
display:flex;
flex-direction:column;
margin-top:15px;
margin-left:20px;

`
const ChannelInfo = styled.div`
display:flex;


`
const Image = styled.img`
width:60px;
height:60px;
border-radius:50%;
margin-top:10px;

`
const Subscribe = styled.button`
    width:150px;
    height:30px;
    background-color: ${({type})=>type ==="Subscribe"? "red":"green"};
    border-radius:5px;
    cursor:pointer;
    font-size:20px;
    font-weight:500;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    margin-right:10px;
    border: none;

`
const ChannelNmae = styled.span`
color:${({theme})=>theme.text};
font-size:20px;

`
const ChannelCounter = styled.span`
color:${({theme})=>theme.textSoft};
font-size:15px;
margin:5px 0px;

`
const Description = styled.p`
color:${({theme})=>theme.textSoft};
font-size:15px;
margin:5px 0px;
`

const Recomdetion = styled.div`
flex:2;
padding-top:20px;

@media only screen and (max-width:450px){
    padding-top:0px;

}

`  

const Video = ({type})=>{
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=>state.user)
    const {currentVideo} = useSelector((state)=>state.video)
    const path = useLocation().pathname.split("/")[2]
    const [randomVideos,setRandomVideos] = useState([])
    const [channel,setChannel] = useState({})
    const [checkSubscribe,setcheckSubscribe] = useState("")
    const [likes,setLikes] = useState(0)
    const [dislikes,setDislikes] = useState(0)
    const [fromGoogle,setFromGoogle] = useState(false)

        useEffect(()=>{
           
            const fetchRandomvideo = async ()=>{
                try {
                    const getRandomVideo = await axios.get(`/api/video/${type}`);
                    setRandomVideos(getRandomVideo.data)
                } catch (error) {
                    console.log(error)
                }
               
            }

            const fetchVideos = async ()=>{
         
                dispatch(fetchStart())
                try {
                    const getVideo = await axios.get(`/api/video/${path}`)
                    const getChannel = await axios.get(`/api/users/find/${getVideo.data.userId}`);
                    setChannel(getChannel.data)
                    dispatch(fetchSuccess(getVideo.data))
                    
                    
                    const check  = getChannel.data.subscribedUser.includes(currentUser._id)
                    if(check){
                        setcheckSubscribe("Unsubscribe")
                    }else{
                        setcheckSubscribe("Subscribe")
                    }
                    setLikes(getVideo.data.likes.length)
                    setDislikes(getVideo.data.dislikes.length)
                 
                } catch (error) {
                    dispatch(fetchFailure())
                    
                    
                }
        
                }



                

        
                fetchVideos()
            

                fetchRandomvideo()
        },[type , dispatch])


        

        // const fetchVideos = async ()=>{
                
        // dispatch(fetchStart())
        // try {
        //     const getVideo = await axios.get(`/api/video/${path}`)
        //     const getChannel = await axios.get(`/api/users/find/${getVideo.data.userId}`);
        //     setChannel(getChannel.data)
        //     dispatch(fetchSuccess(getVideo.data))
        // } catch (error) {
        //     dispatch(fetchFailure())
        // }

        // }

        // fetchVideos()
   


    const subscribe = async ()=>{
         const userId = currentVideo.userId
         
        const data = await axios.put(`/api/video/subscribe/${userId}`)
        .catch(function(error){
            if(error ){
                console.log(error.response.data.message)
            }
        })
          
         setcheckSubscribe(data.data)
         
    }

    const addLike = async ()=>{
        const videoId = currentVideo._id
        const data = await axios.put(`/api/users/like/${videoId}`).catch(function(error){
            if(error){
                console.log(error.response.data.message)
            }
        })
        const Video = await axios.get(`/api/video/${videoId}`)

        setLikes(Video.data.likes.length)
        setDislikes(Video.data.dislikes.length)
    }
    const addDislike = async ()=>{

        const videoId = currentVideo._id
        const data = await axios.put(`/api/users/dislike/${videoId}`).catch(function(error){
            if(error){
                console.log(error.response.data.message)
            }
        })
        const Video = await axios.get(`/api/video/${videoId}`)
        setLikes(Video.data.likes.length)
        setDislikes(Video.data.dislikes.length)
 
          
    }
     

    const saveVideo = async ()=>{
        const videoId = currentVideo._id
       const save =  await axios.put(`/api/users/save/${videoId}`) 
    }


 
    
    return( 
        <Container>
            <Content>
               <VideoWrapper id="videoConte">
                     <video src={currentVideo.videoUrl}  style={{width:"100%" }} controls>
                        
                        
   
                    </video>
                            
               </VideoWrapper>
               <Tital>{currentVideo.tital}</Tital>
               <Detail>
                    <Info>{ currentVideo.views} views . { format(currentVideo.createdAt)}</Info>
                    <Buttons>
                        <Button onClick={addLike}> {currentVideo.likes.includes(currentUser._id) ? <ThumbUpIcon/>:<ThumbUpOffAltIcon/>} {likes} </Button>
                        <Button onClick={addDislike}> {currentVideo.dislikes.includes(currentUser._id) ? <ThumbDownIcon/> :<ThumbDownOffAltIcon/> } { dislikes} </Button>
                        <Button >  <ReplyIcon/>Share </Button>
                        <Button onClick={saveVideo}>  <AddTaskOutlinedIcon  /> {currentUser.savedVideo.includes(currentVideo._id) ? "Saved":"Save"} </Button>
                    </Buttons>
               </Detail>
               <Hr/>
               <Channel>
                    <ChannelInfo>
                        <Image src={channel.img}></Image>
                        <ChannelDetail>
                            <ChannelNmae>{channel.name}</ChannelNmae>
                            <ChannelCounter>{ channel.subscribers} Subscribers</ChannelCounter>
                            <Description>{ currentVideo.desc} </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={subscribe} type={checkSubscribe} >{checkSubscribe}</Subscribe>
               </Channel>
               <Hr/>
               <Comments/>
            </Content>
            <Recomdetion>
                    {randomVideos.map(video => (<Card key={video._id} video={video} mode="small"/>))}
                
                
            </Recomdetion>
        </Container>
    )
}

export default Video