export function fetchMovies(dispatch, movies) {
    dispatch({ type: 'fetchMovies', payload: movies })
}