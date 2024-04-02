import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 75%;
  padding: 3vh 2vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Image = styled.img`
  height: 70vh;
  border-radius: 5px;
`;

const Heading = styled.div`
  display: flex;
`;

const Title = styled.h1`
  text-align: center;
  width: 90%;
`;

const Options = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
  svg {
    font-size: 5vh;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Author = styled.div`
  color: #ecaa1d;
  font-size: 3vmin;
`;

const Time = styled.div`
  color: #ecaa1d;
  font-size: 3vmin;
`;

const Desc = styled.p`
  color: #666;
  font-size: 3vmin;
  &::first-letter {
    font-size: 8vmin;
    font-weight: 600;
    margin-left: 2vw;
  }
`;

const SingleBlog = () => {
  const { pathname } = useLocation();
  const blog_id = pathname.split("/")[2];
  const [blog, setBlog] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const PF = "https://blogplus-backend.onrender.com/images/";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatemode, setUpdatemode] = useState(false);

  //fetching Blog.
  useEffect(() => {
    const getBlog = async () => {
      const res = await axios.get(`https://blogplus-backend.onrender.com/api/blog/${blog_id}`);
      setBlog(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      console.log(res.data);
    };
    getBlog();
  }, [blog_id]);

  //delete.
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `https://blogplus-backend.onrender.com/api/blog/${blog_id}`
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Update.
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://blogplus-backend.onrender.com/api/blog/${blog._id}`,
        { username: currentUser.username, title, description }
      );
      console.log(res.data);
      setUpdatemode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Image
        src={
          !blog.photo
            ? "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            : PF + blog.photo
        }
      ></Image>
      {!updatemode ? (
        <Heading>
          <Title>{title}</Title>
          {blog &&
            currentUser?.username?.toLowerCase() ===
              blog?.username?.toLowerCase() && (
              <Options>
                <button
                  style={{
                    backgroundColor: "inherit",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setUpdatemode(true)}
                >
                  <FaRegEdit style={{ color: `teal` }} />
                </button>
                <button
                  style={{
                    backgroundColor: "inherit",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleDelete(e)}
                >
                  <MdDeleteForever style={{ color: `red` }} />
                </button>
              </Options>
            )}
        </Heading>
      ) : (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ border: "none", fontSize: "3vmin" }}
        ></input>
      )}
      <Info>
        <Author>
          Author:
          <b>
            <Link
              to={`/?user=${blog.username}`}
              style={{ color: "#ecaa1d", textDecoration: "none" }}
            >
              {blog.username}
            </Link>
          </b>
        </Author>
        <Time>{new Date(blog.createdAt).toDateString()}</Time>
      </Info>
      {!updatemode ? (
        <Desc>{description}</Desc>
      ) : (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ border: "none", fontSize: "3vmin" }}
        ></textarea>
      )}

      {updatemode && (
        <button
          style={{ backgroundColor: "teal", border: "none", fontSize: "3vmin" }}
          onClick={(e) => handleUpdate(e)}
        >
          Update
        </button>
      )}
    </Container>
  );
};

export default SingleBlog;
