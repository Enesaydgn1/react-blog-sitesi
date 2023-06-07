import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import BlogContext from '../context/context';
import '../styles/Myblog.css'


function MyBlogs() {
  const { stringAvatar, stripHtmlTags } = useContext(BlogContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:3004/users/${id}`)
      .then(response => {
        setUser(response.data.userName);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {

    axios.get('http://localhost:3000/blogList', {
      params: { author: user },
      headers: {
        Authorization: 'Bearer token',
      },
    })
      .then(response => {
        setUserBlogs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user]);


  const handleUpdatedBlog = (blogId) => {
    navigate(`/updateblog/${blogId}`);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:3000/blogList/${blogId}`);
      setUserBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Myblog'>
      <h1 className='MyblogTitle'>BLOGLARIM</h1>


      <div className='contentMain'>
        <div className="blogList">
          {userBlogs.length === 0 ? (
            <h2 className='noneBlog'>Hiç Blog Bulunamadı.</h2>

          ) : (
            userBlogs.map(blog => (
              <div className="blogCard" key={blog.id}>
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className="infoUser">
                    <Stack direction="row" spacing={2}>
                      <Avatar className="" {...stringAvatar(blog.author)} />
                    </Stack>
                    <span className="blogAuthor">{blog.author}</span>
                    <span className="createdDate">{blog.createdDate}</span>
                  </div>

                  <div className="blogTitle">{blog.title}</div>
                  <div className="blogContent">{stripHtmlTags(blog.content)}</div>
                  <div className="blogImage">
                    <img src={blog.image} alt="Blog Image" />
                  </div>
                </Link>
                <div className="butonlar">
                  <button className='btnUpdata' onClick={() => handleUpdatedBlog(blog.id)}>Güncelle</button>
                  <button className='btnDelete' onClick={() => handleDeleteBlog(blog.id)}>Sil</button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div >
  )
}

export default MyBlogs;
