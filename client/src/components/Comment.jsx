import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
display:flex;
margin-top:30px;
align-items:center;
gap:30px;
border:1px solid red;

`

const Avatar = styled.img`
width:60px;
height:60px;
border-radius:50%;
margin-top:10px;
`
const Text = styled.p`
    color: ${({theme})=>theme.text};
    width:100%;
    border:1px solid green;
     
`

const ChannelNmae = styled.h1`
    color :${({theme})=>theme.text};
    font-size:15px;
`
const Detail = styled.div`
width:100%;
border:1px solid blue;

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

const Comment = ()=>{
    
    return(
        <Container>
            <Avatar src="https://tse2.mm.bing.net/th?id=OIP.vt1bevOqmHU6DYGdq-6L9gHaEo&pid=Api&P=0&w=267&h=167"></Avatar>
            <Detail>
                <Detail_1>
                    <ChannelNmae>Luma mon</ChannelNmae>
                    <PostDate>2 day ago</PostDate>
                </Detail_1>
                <Text> this is my commnent </Text>
            </Detail>
            
        </Container>
    )
}


export default Comment