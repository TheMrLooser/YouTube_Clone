import React from "react";
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

const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme})=>theme.bgLighter};
height:56px;

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
width:40%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between; 
border:1px solid #ccc;
cursor:pointer;
border:1px solid ${({theme})=>theme.soft};
color:${({theme})=>theme.textSoft }

`
const Input = styled.input`
display:flex;
align-items:center;
background-color:transparent;
border:0.5px solid ${({theme})=>theme.soft};
color: ${({ theme }) => theme.text};
padding:10px;
width:80%;
outline-color:blue;

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
`
const Avatar = styled.img`
width:30px;
height:30px;
border-radius:50%;
cursor:pointer;
border:none;
position:absolute;


`

const AccountWrapper = styled.div`
 
height:100px;
width:50px;
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
display:none;
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
// const Logo = styled.div`
// padding-bottom:30px;
// font-weight:800;
// display:flex;
// gap:10px;
// left:10px;
// position:absolute;
// color:${({theme})=>theme.text};
// margin-top:20px;

// `

const Navbar = ()=>{
    // const showMenu =()=>{
    //     let x  = document.getElementsByClassName("logoItems")
    //     if (x.style.display==="none") {
    //         x.style.display="block"
    //      }
    //      else{
    //         x.style.display="none"
    //      }
    // }
   

    const {currentUser} = useSelector(state=>state.user)
    const showAccounts = ()=>{
        let x = document.getElementById("account");
        if (x.style.display==="none") {
           x.style.display="block"
        }
        else{
           x.style.display="none"
        }
    }

    const logout = async ()=>{
           
        await axios.get(`/api/users/logout/${currentUser._id}`,{id:currentUser._id})
        console.log("logouted")
        
        
    }
    
    return(
         <> 
            
           <Container>
                   
                 <Wrapper>
                    {/* <Logo id="logo">
                         <span onClick={()=>showMenu()} className="logoItems"><MenuOutlinedIcon style={{cursor:"pointer"}}/> </span>
                        <Link to={'/'} style={{textDecoration:"none",color:"inherit"}} className="logoItems">
                        Humper Tube
                        </Link>
                    </Logo> */}

                    <Search>
                        <Input placeholder="Search here..." />
                        <SearchOutlinedIcon/>
                    </Search>
                    {

                       currentUser? ( 
                        <User>
                            <VideoCallOutlinedIcon/>
                            <AccountWrapper>
                                <Avatar src={currentUser.img} onClick={showAccounts}  />
                                <Account id="account">
                                    <AccountElementWrapper>
                                        <ProfileElement>Check Profile</ProfileElement>
                                        <Hr/>
                                        <ProfileElement>UserName : {currentUser.name}</ProfileElement>
                                        {/* <UserEmail>{currentUser.email}</UserEmail> */}
                                        <ProfileElement onClick={logout}>Logout</ProfileElement>
                                    </AccountElementWrapper>
                                </Account>
                            </AccountWrapper>
                            {currentUser.name}
                        </User>
                       ) : <Link to={'/signin'} style={{textDecoration:"none"}}><Button><AccountCircleOutlinedIcon/>SIGN IN</Button></Link>
                    } 
                     
                 </Wrapper>
           </Container>
         </>
    )
}

export default Navbar