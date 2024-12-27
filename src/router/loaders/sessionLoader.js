import React from 'react'

import { getOrCreateSession, commitSession, destroySession } from 'router/sessions/session'

const loadData = async ({ request }) => {
    const session = await getOrCreateSession(request)

    return session.data
}

export default loadData