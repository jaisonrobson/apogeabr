import { redirect } from 'react-router-dom'
import axios from 'axios'

const action = async ({ request }) => {
    const form = await request.formData()

    try {
        const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/login`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        localStorage.setItem('token', response.data.token)

        return redirect(`/`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`/user?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action