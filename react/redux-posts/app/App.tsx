import { Routes, Route } from "react-router-dom";

import  PostsList from "./pages/PostsList/PostsList";
import FormAddPost from './pages/AddPost/FormAddPost';
import FormEditPost from './pages/EditPost/FormEditPost';
import PostPage from './pages/Post/PostPage';
import Layout from "./pages/Layout";
import User from "./pages/User/User";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PostsList />}/>
        <Route path="user/:id" element ={<User />}/>
        <Route path="addpost" element={<FormAddPost />}/>
        <Route path="post/:id" element={<PostPage />}/>
        <Route path="edit/:id" element={<FormEditPost />}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}
export default App
