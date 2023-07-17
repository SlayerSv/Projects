import { IMovie } from "../types";
import Movie from "./Movie";

export default function ListOfMovies({movies} : {movies: IMovie[]}) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}