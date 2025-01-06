const loadData = async ({ request }) => {
    const session = { token: localStorage.getItem('token') }

    return session
}

export default loadData