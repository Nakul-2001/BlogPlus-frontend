import React from 'react'
import {styled} from 'styled-components'
import Sidebar from '../Components/Sidebar'
import SingleBlog from '../Components/SingleBlog'


const Container = styled.div`
  display:flex;
`

const Blog = () => {
  return (
    <>
    <Container>
      <SingleBlog/>
      <Sidebar/>
    </Container>
    </>
  )
}


export default Blog
