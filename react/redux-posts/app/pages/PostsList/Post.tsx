import PostAuthor from '../../shared/PostAuthor/PostAuthor';
import DateDisplayer from '../../shared/DateDisplayer/DateDisplayer';
import ReactionButtons from "../../shared/ReactionButtons/ReactionButtons";
import { Link } from "react-router-dom";
import type { Post } from "../../Store/Posts/postsSlice";
import styles from "./Post.module.css";

function Post({ post } : {post: Post}) {
  return (
    <article className={styles.post} key={post.id}>
      <h2 className={styles.post__title}>{post.title}</h2>
      <p className={styles.post__content}>{post.content}</p>
      
      <div className={styles.meta}>
        <Link to={`post/${post.id}`} className='button'>View Post</Link>
        <ReactionButtons post={post}/>
        <div className='flex flex-col'>
          <PostAuthor userId={post.userId}/>
          <DateDisplayer date={post.date} />
        </div>
      </div>
        
    </article>
  )
}

export default Post