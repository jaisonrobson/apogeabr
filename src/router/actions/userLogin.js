import { redirect } from 'react-router-dom'
import axios from 'axios'

const action = async ({ request }) => {
    const form = await request.formData()

    try {
        const response = await axios.post('http://localhost:3001/login', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response)
        
        if (response == null)
            return redirect("/user/")

        localStorage.setItem('token', response.token)
        return redirect("/")
    } catch (error) {
        return redirect("/user/")
    }    
}

export default action