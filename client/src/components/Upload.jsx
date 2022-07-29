import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:rgba(0, 0, 0, 0.724);
display:flex;
justify-content:center;



`
const Wrapper = styled.div`
border:1px solid green;
width:50%;
background-color:rgb(28, 28, 30);
display:flex;
flex-direction:column;
position:relative;
@media only screen and (max-width:450px){
    width:100%
}
`
const Close = styled.h1`
color:white;
position:absolute;
right:10px;
top:10px;
cursor:pointer;



`
const Title = styled.div`
color:white;
text-align:center;
margin-top:20px;
font-size:25px;
margin-bottom:80px;
@media only screen and (max-width:450px){
margin-bottom:0px;
     
}

`
const Input =styled.input`
border:1px solid ${({theme})=>theme.soft};
margin-top:${(props)=>(props.type === "file" ? "0" :"30px")};
width:${(props)=>(props.type === "file" ? "":"90%" )};
background-color:${({theme})=>theme.bg};
align-self:center;
color:white;
padding:10px;
border-radius:10px;
opacity:${(props)=>(props.type === "file" && "1" )};

::-webkit-file-upload-button {
  visibility: hidden;
}

::before{
    content:" ";
}
`

const Lable = styled.label`
border:1px solid ${({theme})=>theme.soft};
margin-top:30px;
width:90%;
background-color:${({theme})=>theme.bg};
align-self:center;
color:white;
padding-left:10px;
border-radius:10px;
display:flex;
align-items:center;
gap:40px;
`

const Desc =styled.textarea`
border:1px solid ${({theme})=>theme.soft};
margin-top:30px;
width:90%;
background-color:${({theme})=>theme.bg};
align-self:center;
color:white;
padding:10px;
border-radius:10px;

`
const Button = styled.button`
width: 92%;
height:50px;
margin-top:50px;
align-self:center;
font-size:30px;
font-weight:600;
border-radius:10px;
cursor:pointer;
`
const H3 = styled.h3`
border:1px solid ${({theme})=>theme.soft};
margin-top:30px;
width:90%;
background-color:${({theme})=>theme.bg};
align-self:center;
color:white;
padding:10px;
border-radius:10px;
`

const Upload = ({setOpen})=>{
    const [img,setImg] = useState(undefined)
    const [video,setVideo] = useState(undefined)
    const [imageProce,setImageProce] = useState(0)
    const [videoproce,setVideProce] = useState(0)
    const [inputs,setInputs] = useState({})
    const nevigate = useNavigate()
    const [tags,setTags] = useState([])

    const handaleTags = (e)=>{
        setTags(e.target.value.split(","))
    }
    const handaleChange = (e)=>{
        setInputs((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const uploadFile = (file,urlType)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime()  + file.name;
        const storageRef = ref(storage,  fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

      
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             urlType==="imgUrl" ? setImageProce(Math.round(progress)):setVideProce(Math.round(progress))
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                break;
            }
        }, 
        (error) => {},
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev)=>{
                    return {...prev, [urlType]: downloadURL}
                })
            });
          }
        )
    }
    useEffect(()=>{
       video&& uploadFile(video , 'videoUrl')
    },[video])
    useEffect(()=>{
       img && uploadFile(img , 'imgUrl')
    },[img])


    const handaleUpload =async ()=>{
        const res = await axios.post("/api/video",{...inputs,tags})
        setOpen(false);
        res.status===200 &&  nevigate("/")

    }

    return(
        <>
            <Container>
                <Wrapper>
                    <Close onClick={()=>{setOpen(false)}}>X</Close>
                    <Title>Upload a new Video</Title>
                    {
                        videoproce>0 ?(<H3>{"Uploading:"+videoproce+"%"}</H3>) : <> <Lable>Select Video  <Input  contentType={'video'} type={"file"} accept="video/*" onChange={e=>setVideo(e.target.files[0])}/>  </Lable></>
                    }
                    <Input type={"text"} placeholder="Title" name="tital" onChange={handaleChange}/>
                    <Desc placeholder="Video Description.." name="desc" rows={8} onChange={handaleChange}/>
                    <Input type={"text"} placeholder="Tags" onChange={handaleTags}/>
                    {
                      imageProce>0 ? (<H3>{"Uploading:"+imageProce+"%"}</H3>) :    <> <Lable>Select Thumbnails  <Input type={"file"} accept="image/*" onChange={e=>setImg(e.target.files[0])}/> </Lable></>
                    }
                    <Button onClick={handaleUpload}>Upload</Button>
                </Wrapper>
            </Container>
        </>
    )
}

export default Upload