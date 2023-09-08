import styles from "./SideBar.module.css";
import { postCategories } from "../../Store/Posts/postsSlice";


function SideBar() {
  

  return (
    <div className={styles.sidebar}>
      <ul className={styles.categories}>
      {Object.values(postCategories).map((category) =>
      {
        return (
          <li className={styles.category} key={category}>{category}</li>
        )
      })
      }
      </ul>
    </div>
  )
}

export default SideBar