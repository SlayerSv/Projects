import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { RootState } from '../../Store/Index';
import PostAuthor from '../../shared/PostAuthor/PostAuthor';
import DateDisplayer from '../../shared/DateDisplayer/Index';
import ReactionButtons from '../../shared/ReactionButtons/ReactionButtons';

function PostPage() {
  const { id } = useParams();

  const post = useSelector((state: RootState) => state.posts.find(post => id === post.id))

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
        <PostAuthor userId = {post.userId}/>
        <DateDisplayer date={post.date}/>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h2>{post.title}</h2>
          <Link to={`/edit/${post.id}`} className='button'>Edit post</Link>
        </div>
        
        <p className='post-content'>{post.content}</p>
        <ReactionButtons post={post}/>
        
      </article>
    </section>
  )
}

export default PostPage