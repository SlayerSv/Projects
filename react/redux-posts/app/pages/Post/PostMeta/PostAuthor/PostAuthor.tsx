import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Index";
import styles from "./PostAuthor.module.css";


function PostAuthor({userId} : {userId: string}) {
  const author = useSelector((state: RootState) => {
    return state.users.find(user => user.id === userId)
  });

  return (
    <span className={styles.author}>by {author ? author.name : "Unknown author"}</span>
  )
}

export default PostAuthor