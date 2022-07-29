import React, { useState } from "react";
import styled from "styled-components"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import axios from "axios";
import { render } from "react-dom";
import Home from "../pages/Home.jsx"
import Upload from "./Upload.jsx";

const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme})=>theme.bgLighter};
height:56px;
@media only screen and (max-width:450px){
margin-bottom:40px;
}

`
const Wrapper = styled.div`
display:flex;
align-items:center;
height:100%;
padding:0px 20px;
justify-content:flex-end;
position:relative;


`
const Search = styled.div`
width:60%;
position:absolute;
left:-200px;
right:0px;
padding-right:10px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between; 
border:1px solid #ccc;
cursor:pointer;
border:1px solid ${({theme})=>theme.soft};
color:${({theme})=>theme.textSoft };
@media only screen and (max-width:1200px){
     left:0px;
     position:absolute;
     left:0px;
     margin-left:80px;
     width:60%;
}
@media only screen and (max-width:450px){
    width:90%;
    margin-left:10px;
    
}
`
const Input = styled.input`
display:flex;
align-items:center;
background-color:transparent;
border:0.5px solid ${({theme})=>theme.soft};
color: ${({ theme }) => theme.text};
padding:10px;
width:90%;
outline-color:blue;
@media only screen and (max-width:1200px){
width:90%;
      
}

`
 

const Button = styled.button`
padding:5px 15px;
background-color:transparent;
border:1px solid blue;
color:blue;
margin-right:10px;
font-weight:500;
border-radius:3px;
display:flex;
align-items:center;
gap:10px;
cursor:pointer;

`
const User = styled.div`
 display:flex;
 gap:30px;
 color:${({theme})=>theme.text};
align-items:center;
 
@media only screen and (max-width:800px){
    gap:50px;
 
      
}
@media only screen and (max-width:450px){
    position:fixed;
    border:1px solid lightslategrey;
    bottom:0px;
    width:99.258%;
    height:50px;
    right:0px;
    ${'' /* left:0px; */}
    justify-content:center;
    background-color:${({theme})=>theme.bg}; 
    
    
}
`
const Avatar = styled.img`
width:30px;
height:30px;
border-radius:50%;
cursor:pointer;
border:none;
position:absolute;
@media only screen and (max-width:450px){
     
     position:fixed;
     right:10px;
}
`

const AccountWrapper = styled.div`
 
 
display:flex;
align-items:center;
justify-content:center;
position:relative;
 


`

const Account = styled.div`
width:250px;
margin-top:280px;
height:200px;
position:absolute;
background-color:${({theme})=>theme.bg};
border-radius:10px;
margin-right:220px;

`
const AccountElementWrapper = styled.div`
 display:flex;
 align-items: flex-start;
 flex-direction:column;
 justify-content:center;
 gap:15px;
padding:20px;
color:${({theme})=>theme.text};
`
  
const ProfileElement = styled.div`
border:1px solid green;
width: 210px;
display:flex;
align-items:center;
justify-content:center;
background-color:${({theme})=>theme.bgLighter};
height:30px;
border-radius:5px;
color:${({theme})=>theme.text};
cursor:pointer;
&:hover{
background-color:${({theme})=>theme.soft};

}
`

const Hr = styled.hr`
width:100%;
border: 0.5px solid ${({theme})=>theme.textSoft};
 
`
 

const Navbar = ()=>{
    

    const [open,setOpen] = useState(false)
    const [openAccount,setOpenAccount] = useState(false)
    const [q,setQ] = useState("")

    const {currentUser} = useSelector(state=>state.user)
     

    const logout = async ()=>{
           
        await axios.get(`/api/users/logout/${currentUser._id}`,{id:currentUser._id})
        console.log("logouted")
        
        
    }
     
    
    
    
    return(
         <> 
            
           <Container>
                   
                 <Wrapper>
                     

                    <Search>
                        <Input placeholder="Search here..." onChange={e=>setQ(e.target.value)}/>
                        <SearchOutlinedIcon />
                    </Search>
                    {

                       currentUser? ( 
                        <User>
                            <VideoCallOutlinedIcon onClick={ ()=>{setOpen(true)}}/>
                            <AccountWrapper>
                                <Avatar  src={currentUser.img ? currentUser.img : "data:image/png;base64,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" } onClick={()=>setOpenAccount(true)} onMouseEnter={()=>setOpenAccount(false)} />
                               
                               { openAccount && 
                                <Account  id="account" >
                                    <AccountElementWrapper>
                                        <Link to={'/profile'} style={{textDecoration:"none",color:"inherit"}}> <ProfileElement onClick={()=>setOpenAccount(false)}>Check Profile</ProfileElement></Link>
                                        <Hr/>
                                        <ProfileElement >UserName : {currentUser.name}</ProfileElement>
                                        {/* <UserEmail>{currentUser.email}</UserEmail> */}
                                        <ProfileElement onClick={logout && (()=>setOpenAccount(false))}>Logout</ProfileElement>
                                    </AccountElementWrapper>
                                </Account>
                               }
                            </AccountWrapper>

                            {window.innerWidth >= 950 && currentUser.name}
                        </User>
                       ) : <Link to={'/signin'} style={{textDecoration:"none"}}><Button><AccountCircleOutlinedIcon/>SIGN IN</Button></Link>
                    } 
                     
                 </Wrapper>
           </Container>

           {open && <Upload setOpen={setOpen}/>}
         </>
    )
}

export default Navbar