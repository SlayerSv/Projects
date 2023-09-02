import { useSelector } from "react-redux";
import { RootState } from "../../Store/Index";

function PostAuthor({userId} : {userId: string}) {
  const author = useSelector((state: RootState) => {
    return state.users.find(user => user.id === userId)
  });

  return (
    <span>by: {author ? author.name : "Unknown author"}</span>
  )
}

export default PostAuthor