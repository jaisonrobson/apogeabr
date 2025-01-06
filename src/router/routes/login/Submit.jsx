import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

const Submit = (props) => {
    const session = useRouteLoaderData("root")

    return (
        <div>
            {session?.token ? "Login Succeded" : "Login Failed"}
        </div>
    )
}

export default Submit