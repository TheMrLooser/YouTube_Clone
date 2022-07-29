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
import "../style/mobileMenu.css"
import {useSelector} from "react-redux";
 

const Container = styled.div`
    flex:1;
    background-color:${({theme})=>theme.bg};
    height:100vh;
    color:${({theme})=>theme.text};
    position:sticky;
    top:0px;
    @media only screen and (max-width:900px){
     width:50px;
     position:fixed;
    
    }
    @media only screen and (max-width:450px){
        
    
    }

`
const Wrapper = styled.div`
padding-left:30px; 
padding-top:10px;
@media only screen and (max-width:900px){
    padding-left:10px; 


    }

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
@media only screen and (max-width:450px){
     display:none;
}
`

const Login = styled.div`
display:flex;
flex-direction:column;
@media only screen and (max-width:900px){
     display:none;
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
const MenuLogo = styled.div`
`
const Text  = styled.span`
@media only screen and (max-width:900px){
    display:none;
     
}

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


    const setbackground = ()=>{
        
    }


    const {currentUser} = useSelector(state=>state.user)

    return( <>
            
            <Container id="mainContainer">
                <Wrapper id="menuContainer">
                    
                <Logo id="logo" className="dispNone">
                    <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
                    Humper Tube
                    </Link>
                </Logo>
                
                    <Link to={'/'} style={{textDecoration:"none",color:"inherit"}} onClick={setbackground}><Item id="home"> <HomeOutlinedIcon/><Text>Home</Text> </Item></Link>
                    <Link to={'/trends'} style={{textDecoration:"none",color:"inherit"}}><Item id="explere"> <ExploreOutlinedIcon/><Text>Explore</Text> </Item></Link>
                    <Link to={'/subscribed'} style={{textDecoration:"none",color:"inherit"}}><Item id="sub"> <SubscriptionsOutlinedIcon/><Text>Subscribe</Text> </Item></Link>
                    <Hr className="dispNone"/>
                   <Link to={'/library'} style={{textDecoration:"none",color:"inherit"}}> <Item id="library"> <VideoLibraryOutlinedIcon/><Text>Library</Text> </Item> </Link>
                    <Item id="history" className="dispNone"> <HistoryOutlinedIcon/><Text>History</Text> </Item>
                    <Hr id="hr" className="dispNone"/>

                    {/* {    */}
                        {/* !currentUser && */}
                        {/* <> */}
                            <Login>
                                Sign in to like video,comment and subscribe.
                                <Link to={'/signin'} style={{textDecoration:"none"}}><Button><AccountCircleOutlinedIcon/><Text>SIGN IN</Text></Button></Link>
                            </Login>
                            <Hr/>
                        {/* </> */}
                    {/* } */}
                    <Item id="music"> <LibraryMusicOutlinedIcon/><Text>Music</Text> </Item>
                    <Item id="sport" className="dispNone"> <SportsBasketballOutlinedIcon/><Text>Sports</Text> </Item>
                    <Item id="game" className="dispNone"> <SportsEsportsOutlinedIcon/><Text>Gamings</Text> </Item>
                    <Item id="movie" className="dispNone"> <MovieOutlinedIcon/><Text>Movies</Text> </Item>
                    <Item id="news" className="dispNone"> <ArticleOutlinedIcon/><Text>News</Text> </Item>
                    <Item id="live" className="dispNone"> <LiveTvOutlinedIcon/><Text>Live</Text> </Item>
                    <Hr id="hr" className="dispNone"/>
                    <Item id="setting" > <SettingsOutlinedIcon/><Text>Settings</Text> </Item>
                    <Item id="report" className="dispNone"> <ReportOutlinedIcon/><Text>Report</Text> </Item>
                    <Item id="help" className="dispNone"> <HelpOutlineOutlinedIcon/><Text>Help</Text> </Item>
                    <Item id="mode" onClick={()=>setDarkMode(!darkMode)}> {darkMode? <DarkModeIcon/>:<WbSunnyOutlinedIcon/>}  {darkMode?<Text>Dark Mode</Text>:<Text>Light Mode</Text>} </Item>

                </Wrapper>
            </Container>
         
    </>)
}

export default Menu