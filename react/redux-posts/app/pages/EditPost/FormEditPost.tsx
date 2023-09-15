import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../AddPost/FormAddPost.module.css";
import { RootState } from "../../Store/Index";
import { editPost } from "../../Store/Posts/postsSlice";



function FormEditPost() {
  const { id }= useParams();
  const post = useSelector((state: RootState) => state.posts.find(post => post.id === id))
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function onContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function onSaveEdit() {
    dispatch(
      editPost({
        id: id,
        title,
        content
      })
    );
    navigate(`/post/${id}`)
  }


  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Edit Post</h2>
      <form className={styles.form}>
        <div className={styles.form__group}>
          <label htmlFor="title">Title</label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e)}
            />
        </div>
        <div className={styles.form__group}>
          <label htmlFor="content">Post Content</label>
          <textarea
            className={styles.input}
            id="content"
            cols={30}
            rows={10}
            value={content}
            onChange={(e) => onContentChange(e)}
            />
        </div>
        <div style={{display: "flex", gap: ".5rem"}}>
          <button
            className="button"
            type="button"
            onClick={onSaveEdit}
          >
            Save Edit
          </button>
          <Link to={`/post/${id}`} className="button button-muted">Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default FormEditPost