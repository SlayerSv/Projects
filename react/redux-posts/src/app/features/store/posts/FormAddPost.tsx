import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from "./postsSlice";
import { nanoid } from '@reduxjs/toolkit';

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const dispatch = useDispatch();
  const onAddPost = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost({id: nanoid(), title, content}))
      setTitle("");
      setContent("");
    }
    
  }

  return (
    <section>
      <h2>Add a post</h2>
      <form>
        <label htmlFor="title">Post title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="content">Post content</label>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={5}
          value={content}
          onChange={onContentChange}
        />
        <button onClick={(e) => onAddPost(e)}>Add Post</button>
      </form>
    </section>
  )
}

export default FormAddPost