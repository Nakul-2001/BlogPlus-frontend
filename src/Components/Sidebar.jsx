import React, { useEffect, useState } from 'react'
import {styled} from 'styled-components'
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  gap:3vh;
  padding:3vh 3vw;
  width:25%;
  background-color:#fdfbfb;
`

const Heading = styled.div`
  text-align:center;
  padding:1vh;
  border-top:1px solid black;
  border-bottom:1px solid black;
`

const Photo = styled.img`
  height:40vh;
`

const Desc = styled.div`
  
`

const Options = styled.div`
  display: flex;
  flex-wrap:wrap;
  gap:1vw;
`

const Option = styled.button`
   border:none;
   background-color: #fff;
   flex:40%;
   cursor: pointer;
   font-size:2.5vmin;
`

const Icons = styled.div`
  display:flex;
  justify-content:space-evenly;
  padding:1vh 2vw;
`

const Icon = styled.div`
  svg{
    font-size:4vmin;
  }
`

const Sidebar = () => {

  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async () => {
      const res = await axios.get('https://blogplus-backend.onrender.com/api/category');
      setCategories(res.data);
      console.log(res.data);
    }
    getCategories();
  },[]);

  return (
    <Container>
      <Heading>ABOUT ME</Heading>
      <Photo src='https://img.freepik.com/free-photo/oh-hello-nice-meet-you-portrait-surprised-african-american-man-greet-friend-didnt-expect-see-person_176420-33825.jpg?w=996&t=st=1711798664~exp=1711799264~hmac=28a03d1c5ef20e9a0dee384b794bfa85543963c74d94a04acb17967aaad5b6b7'></Photo>
      <Desc>Hi, I am a 4th-year student currently pursuing Electrical Engineering at Netaji Subhas University of Technology (formerly NSIT). 
      <p>I am a coding enthusiast with strong knowledge of Data Structures and Algorithms, OOPs, OS, DBMS, skilled in C/C++, and proficient in HTML, CSS, React, JavaScript, Node.js, Express.js, and MongoDB.</p>
      </Desc>
      <Heading>CATEGORIES</Heading>
      <Options>
        {
          categories.map((cat)=>(
            <Option key={cat._id}>
              <Link to={`/?cat=${cat.name.toLowerCase()}`} style={{color:'black',textDecoration:'none'}}>{cat.name}</Link>
              </Option>
          ))
        }
      </Options>
      <Heading>FOLLOW US</Heading>
      <Icons>
        <Icon><FaInstagramSquare /></Icon>
        <Icon><FaFacebookSquare /></Icon>
        <Icon><FaPinterestSquare /></Icon>
        <Icon><FaXTwitter /></Icon>
      </Icons>
    </Container>
  )
}

export default Sidebar
