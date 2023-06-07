import React from 'react'
import { useContext, useEffect, useState } from 'react';
import StickyBox from "react-sticky-box";
import { Container } from '@mui/material'
import '../styles/Home.css'
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import BlogContext from '../context/context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";

function ListBlog() {

  const { stringAvatar, isLoggined ,stripHtmlTags} = useContext(BlogContext);
  const [blogList, setBlogList] = useState([]);




  useEffect(() => {
    axios.get('http://localhost:3000/blogList')
      .then(response => {
        setBlogList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  

  return (
    <div className="row">
      <Container maxWidth="xl">

        <div style={{ height: 1000, position: "relative", }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, minHeight: "100%" }}>
            <div style={{ display: "flex", alignItems: "flex-start", margin: "20px" }}>
              <StickyBox className='stickyBox'>
                {isLoggined.check ?
                  <>
                    <ul>
                      <li>
                        <Link to="/createBlog" className='CreatedBlog'>
                          <span><AiOutlineEdit /> Blog Yaz</span>
                        </Link>
                      </li>
                      <li>Oluşturulmuş Bloglar : <b>{blogList.length}</b>  </li>

                    </ul>
                  </>

                  :
                  <>
                    <ul>
                      <li>Giriş Yapın</li>

                    </ul>
                  </>
                }

              </StickyBox>
              <div className='contentMain'>
                <div className="blogList">
                  {blogList.map(blog => (
                    <Link to={`/blog/${blog.id}`} key={blog.id} style={{textDecoration:"none"}} >
                      <div className="blogCard">
                        <div className="infoUser">
                          <Stack direction="row" spacing={2}>
                            <Avatar className="" {...stringAvatar(blog.author)} />
                          </Stack>
                          <span className='blogAuthor'>{blog.author}</span>
                          <span className='createdDate'>{blog.createdDate}</span>
                        </div>

                        <div className='blogTitle'>
                          {blog.title}
                        </div>
                        <div className='blogContent'>
                          {stripHtmlTags(blog.content)}
                        </div>
                        <div className="blogImage" >
                          <img src={blog.image} alt="Blog Image" />
                        </div>
                      </div>
                    </Link>

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>


    </div>
  )
}

export default ListBlog