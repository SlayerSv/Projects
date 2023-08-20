import { useState, ChangeEvent } from 'react';

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
        <button>Add Post</button>
      </form>
    </section>
  )
}

export default FormAddPost