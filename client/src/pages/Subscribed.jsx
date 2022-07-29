import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"
import { useSelector } from "react-redux";


const Container = styled.div`
display:flex;
gap:10px;
flex-wrap:wrap;
justify-content:center;
padding-top:10px;
background-color:${({theme})=>theme.bg};
min-height:100vh;
`


const Subscribed = ()=>{
    const [videos,setVideos] = useState([])
    const {currentUser} = useSelector((state)=>state.user)
    
    useEffect(()=>{
        const fetchVideos =  async ()=>{
             
            const res = await axios.get(`/api/video/random`);
            setVideos(res.data)
        }
        fetchVideos(); 
        
    },[ ])

     
   return(<>

        <Container>

            {videos.map(video =>currentUser.subscribedChannels.includes(video.userId) && (<Card key={video._id} video={video}/>))}

         
        </Container>

   </>)
}


export default Subscribed