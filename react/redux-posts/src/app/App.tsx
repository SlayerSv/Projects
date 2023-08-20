import './App.css'
import { Navbar } from './components/Navbar';
import  PostsList from "./components/PostsList";
import FormAddPost from './components/FormAddPost';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <FormAddPost />
      <PostsList />
    </div>
      
  )
}

export default App
