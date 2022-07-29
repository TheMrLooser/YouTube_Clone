import React from "react";
import styled from "styled-components"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import {useSelector} from "react-redux";
 

const Container = styled.div`
    flex:1;
    background-color:${({theme})=>theme.bg};
    height:100vh;
    color:${({theme})=>theme.text};
    position:sticky;
    top:0px

`
const Wrapper = styled.div`
padding-left:30px; 
padding-top:10px;

`
const Logo = styled.div`
padding-bottom:30px;
font-weight:800;
display:flex;
gap:10px;


`
const Item = styled.div`
display:flex;
align-items:center;
gap:20px;
cursor:pointer;
margin-bottom:10px;
&:hover{
    background-color:${({theme})=>theme.soft};
    
}


`
const Hr = styled.hr`
border:0.5px solid #323232;
margin-top:15px;
margin-right:15px;
margin-bottom:15px;

`

const Login = styled.div`
display:flex;
flex-direction:column;

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
const MenuLogo = styled.div`
`

const Menu = ({darkMode,setDarkMode  })=>{
    const setShowMenu = ()=>{
          
         let x = document.getElementById("menuContainer");
         if (x.style.display==="none") {
            x.style.display="block"
         }
         else{
            x.style.display="none"
         }
    }



    const {currentUser} = useSelector(state=>state.user)

    return( <>
            
            <Container id="menuContainer">
                <Wrapper>
                    
                <Logo>
                    <div onClick={()=>setShowMenu()}><MenuOutlinedIcon style={{cursor:"pointer"}} /></div>
                    <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
                    Humper Tube
                    </Link>
                </Logo>
                
                    <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}><Item> <HomeOutlinedIcon/>Home </Item></Link>
                    <Link to={'/trends'} style={{textDecoration:"none",color:"inherit"}}><Item> <ExploreOutlinedIcon/>Explore </Item></Link>
                    <Link to={'/subscribed'} style={{textDecoration:"none",color:"inherit"}}><Item> <SubscriptionsOutlinedIcon/>Subscribe </Item></Link>
                    <Hr/>
                    <Item> <VideoLibraryOutlinedIcon/>Library </Item>
                    <Item> <HistoryOutlinedIcon/>History </Item>
                    <Hr/>

                    {   
                        !currentUser &&
                        <>
                            <Login>
                                Sign in to like video,comment and subscribe.
                                <Link to={'/signin'} style={{textDecoration:"none"}}><Button><AccountCircleOutlinedIcon/>SIGN IN</Button></Link>
                            </Login>
                            <Hr/>
                        </>
                    }
                    <Item> <LibraryMusicOutlinedIcon/>Music </Item>
                    <Item> <SportsBasketballOutlinedIcon/>Sports </Item>
                    <Item> <SportsEsportsOutlinedIcon/>Gamings </Item>
                    <Item> <MovieOutlinedIcon/>Movies </Item>
                    <Item> <ArticleOutlinedIcon/>News </Item>
                    <Item> <LiveTvOutlinedIcon/>Live </Item>
                    <Hr/>
                    <Item> <SettingsOutlinedIcon/>Settings </Item>
                    <Item> <ReportOutlinedIcon/>Report </Item>
                    <Item> <HelpOutlineOutlinedIcon/>Help </Item>
                    <Item onClick={()=>setDarkMode(!darkMode)}> {darkMode? <DarkModeIcon/>:<WbSunnyOutlinedIcon/>}  {darkMode?"Dark Mode":"Light Mode"} </Item>

                </Wrapper>
            </Container>
         
    </>)
}

export default Menu