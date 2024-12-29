import { redirect } from 'react-router-dom'
import { getOrCreateSession, commitSession } from 'router/sessions/session'

const validateCredentials = async () => ({ id: 666 })

const action = async ({ request }) => {
    const session = await getOrCreateSession(request)
    const form = await request.formData()
    const login = form.get("login")
    const password = form.get("password")

    const userId = await validateCredentials(
        login,
        password
    )

    if (userId == null) {
        session.flash("error", "Invalid login/password")

        // Redirect back to the login page with errors.
        return redirect("/user/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        })
    }

    const oldUser = session.get("user")

    const newSession = { ...oldUser, isLogged: true, name: 'Test User', id: userId.id }

    session.set("user", newSession)

    // Login succeeded, send them to the home page.
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    })
}

export default action