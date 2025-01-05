import { createCookieSessionStorage } from "react-router"

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        cookie: {
            name: "__session",
            secure: false,
            httpOnly: false,
            maxAge: 15 * 60,
            path: "/",
            sameSite: "lax",
            secrets: [process.env.REACT_APP_SESSION_SECRET],
        },
    })

const getOrCreateSession = async (request) => {
    const cookieHeader = request.headers.get("Cookie")
    const session = await getSession(cookieHeader)

    if (!session.has("user")) {
        session.set("user", { isLogged: false, name: 'guest', id: -1 })
    }

    return session
}

export { getOrCreateSession, commitSession, destroySession }