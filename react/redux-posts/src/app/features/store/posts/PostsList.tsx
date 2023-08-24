import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import PostAuthor from './PostAuthor';
import DateDisplayer from './DateDisplayer';
import ReactionButtons from "./ReactionButtons";

function PostsList() {
  const posts = useSelector((state: RootState) => state.posts);
  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date) ? 1 : -1)
  const renderedPosts = sortedPosts.map((post) => (
    <article className='post-excerpt' key={post.id}>
      <h2>{post.title}</h2>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId}/>
      <DateDisplayer date={post.date} />
      <ReactionButtons post={post}/>
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