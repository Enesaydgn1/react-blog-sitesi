import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/CreateBlog.css'
import BlogContext from '../context/context';
import { Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BlogUpdate() {
    const {
        blogerrorMessage,
        setBlogErrorMessage,
        blogSuccesMessage,
        setBlogSuccesMessage, 
        isLoggined
    } = useContext(BlogContext)

    const navigate = useNavigate();
    const { id } = useParams();
    const [blogUpData, setBlogUpData] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/blogList/${id}`)
            .then(response => {
                setBlogUpData(response.data);
            
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        if (blogUpData) {
            setUpTitle(blogUpData.title);
            setUpImage(blogUpData.image);
            setUpContent(blogUpData.content);
        }
    }, [blogUpData]);


    useEffect(() => {
        if (blogerrorMessage || blogSuccesMessage) {
            const timer = setTimeout(() => {
                setBlogErrorMessage('');
                setBlogSuccesMessage('');
            }, 3000); // 3 saniye sonra başarı ve hata mesajlarını kaldır
            return () => clearTimeout(timer);
        }
    }, [blogerrorMessage, blogSuccesMessage]);

    useEffect(() => {
        navigate('');
    }, [blogSuccesMessage]);



    const [upTitle, setUpTitle] = useState(blogUpData?.title || "");
    const [upImage, setUpImage] = useState(blogUpData?.image || "");
    const [upContent, setUpContent] = useState(blogUpData?.content || "");
    

    const handleBlogUpdate = async (e) => {
        e.preventDefault();

        if (isLoggined.check) {
            const title = upTitle;
            const image = upImage;
            const content = upContent;
            const currentDate = new Date();
            const isoDate = currentDate.toISOString();
            const createdDate = isoDate.split('T')[0];
            const author = isLoggined.name;

            try {
                await axios.put(`http://localhost:3000/blogList/${id}`, { author, title, image, content, createdDate });
                // İstek başarılıysa gerekli işlemleri yap
                setBlogSuccesMessage("Bloğunuz Başarılı Bir Şekilde Güncellendi. :)");
            } catch (error) {
                // İstek hatalıysa gerekli hata işlemlerini yap
                setBlogErrorMessage('Blog Güncellenme hatası:', error.message);
            }
        }

        else {
            setBlogErrorMessage("Bloğunuzu Güncellemek için Giriş Yapınız");
        }

    }


    return (
        <div style={{ margin: "30px" }}>
            {blogerrorMessage && <Alert severity="error" className='alertError'>{blogerrorMessage}</Alert>}
            {blogSuccesMessage && <Alert severity="success" className='alertSucces'>{blogSuccesMessage}</Alert>}
            {
                <div className='createBlog'>
                    <form action="" id="UpdatedBlogForm">
                        <input
                            type="text"
                            onChange={(event) => setUpTitle(event.target.value)}
                            placeholder="Blog Başlığı"
                            value={upTitle}
                        />

                        <input
                            type="text"
                            onChange={(event) => setUpImage(event.target.value)}
                            placeholder="İmage Url"
                            value={upImage}
                        />

                        <ReactQuill
                            theme="snow"
                            onChange={setUpContent}
                            className="textEditor"
                            value={upContent}
                            placeholder="İçeriğinizi girin"
                        />

                        <button type="submit" onClick={handleBlogUpdate}>
                            Güncelle
                        </button>
                    </form>
                </div>

            }
        </div>
    )
}

export default BlogUpdate;
