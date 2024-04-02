import React from "react";
import { styled } from "styled-components";
import { MdLogout } from "react-icons/md";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess} from '../Redux/userSlice'

const Container = styled.div`
  /* border-bottom: 1px solid greenyellow; */
  width: 100%;
  height: 10vh;
  display:flex;
`;

const Left = styled.div`
  width:30%;
`

const Logo = styled.div`
  padding:1.3vh 1.5vw;
  font-size:5vmin;
  font-weight:700;
  cursor: pointer;
`

const Center = styled.div`
  width:55%;
  display:flex;
  justify-content:space-around;
  padding:3vh 5vw;
`

const Options = styled.div`
  font-size:3.5vmin;
  font-weight:500;
  a{
    text-decoration:none;
    color:black;
  }
  &:hover{
    border-bottom:3px solid teal;
    font-size:3.7vmin;
  }
  cursor: pointer;
`

const Right = styled.div`
  width:15%;
  display: flex;
  gap:1vw;
  padding-top:2vh;
  padding-bottom:2vh;
`

const Profile = styled.img`
  height: 6vh;
  width: 3vw;
  border-radius:50%;
  margin-left:3vw;
`


const Logout = styled.div`
  svg{
    font-size:6vmin;
    color:teal;
    &:hover{
    font-size:6.2vmin;
  }
  }
`

const Button = styled.button`
  font-size: 3vmin;
  border:none;
  padding:0 1vw;
  cursor: pointer;
  border-radius:15px;
  background-color: teal;
  color:white;
  a{
    text-decoration:none;
    color:white;
  }
`


const Navbar = () => {

  const {currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginSuccess(null));
  }

  const PF = 'https://blogplus-backend.onrender.com/images/';

  return (
    <Container>
      <Left>
        <Logo>Blog App</Logo>
      </Left>

      <Center>
        <Options><Link to='/'>Home</Link></Options>
        <Options><a href='https://github.com/Nakul-2001' target="blank">About</a ></Options>
        <Options><Link >Contact Us</Link></Options>
        {currentUser && <Options><Link to='Write'>Write</Link></Options>}
      </Center>

      {currentUser ? (
        <Right>
          <Link to='update'><Profile src={PF+currentUser.profilePic}></Profile></Link>
          <Logout onClick={(e)=>handleClick(e)}><MdLogout /></Logout>
        </Right>
      ) : (
        <Right>
          <Button><Link to='/register'>Register</Link></Button>
          <Button><Link to='/login'>Login</Link></Button>
        </Right>
      )}

    </Container>
  );
};

export default Navbar;
