import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from "./postsSlice";
import { RootState } from "../store";

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId ] = useState("");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onUserChange = (userId: string) => {
    setUserId(userId);
  }

  const isFormValid = Boolean(title) && Boolean(content) && Boolean(userId);

  const users = useSelector((state: RootState) => {
    return state.users.map(user => (
      <option value={user.id} key={user.id}>{user.name}</option>
    ))
  })

  const dispatch = useDispatch();
  const onAddPost = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(addPost(title, content, userId))
      setTitle("");
      setContent("");
      setUserId("");
    }
  }

  return (
    <section>
      <h2>Add a post</h2>
      <form>
        <label htmlFor="user">Author:</label>
        <select
          name="user"
          id="user"
          onChange={(e) => onUserChange(e.target.value)}
          value={userId}
        >
          <option value="">Select a user</option>
          {users}
        </select>
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
        <button onClick={(e) => onAddPost(e)} disabled={!isFormValid}>Add Post</button>
      </form>
    </section>
  )
}

export default FormAddPost