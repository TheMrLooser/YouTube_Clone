import Card from "../components/Card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"


const Container = styled.div`
display:flex;
justify-content : center;
flex-Wrap:wrap;
background-color: ${({theme})=>theme.bg};
min-height:100vh;
padding-top:10px;
gap:10px;


`

const Home = ({type})=>{
    const [videos,setVideos] = useState([])

    useEffect(()=>{
        const fetchVideos =  async ()=>{
            if (type==="trend") {
            const res = await axios.get(`/api/video/new/${type}`);
            setVideos(res.data)
                 console.log("trending")
            }
            const res = await axios.get(`/api/video/${type}`);
            setVideos(res.data)
        }
        fetchVideos();  
        
    },[type])


    return(
    <Container>
         {videos.map(video => (<Card key={video._id} video={video}/>))}
         
    </Container>
    )
}

export default Home