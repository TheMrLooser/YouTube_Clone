import React, { useState } from "react";
import styled from "styled-components";



const Container = styled.div`

`
const Wrapper = styled.div`

`

const Search = ()=>{
     const [videos , setVideos] = useState([])
    return(
        <>
            <Container>
                <Wrapper>
                    hello search
                </Wrapper>
            </Container>
        </>
    )
}


export default Search