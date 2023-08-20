import { useSelector } from 'react-redux';
import type { RootState } from '../features/store/store';

function PostsList() {
  const posts = useSelector((state: RootState) => state.posts);
  const renderedPosts = posts.map((post) => (
    <article className='post-excerpt'>
      <h2>{post.title}</h2>
      <p className='post-content'>{post.content}</p>
    </article>
  ));
  return (
    <section className='posts-list'>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
    )

}

export default PostsList