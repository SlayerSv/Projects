import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { RootState } from '../../Store/Index';
import ReactionButtons from './ReactionButtons/ReactionButtons';
import styles from "./PostPage.module.css";
import PostMeta from './PostMeta/PostMeta';

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
      <article className={styles.container}>
        <header className={styles.meta}>
          <PostMeta
            userId={post.userId}
            date={post.date}
            category={post.category}
          />
          <Link to={`/edit/${post.id}`} className={`button`}>Edit post</Link>
        </header>
        
        <h2 className={styles.title}>{post.title}</h2>
        
        
        <p className={styles.content}>{post.content}</p>
        <ReactionButtons post={post}/>
        
      </article>
    </section>
  )
}

export default PostPage