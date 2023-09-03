import { useSelector } from 'react-redux';
import type { RootState } from '../../Store/Index';
import Post from "./Post"
import styles from "./PostList.module.css";

function PostsList() {
  const posts = useSelector((state: RootState) => state.posts);
  const sortedPosts = [...posts].sort((a, b) => (b.date.localeCompare(a.date)))
  const renderedPosts = sortedPosts.map((post) => (
    <Post key={post.id} post={post}/>
  ));
  return (
    <section className={styles.posts}>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
    )

}

export default PostsList