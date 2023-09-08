import styles from "./PostTag.module.css";
import { postCategories } from "../../../../Store/Posts/postsSlice";


function PostTag({ category } : { category: keyof typeof postCategories}) {
  return (
    <div className={`${styles.tag} ${styles[category]}`}>
      { category }
    </div>
  )
}

export default PostTag