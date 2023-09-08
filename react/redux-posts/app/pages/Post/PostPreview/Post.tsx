
import ReactionButtons from "../ReactionButtons/ReactionButtons";
import { Link } from "react-router-dom";
import type { Post } from "../../../Store/Posts/postsSlice";
import styles from "./Post.module.css";
import PostMeta from '../PostMeta/PostMeta';

function Post({ post } : {post: Post}) {
  return (
    <article className={styles.post} key={post.id}>
      <header>
        <PostMeta
          userId={post.userId}
          date={post.date}
          category={post.category}
        />
        <h2 className={styles.post__title}>{post.title}</h2>
      </header>
      <p className={styles.post__content}>{post.content}</p>
      
      <div className={styles.meta}>
        <Link to={`post/${post.id}`} className='button'>View Post</Link>
        <ReactionButtons post={post}/>
      </div>
        
    </article>
  )
}

export default Post