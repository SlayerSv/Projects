import { useSelector } from 'react-redux';
import { RootState } from '../store';

function PostPage() {
  const postId = "1";

  const post = useSelector((state: RootState) => state.posts.find(post => postId === post.id))

  if (!post) {
    return (
      <section>
        <p>No post has been found</p>
      </section>
    )
  }

  return (
    <section>
      <article className='post'>
        <h2>{post.title}</h2>
        <p className='post-content'>{post.content}</p>
      </article>
    </section>
  )
}

export default PostPage