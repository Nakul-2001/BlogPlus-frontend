import React, { useState,useEffect } from 'react'
import Sidebar from './Sidebar'
import Blogs from './Blogs'
import {styled} from 'styled-components'
import axios from 'axios';
import { useLocation } from 'react-router';

const Container = styled.div`
  display:flex;
`

const Body = () => {

  const [bolgs,setBlogs] = useState([]);
  const {search} = useLocation();

  useEffect(()=>{
    const getBlogs = async () => {
      const res = await axios.get(`http://localhost:3000/api/blog/${search}`);
      setBlogs(res.data);
      console.log(res);
    }
    getBlogs();
  },[search]);

  return (
    <Container>
      <Blogs blogs={bolgs}></Blogs>
      <Sidebar></Sidebar>
    </Container>
  )
}

export default Body
