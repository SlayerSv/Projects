import { useState } from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import NumberOfSearchResults from "./NumberOfSearchResults";

export default function NavBar() {
  return (
  <nav className="nav-bar">
    <Logo />
    <SearchInput />
    <NumberOfSearchResults />
  </nav>
)}