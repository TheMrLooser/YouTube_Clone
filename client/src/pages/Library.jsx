import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";


const Container = styled.div`
padding:10px;
background-color:${({theme})=>theme.bg};
min-height:100vh;

`
const Wrapper =styled.div`
`
const Hr = styled.hr`
border:1px solid ${({theme})=>theme.textSoft};

`
const Tital = styled.div`
color: white;
align-self:center;
display:flex;
align-items:center;
justify-content:center;
font-size:20px;
font-weight:600;
background-color:green;
border-radius:10px;
padding-left:10px ;
padding-right:10px ;
cursor:pointer;
`
const SavedVideoWrapper = styled.div`
padding-top:10px;
display:flex;
gap:20px;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`
const LikedVideoWrapper = styled.div`
padding-top:10px;
display:flex;
gap:20px;
flex-wrap:wrap;
align-items:center;
justify-content:center;
`
const VideoWrapper = styled.div`
padding-top:10px;
display:flex;
gap:20px;
`
const Video = styled.div`

`
const TitalWrapper = styled.div`
display:flex;
gap:10px;
margin-bottom:10px;
`

const Library = ()=>{

    const [videos,setVideos] = useState([])
    const {currentUser} = useSelector((state)=>state.user)
    
    useEffect(()=>{
        const fetchVideos =  async ()=>{
             
            const res = await axios.get(`/api/video/random`);
            setVideos(res.data)
        }
        fetchVideos(); 
        
    },[ ])


    const savedVideo = async () =>{
        const x = document.getElementById('savedVideo')
        const y = document.getElementById('likedVideo')
        const z = document.getElementById('likedVideoTital')
        const t = document.getElementById('savedVideoTital')
        x.style.display="block";
        y.style.display="none";
        z.style.backgroundColor="Green";
        t.style.backgroundColor="lightGreen";
    }
    const likedVideo = async () =>{
        const x = document.getElementById('savedVideo')
        const y = document.getElementById('likedVideo')
        const z = document.getElementById('likedVideoTital')
        const t = document.getElementById('savedVideoTital')
        x.style.display="none";
        y.style.display="block";
        z.style.backgroundColor="lightGreen";
        t.style.backgroundColor="Green";
        
    }
    return(<>

    <Container>
         <Wrapper>
            <TitalWrapper>
                <Tital onClick={savedVideo} id="savedVideoTital" style={{backgroundColor:"lightgreen"}}>Saved Video</Tital>
                <Tital onClick={likedVideo} id="likedVideoTital">Liked Video</Tital>
            </TitalWrapper>
            <Hr/>
            <VideoWrapper id="savedVideo">
                <SavedVideoWrapper> { videos.map(video =>currentUser.savedVideo.includes(video._id) && (<Card key={video._id} video={video}/>))}  </SavedVideoWrapper> 
            </VideoWrapper>
            <VideoWrapper id="likedVideo" style={{display:"none"}}>
                <LikedVideoWrapper> { videos.map(video =>currentUser.likedVideo.includes(video._id) && (<Card key={video._id} video={video}/>))} </LikedVideoWrapper>
            </VideoWrapper>
         </Wrapper>
    </Container>

    </>)
}


export default Library