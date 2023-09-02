import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/Index";
import { editPost } from "../../Store/Posts/postsSlice";

import { Link, useParams, useNavigate } from "react-router-dom";

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
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e)}
          />
        <label htmlFor="content"></label>
        <textarea
          id="content"
          cols={30}
          rows={10}
          value={content}
          onChange={(e) => onContentChange(e)}
          />
        <div style={{display: "flex", gap: ".5rem"}}>
          <button
            type="button"
            onClick={onSaveEdit}
          >
          Save Edit</button>
          <Link to={`/post/${id}`} className="button muted-button">Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default FormEditPost