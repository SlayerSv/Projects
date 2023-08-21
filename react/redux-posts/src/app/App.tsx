import './App.css'
import { Navbar } from './components/Navbar';
import  PostsList from "./features/store/posts/PostsList";
import FormAddPost from './features/store/posts/FormAddPost';
import FormEditPost from './features/store/posts/FormEditPost';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <FormAddPost />
      <PostsList />
      <FormEditPost />
    </div>
      
  )
}

export default App
