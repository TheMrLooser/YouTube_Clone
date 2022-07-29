import axios from "axios";
import React, { useEffect ,useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format} from "timeago.js";

const Container = styled.div`
display:flex;
margin-top:30px;
align-items:center;
gap:30px;

`

const Avatar = styled.img`
width:60px;
height:60px;
border-radius:50%;
margin-top:10px;
border:none;
`
const Text = styled.p`
    color: ${({theme})=>theme.text};
    width:100%;
     
`

const ChannelNmae = styled.h1`
    color :${({theme})=>theme.text};
    font-size:15px;
`
const Detail = styled.div`
width:100%;

`
const Detail_1 = styled.div`
display:flex;
gap:10px; 
align-items:center;
`
const PostDate = styled.p`
    color:${({theme})=>theme.text};
    font-size:12px
`

const Comment =   ({data})=>{
    const [userName,setUserName] = useState("")
    const [userImg,setUserImg] = useState("")
    useEffect(()=>{
        const fetchUser = async ()=>{
            const userId = data.userId
             const userData = await axios.get(`/api/users/find/${userId}`)
            setUserImg(userData.data.img)
            setUserName(userData.data.name)
         
        }

        fetchUser()
    },[data])
    return(
        <Container>
            <Avatar src= {userImg}></Avatar>
            <Detail>
                <Detail_1>
                    <ChannelNmae>{ userName}</ChannelNmae>
                    <PostDate>{ format(data.createdAt)}</PostDate>
                </Detail_1>
                <Text> { data.comment} </Text>
            </Detail>
            
        </Container>
    )
}


export default Comment