import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div`

`
const NewComments = styled.div`
display:flex;
gap:20px;
align-items:center;

`
const Avatar = styled.img`
width:60px;
height:60px;
border-radius:50%;
margin-top:10px;

`
const Input = styled.input`
height:20px;
padding:10px;
border:none;
border-radius:2%;
border-bottom:1px solid ${({theme})=>theme.soft};
width:50%;
background-color:transparent;
outline:none;
color: ${({theme})=>theme.text}
`
const AddComment = styled.button`
width:60px;
height:30px;
border-radius:5%;
font-size:18px;
font-weight:500;
border:none;
cursor:pointer;

 
`

const Comments = ()=>{
    const [comment,setcomment] = useState("")
    const {currentVideo} = useSelector(state=>state.video)
    const {currentUser} = useSelector(state=>state.user)
    const currentUserId = currentUser._id
    const currentVideoId = currentVideo._id
    const [getAllComments, setGetAllComments] = useState([])
 
    const saveComment = async ()=>{
        const newComment = await axios.post("/api/users/comments",{comment,videoId:currentVideoId})
        const getComments = await axios.get(`/api/users/comments/${currentVideoId}`)
                setGetAllComments(getComments.data)
    }


    useEffect(()=>{
        const fetchComments = async()=>{
            try {
                const getComments = await axios.get(`/api/users/comments/${currentVideoId}`)
                setGetAllComments(getComments.data)

                 
            } catch (error) {
                
            }
        }

        fetchComments()
    },[currentVideoId])

    
    return(
        <Container>
            <NewComments>
                <Avatar src={currentUser.img}></Avatar>
                <Input placeholder="Enter Comments...." onChange={e=>setcomment(e.target.value)}></Input>
                <AddComment onClick={saveComment}>Add </AddComment>
            </NewComments>
             {getAllComments.map(data=>(<Comment data={data}/>))}
        </Container>
    )
}

export default Comments