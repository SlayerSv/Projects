import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar/Navbar";
import styles from "./Layout.module.css";


export default function Layout() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  )
}
