import React from 'react'
import {styled} from 'styled-components'
import Blog from './Blog'


const Container = styled.div`
  width:75%;
  display:flex;
  flex-wrap:wrap;
  padding:3vh 1vw;
`

const Blogs = ({blogs}) => {
  return (
    <Container>
        {blogs.length > 0 ? blogs.map((blog)=>(
          <Blog blog={blog} key={blog._id}></Blog>
        )) : <h3 style={{textAlign:'center',width:'100%'}}>No Result</h3>}
    </Container>
  )
}

export default Blogs
