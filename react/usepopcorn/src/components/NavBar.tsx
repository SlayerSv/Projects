import { ReactElement, useState } from "react";

export default function NavBar({children} : {children: ReactElement[]}) {
  return (
  <nav className="nav-bar">
    {children}
  </nav>
)}