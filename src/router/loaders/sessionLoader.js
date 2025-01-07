import axios from 'axios'

const loadData = async ({ request }) => {
    let session = { token: localStorage.getItem('token') }

    if (session?.token) {
        try {
            const response = await axios.get(`${[process.env.REACT_APP_BACKEND_HOST]}/users/current_logged_user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`,
                }
            })

            session = { ...session, user: response.data.user }
        } catch (error) {
            localStorage.removeItem('token')
    
            throw new Error("Impossivel recuperar usuario, é necessário fazer o login novamente.")
        }
    }    

    return session
}

export default loadData