import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Profile from './component/Profile'
import Navbar from './component/Navbar'
import CreateBlog from './component/CreateBlog'
import BlogDetail from './component/BlogDetail'
import MyBlogs from './component/MyBlogs'
import BlogUpdate from './component/BlogUpdate'



function App() {


  return (
    <div>
  
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/createBlog" exact element={<CreateBlog />} />
        <Route path="/blog/:id" exact element={<BlogDetail />} />
        <Route path="/myblogs/:id" exact element={<MyBlogs />} />
        <Route path="/updateblog/:id" exact element={<BlogUpdate />} />
      </Routes>

    </div>
  )
}

export default App
