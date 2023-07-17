import { useState } from "react";
import { IWatchedMovie } from "../types";
import WatchedMovie from "./WatchedMovie";


export default function WatchedMoviesList({watched} : {watched: IWatchedMovie[]}) {
  return (
  <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID}/>
    ))}
  </ul>
  )
}