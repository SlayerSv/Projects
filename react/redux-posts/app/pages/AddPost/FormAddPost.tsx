import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from "../../Store/Posts/postsSlice";
import { RootState } from "../../Store/Index";
import type { Category } from '../../../types/types';
import { postCategories } from '../../../types/types';
import styles from "./FormAddPost.module.css";

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId ] = useState("");
  const [category, setCategory] = useState<Category>("Other");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onUserChange = (userId: string) => {
    setUserId(userId);
  }

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category)
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
      dispatch(addPost(title, content, userId, category))
      setTitle("");
      setContent("");
      setUserId("");
    }
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Add a post</h2>
      <form className={styles.form}>
        <div className={styles.form__group}>
          <label htmlFor="user">Author:</label>
          <select
            name="user"
            id="user"
            onChange={(e) => onUserChange(e.target.value)}
            value={userId}
            className={styles.input}
          >
            <option value="">Select a user</option>
            {users}
          </select>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="title">Post title</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onTitleChange}
          />
        </div>
        <div className={styles.form__group}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={onCategoryChange}
            className={styles.input}
          >
            {Object.keys(postCategories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="content">Post content</label>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={15}
            value={content}
            onChange={onContentChange}
            className={styles.input}
          />
        </div>
        <button
          className='button'
          onClick={(e) => onAddPost(e)}
          disabled={!isFormValid}
        >
          Add Post
        </button>
      </form>
    </section>
  )
}

export default FormAddPost