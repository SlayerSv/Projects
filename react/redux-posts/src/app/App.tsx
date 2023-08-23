import './App.css'
import { Navbar } from './components/Navbar';
import  PostsList from "./features/store/posts/PostsList";
import FormAddPost from './features/store/posts/FormAddPost';
import FormEditPost from './features/store/posts/FormEditPost';
import PostPage from './features/store/posts/PostPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <FormAddPost />
      <PostsList />
      <PostPage />
      <FormEditPost />
    </div>
      
  )
}

export default App
