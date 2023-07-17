import { useState } from "react";
import NavBar from "./NavBar";
import ListOfMovies from "./ListOfMovies";
import ListOfWatchedMovies from "./ListOfWatchedMovies";

export default function App() {
  return (
    <>
    <NavBar />
    <main className="main">
      <ListOfMovies />
      <ListOfWatchedMovies />
    </main>
    </>
  );
}
