import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"
export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <section>
        <h1 className={styles.title}>Redux Essentials Example</h1>
        <div className={styles.links}>
          <NavLink to="/">Posts</NavLink>
          <NavLink to="/addpost">Add a new post</NavLink>
        </div>
      </section>
    </nav>
  )
}
