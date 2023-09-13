import DateDisplayer from "./DateDisplayer/DateDisplayer";
import PostAuthor from "./PostAuthor/PostAuthor";
import PostTag from "./PostTag/PostTag";
import styles from "./PostMeta.module.css";
import type { Category } from "../../../../types/types";

interface PostMeta {
  userId: string,
  date: string,
  category: Category
}

function PostMeta({ userId, date, category } : PostMeta) {
  return (
    <div className={styles.meta}>
      <span className={styles.date_author}>
        <PostAuthor userId = {userId}/>
        <DateDisplayer date = {date}/>
      </span>
      <PostTag category={category}/>
    </div>
  )
}

export default PostMeta