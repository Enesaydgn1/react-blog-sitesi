import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogDetail.css'
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import BlogContext from '../context/context';

function BlogDetail() {
    const { stringAvatar} = useContext(BlogContext);
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/blogList/${id}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className='blogDetail'>
            <div className="infoUser infoUserTop">
                <Stack direction="row" spacing={2}>
                    <Avatar className="" {...stringAvatar(blog.author)} />
                </Stack>
                <span className='blogAuthor'>{blog.author}</span>
                <span className='createdDate'>{blog.createdDate}</span>
            </div>
            <h1 className='title'>{blog.title}</h1>

            <div className='content' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
    );
}

export default BlogDetail;
