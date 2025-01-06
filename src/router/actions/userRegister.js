import { redirect } from 'react-router-dom'
import axios from 'axios'

const action = async ({ request }) => {
    const form = await request.formData()

    const login = form.get('login')
    const password = form.get('password')
    const email = form.get('email')
    const countryCode = form.get('country_code')

    const payload = { user: { login, password, email, countryCode } }

    try {
        const response = await axios.post(`${[process.env.REACT_APP_BACKEND_HOST]}/users`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return redirect(`/user/register?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`/user/register?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action