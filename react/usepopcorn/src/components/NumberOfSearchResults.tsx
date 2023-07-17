export default function NumberOfSearchResults({numberOfMovies}: {numberOfMovies: number}) {
  return (
    <p className="num-results">
    Found <strong>{numberOfMovies}</strong> results
  </p>
  )
}