import { Routes, Route } from "react-router-dom";
import './App.css'
import  PostsList from "./pages/Home/PostsList";
import FormAddPost from './pages/AddPost/FormAddPost';
import FormEditPost from './pages/EditPost/FormEditPost';
import PostPage from './pages/Post/PostPage';
import Layout from "./shared/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<PostsList />}/>
        <Route path="addpost" element={<FormAddPost />}/>
        <Route path="post/:id" element={<PostPage />}/>
        <Route path="edit/:id" element={<FormEditPost />}/>
        <Route path="*" element={<p>Not Found</p>}/>
      </Route>
    </Routes>
  )
}
export default App
