import { createCookieSessionStorage } from "react-router"

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        // a Cookie from `createCookie` or the CookieOptions to create one
        cookie: {
            name: "__session",
            secure: false,
            httpOnly: true,
            maxAge: 15 * 60,
            path: "/",
            sameSite: "lax",
            secrets: [process.env.SESSION_SECRET],
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