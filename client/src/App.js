import React from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import styled, { ThemeProvider } from "styled-components"
import { darkTheme,   hideMenuMode, lightTheme ,  showMenuMode } from "./utils/Theme";
import { useState } from "react";
import Home from "./pages/Home";
import {BrowserRouter , Route,Routes} from "react-router-dom"
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Subscribed from "./pages/Subscribed";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const Container = styled.div`
display: flex;  
 
`
const Main = styled.div`
flex:7;

`
const Wrapper = styled.div`
`
 

function App() {

  const [darkMode,setDarkMode] = useState(true)

  return ( 
       <ThemeProvider theme={ darkMode?darkTheme:lightTheme  }  >
          <Container> 
            <BrowserRouter>
              <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
              <Main>
                  <Navbar/>
                  <Wrapper>
                      
                      <Routes>
                        <Route path="/"> 
                          <Route index element={<Home type="random"/>} />  
                          <Route path="trends" element={<Home type="trend"/>} />  
                          <Route path="subscribed" element={<Subscribed  />} />  
                          <Route index path="signin" element={<SignIn/>} />  
                          <Route path="video">
                            <Route path=":id"  element  ={<Video type="random" />} />
                          </Route>
                          <Route path="library" element={<Library/>}>  </Route>
                          <Route path="profile" element={<Profile/>}>  </Route>
                          <Route path="search" element={<Search/>}></Route>
                        </Route>
                      </Routes>
                  </Wrapper>
              </Main>
            </BrowserRouter>
          </Container>
      </ThemeProvider>
 
  );
}

export default App;
