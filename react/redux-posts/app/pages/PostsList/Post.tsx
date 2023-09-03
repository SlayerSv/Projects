import PostAuthor from '../../shared/PostAuthor/PostAuthor';
import DateDisplayer from '../../shared/DateDisplayer/Index';
import ReactionButtons from "../../shared/ReactionButtons/ReactionButtons";
import { Link } from "react-router-dom";
import type { Post } from "../../Store/Posts/postsSlice";
import styles from "./Post.module.css";

function Post({ post } : {post: Post}) {
  return (
    <article className={styles.post} key={post.id}>
      <h2 className={styles.post__title}>{post.title}</h2>
      <p>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId}/>
      <DateDisplayer date={post.date} />
      <ReactionButtons post={post}/>
      <div>
        <Link to={`post/${post.id}`} className='button'>View Post</Link>
      </div>
    </article>
  )
}

export default Post