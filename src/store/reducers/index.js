import { moviesReducer } from "./movies"
import { userReducer } from "./user"

export function reducer(state, action) {
    let resultState = moviesReducer(state, action)
    resultState = userReducer(resultState, action)

    return resultState
}