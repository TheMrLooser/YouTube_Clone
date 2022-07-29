import React, { useState } from "react";
import  {  useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth,provider} from "../firebase";
import { signInWithPopup} from "firebase/auth"
import { async } from "@firebase/util";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  background-color:${({theme})=>theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width:30%;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const ButtonWrapper = styled.div`
  align-items:center;
  display:flex;
  gap:10px;
  border-radius:5px;
  padding:5px;
  cursor:pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`

const GoogleIcon = styled.img`
width:30px;
height:30px;
border-radius:50%;
border:none;

 
`

const SignIn = () => {

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const dispatch = useDispatch()

  const handleLogin = async (e)=>{
    dispatch(loginStart())
    try {
      const login = await axios.post("/api/users/signin",{name,password});
      dispatch(loginSuccess(login.data))
    } catch (error) {
      dispatch(loginFailure())
      
    }
     
  }

  const signInWithGoogle = async ()=>{
    dispatch(loginStart())
    signInWithPopup(auth,provider).then(async (result)=>{
      await axios.post("/api/users/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL,
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
      }).catch((error)=>{
         dispatch(loginFailure())
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
        <Input type="password" placeholder="password"  onChange={e=>setPassword(e.target.value)}/>
          <Button onClick={handleLogin}>Sign in</Button>
        <ButtonWrapper onClick={signInWithGoogle}>
          <GoogleIcon src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdrU73TrWVm9mDZeJGzBmzYWlxgpzGmQNel8oddZ6MeybWXRDA8eK&usqp=CAE&s"/>
          <h5>Login With Google</h5>
        </ButtonWrapper>
        <Title>  or</Title>
        <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;