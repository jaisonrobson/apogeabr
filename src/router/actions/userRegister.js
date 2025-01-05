import { redirect } from 'react-router-dom'
import axios from 'axios'

const validateCredentials = async () => ({ id: 666 })

const action = async ({ request }) => {
    const form = await request.formData()

    const login = form.get('login')
    const password = form.get('password')
    const email = form.get('email')
    const countryCode = form.get('country_code')

    const payload = { user: { login, password, email, countryCode } }

    try {
        const response = await axios.post('http://localhost:3001/users', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response)
        
        if (response == null)
            return redirect("/user/register/")        

        return redirect("/user/")
    } catch (error) {
        return redirect("/user/register/")
    }    
}

export default action