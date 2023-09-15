import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar/Navbar";
import styles from "./Layout.module.css";
import SideBar from "../shared/SideBar/SideBar";
import Footer from "../shared/Footer/Footer";


export default function Layout() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className="flex">
        <SideBar />
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
