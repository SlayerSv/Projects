import styles from "./PostTag.module.css";
import type { Category } from "../../../../../types/types";


function PostTag({ category } : { category: Category}) {
  return (
    <div className={`${styles.tag} ${styles[category]}`}>
      { category }
    </div>
  )
}

export default PostTag