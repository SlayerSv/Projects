import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { editPost } from "./postsSlice";


function FormEditPost() {
  const postId = "1";
  const post = useSelector((state: RootState) => state.posts.find(post => post.id === postId))
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const dispatch = useDispatch();

  function onTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function onContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function onSaveEdit() {
    dispatch(
      editPost({
        id: post?.id,
        title,
        content
      })
    );
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
        <button
          type="button"
          onClick={onSaveEdit}
        >
        Save Edit</button>
      </form>
    </section>
  )
}

export default FormEditPost