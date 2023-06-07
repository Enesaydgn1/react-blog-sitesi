import React, { useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/CreateBlog.css'
import BlogContext from '../context/context';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

  
  const { setCreateTitle,
    setCreateİmg,
    setCreateContent,
    createContent,
    handleBlogCreateSubmit, 
    blogerrorMessage ,
    setBlogErrorMessage,
    blogSuccesMessage,
    setBlogSuccesMessage
  } = useContext(BlogContext)

  const navigate = useNavigate();


    useEffect(() => {
      if (blogerrorMessage || blogSuccesMessage) {
        const timer = setTimeout(() => {
          setBlogErrorMessage('');
          setBlogSuccesMessage('');
        }, 3000); // 3 saniye sonra başarı ve error mesajını kaldır
        return () => clearTimeout(timer);
      }
    }, [blogerrorMessage,blogSuccesMessage]);

    useEffect(() =>{
      navigate('')
    },[blogSuccesMessage])


  return (
    <div style={{margin:"30px"}}>

      {blogerrorMessage && <Alert severity="error" className='alertError'>{blogerrorMessage}</Alert>}
      {blogSuccesMessage && <Alert severity="success" className='alertSucces'>{blogSuccesMessage}</Alert>}
      <div className='createBlog'>
        <form action=""id="CreatedBlogForm">
          <input type="text" onChange={(event) => setCreateTitle(event.target.value)} placeholder='Blog Başlığı' />
          <input type="text" onChange={(event) => setCreateİmg(event.target.value)} placeholder='İmage Url' />
          <ReactQuill theme="snow" value={createContent} onChange={setCreateContent} className='textEditor' placeholder='İçeriğinizi girin' />
          <button type='submit' onClick={handleBlogCreateSubmit}>Yayınla</button>
        </form>

      </div>
    </div>
  )
}

export default CreateBlog