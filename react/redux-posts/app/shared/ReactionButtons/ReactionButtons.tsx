import type { Post } from "../../Store/Posts/postsSlice";
import { useDispatch } from "react-redux";
import { addReaction } from "../../Store/Posts/postsSlice";
import styles from "./ReactionButtons.module.css";

function ReactionButtons({ post } : {post: Post}) {
  const dispatch = useDispatch();

  const reactions = {
    thumbsUp: "👍",
    love: "😍",
    angry: "😡",
    sad: "😥",
    thinking: "🤔",
    surprised: "😮"
  }
  return (
    <div className={styles.buttons}>
      {Object.entries(reactions).map(([name, emoji]) => (
        <button
          key={name}
          className="muted-button reaction-button"
          onClick={() => dispatch(addReaction({postId: post.id, reactionName: name}))}
        >{emoji} {post.reactions[name as keyof Post["reactions"]]}
        </button>
        )
      )}
    </div>
  )
}

export default ReactionButtons