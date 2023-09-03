import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../../Store/Index";

function Profile() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.users.find(user => user.id === id));

  return (
    <>
      <h2>{user?.name}</h2>
      <div>Profile</div>
    </>
  )
}

export default Profile