import type { Post } from "../../Store/Posts/postsSlice";
import { useDispatch } from "react-redux";
import { addReaction } from "../../Store/Posts/postsSlice";

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
    Object.entries(reactions).map(([name, emoji]) => {
      return (
        <button
          key={name}
          className="muted-button reaction-button"
          onClick={() => dispatch(addReaction({postId: post.id, reactionName: name}))}
        >{emoji} {post.reactions[name as keyof Post["reactions"]]}</button>
      )
    })
  )
}

export default ReactionButtons