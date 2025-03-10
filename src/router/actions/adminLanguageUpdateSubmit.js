import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const locale_id = form.get('locale_id')

    const requestValues = _.omit(Object.fromEntries(form.entries()), 'locale_id')
    
    const payload = { locale: requestValues }

    try {
        const response = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/locales/${locale_id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        setTimeout(() => {
            window.location.reload()
        }, 1500)
        

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path.slice(0, -1)}?success=${encodeURIComponent(JSON.stringify(response.data))}`)
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        setTimeout(() => {
            window.location.reload()
        }, 1500)

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}

export default action