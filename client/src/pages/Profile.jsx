import { style } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";



const Container = styled.div`
min-height:100vh;
background-color:${({theme})=>theme.bg};
@media only screen and (max-width:900px){
    margin-left:50px;
}
@media only screen and (max-width:450px){
    margin-left:0px;
}
`
const MainWrapper = styled.div`
min-height:100vh

`
const HeadingNavWrapper = styled.div`
display:flex;
gap:10px;
padding:10px;
`
const HeadingElement = styled.div`
padding:5px;
background-color:green;
border-radius:10px;
color:white;
cursor:pointer

`
const Hr = styled.hr`

`
const Wrapper = styled.div`

`
const ChannelDetails = styled.div`
 display:flex;
 gap:10px;
 flex-wrap:wrap;
 justify-content:center;
 padding-top:30px
`
const ProfileDetails = styled.div`
display:flex;
align-items:center;
@media only screen and (max-width:450px){
    justify-content:center;

}

`
const ProfileDetailsWrapper = styled.div`
height:80vh;
color:${({theme})=>theme.text};
padding:10px;
display:flex;
flex-direction:column;
gap:10px;

`
const UserName = styled.div`
border:1px solid gray;
padding:5px;
border-radius:10px;

`
const UserImg = styled.img`
width:60px;
align-self:center;
border-radius:10px;
`
const TotalVideos = styled.div`
border:1px solid gray;
padding:5px;
border-radius:10px;
`
const TotalViews= styled.div`
border:1px solid gray;
padding:5px;
border-radius:10px;
`
const TotalSubscribers = styled.div`
border:1px solid gray;
padding:5px;
border-radius:10px;
`
const TotalLikes = styled.div`
border:1px solid gray;
padding:5px;
border-radius:10px;
`




const Profile = ()=>{


    const {currentUser} = useSelector((state)=>state.user)
    const [videos,setVideos] = useState([])
    const [showChannelDetail , setShowChannelDettail] = useState(true)
    const [showAccountDetail , setShowAccountDettail] = useState(false)


    useEffect(()=>{
        const fetchVideos =  async ()=>{
             
            const res = await axios.get(`/api/video/random`);
            setVideos(res.data)
        }
        fetchVideos(); 
        
    },[ ])

    const channelDetailTitle = ()=>{
        const x = document.getElementById('channelDetail')
        const y = document.getElementById('accountDetail')
        y.style.backgroundColor="Green"
        x.style.backgroundColor="lightGreen"
        setShowAccountDettail(false)
        setShowChannelDettail(true)

    }
    const accountDetailTitle = ()=>{
        const x = document.getElementById('accountDetail')
        const y = document.getElementById('channelDetail')
        x.style.backgroundColor="lightGreen"
        y.style.backgroundColor="Green"
        setShowChannelDettail(false)
        setShowAccountDettail(true)
    }

    var TotalVideosPosted = 0;
    var TotalLikesCount = 0;
    var TotalViewsCount = 0;
    videos.map(video =>currentUser._id === video.userId && (TotalVideosPosted += 1))
    videos.map(video =>currentUser._id === video.userId && (TotalLikesCount +=  video.likes.length))
    videos.map(video =>currentUser._id === video.userId && (TotalViewsCount +=  video.views))

    return(
        <>
            <Container>
                <MainWrapper>
                    <HeadingNavWrapper>
                        <HeadingElement id="accountDetail" onClick={accountDetailTitle}>Account Detail</HeadingElement>
                        <HeadingElement id="channelDetail" onClick={channelDetailTitle} style={{backgroundColor:"lightgreen"}}>Channel Detail</HeadingElement>
                    </HeadingNavWrapper>
                    <Hr/>
                    <Wrapper>

                    {
                        showChannelDetail && <ChannelDetails>
                            { videos.map(video =>currentUser._id === video.userId && (<Card key={video._id} video={video} page={'profile'}  />))}
                        </ChannelDetails>
                    }

                    {
                        showAccountDetail &&  
                        <ProfileDetails>  
                                <ProfileDetailsWrapper>
                                    <UserImg src={currentUser.img}/>
                                    <hr/>
                                    <UserName>User Name : {currentUser.name}</UserName>
                                    <TotalSubscribers>Total Subscribers : {currentUser.subscribers}</TotalSubscribers>
                                    <TotalVideos>Total Videos : {TotalVideosPosted} </TotalVideos>
                                    <TotalLikes>Total Likes : {TotalLikesCount}</TotalLikes>
                                    <TotalViews>Total Views : { TotalViewsCount}</TotalViews>
                                </ProfileDetailsWrapper>
                        </ProfileDetails>
                    }  
                       
                    </Wrapper>
                </MainWrapper>
            </Container>
            
        </>
    )
}

export default Profile;