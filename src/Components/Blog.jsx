import React from 'react'
import { Link } from 'react-router-dom'
import {styled} from 'styled-components'

const Container = styled.div`
  border-radius:2%;
  width:46%;
  margin:2vh 1.2vw;
  display:flex;
  flex-direction:column;
  gap:1vh;
`

const Photo = styled.img`
  width:100%;
  height:50vh;
  border-radius:2%;
`

const Categories = styled.div`
  width:100%;
  color:grey;
  text-align:center;
`

const Title = styled.h2`
  width:100%;
  padding:0 1vw;
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
`

const Time = styled.div`
  width:100%;
  color:grey;
  text-align:center;
`

const Desc = styled.div`
  width:100%;
  padding:0 1vw;
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:4;
  -webkit-box-orient:vertical;
`


const Blog = ({blog}) => {
  const PF = 'https://blogplus-backend.onrender.com/images/';
  return (
    <Container>
      <Photo src={PF+blog.photo} alt='img not found'></Photo>
      <Categories>{blog.category.map((c)=>(
        c+' '
      ))}</Categories>
      <Link to={`/blog/${blog._id}`} style={{color:'black',textDecoration:'none'}}><Title>{blog.title}</Title></Link>
      <Time>{new Date(blog.createdAt).toDateString()}</Time>
      <Desc>{blog.description}</Desc>
    </Container>
  )
}

export default Blog
