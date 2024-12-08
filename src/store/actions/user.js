export function login(dispatch, user) {
    dispatch({ type: 'login', payload: user })
}