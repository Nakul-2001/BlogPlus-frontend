import React from 'react'
import {styled} from 'styled-components'

const Container = styled.div`
  margin-top:8vh;
`

const Heading = styled.div`
  text-align:center;
  font-size:13vmin;
  font-family:'Lora',serif;
  font-weight:normal;
  position:absolute;
  top:10%;
  left:42%;
`

const Image = styled.img`
  width:100%;
  height:100vh;
  
  z-index:-1;
`

const Header = () => {
  return (
    <Container>
      <Heading>
        Blogs
      </Heading>
      <Image src='https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'>
      </Image>
    </Container>
  )
}

export default Header
