export function moviesReducer(state, action) {
    switch (action.type) {
        case 'fetchMovies':
            return { ...state, movies: action.payload }

        default:
            return state
    }
}