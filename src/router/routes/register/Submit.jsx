import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

const Submit = (props) => {
    const session = useRouteLoaderData("root")

    return (
        <div>
            {session.user.isLogged ? "Registration Succeded" : "Registration Failed"}
        </div>
    )
}

export default Submit