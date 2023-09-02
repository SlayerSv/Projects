import { useSelector } from 'react-redux';
import type { RootState } from '../../Store/Index';
import PostAuthor from '../../shared/PostAuthor/PostAuthor';
import DateDisplayer from '../../shared/DateDisplayer/Index';
import ReactionButtons from "../../shared/ReactionButtons/ReactionButtons";
import { Link } from "react-router-dom";

function PostsList() {
  const posts = useSelector((state: RootState) => state.posts);
  const sortedPosts = [...posts].sort((a, b) => (b.date.localeCompare(a.date)))
  const renderedPosts = sortedPosts.map((post) => (
    <article className='post-excerpt' key={post.id}>
      <h2>{post.title}</h2>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId}/>
      <DateDisplayer date={post.date} />
      <ReactionButtons post={post}/>
      <div>
        <Link to={`post/${post.id}`} className='button'>View Post</Link>
      </div>
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