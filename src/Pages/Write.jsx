import React, { useState } from "react";
import { styled } from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from 'axios'

const Container = styled.div`
  text-align: center;
`;

const Image = styled.img`
  margin-top: 10vh;
  border-radius: 10px;
  width: 60%;
  height: 40vh;
`;

const Form = styled.form`
  padding: 5vh 0;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  align-items: center;
`;

const Label = styled.label`
  svg {
    font-size: 6vmin;
    background-color: white;
    cursor: pointer;
  }
`;

const Heading = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
`;

const Add = styled.input`
  display: none;
`;

const Title = styled.input`
  width: 100%;
  height: 6vh;
  font-size: 4vmin;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Desc = styled.textarea`
  width: 60%;
  border: none;
  font-size: 3vmin;
  &:focus {
    outline: none;
  }
  height: 100vh;
`;

const Button = styled.button`
  background-color: teal;
  font-size: 3vmin;
  padding: 0.5vh 0.5vw;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      description,
      username: currentUser.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newBlog.photo = filename;
      try {
        await axios.post(`https://blogplus-backend.onrender.com/api/upload`, data);
      } catch (err) {console.log('upload',err)}
    }

    try {
      const res = await axios.post(`https://blogplus-backend.onrender.com/api/blog`, newBlog);
      navigate(`/blog/${res.data._id}`);
    } catch (err) {console.log('post',err)}
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        {file && <Image src={URL.createObjectURL(file)} alt="img"></Image>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Button type="submit">Publish</Button>
          <Heading>
            <Label htmlFor="icon">
              <IoIosAddCircle />
            </Label>
            <Add
              type="file"
              id="icon"
              onChange={(e) => setFile(e.target.files[0])}
            ></Add>
            <Title
              placeholder="Title"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            ></Title>
          </Heading>
          <Desc
            placeholder="Description"
            autoFocus={true}
            onChange={(e) => setDescription(e.target.value)}
          ></Desc>
        </Form>
      </Container>
    </>
  );
};

export default Write;
