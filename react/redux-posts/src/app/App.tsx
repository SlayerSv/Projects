import { Routes, Route } from "react-router-dom";
import './App.css'
import  PostsList from "./features/store/posts/PostsList";
import FormAddPost from './features/store/posts/FormAddPost';
import FormEditPost from './features/store/posts/FormEditPost';
import PostPage from './features/store/posts/PostPage';
import Layout from "./components/Layout";

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
