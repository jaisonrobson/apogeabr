import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Landing from './router/routes/landing/Index'
import News from './router/routes/news/Index'
import Library from './router/routes/library/Index'
import Map from './router/routes/map/Index'
import About from './router/routes/about/Index'
import HelpUs from './router/routes/helpus/Index'
import HallOfFame from './router/routes/halloffame/Index'
import Login from './router/routes/login/Index'
import Register from './router/routes/register/Index'
import Profile from './router/routes/profile/Index'

import { sessionLoader } from 'router/loaders'

const router = createBrowserRouter([
    {
        path: "/",
        loader: sessionLoader,
        id: "root",
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/news/",
                element: <News />,
            },
            {
                path: "/library/",
                element: <Library />,
            },
            {
                path: "/map/",
                element: <Map />,
            },
            {
                path: "/about/",
                element: <About />,
            },
            {
                path: "/helpus/",
                element: <HelpUs />,
            },
            {
                path: "/halloffame/",
                element: <HallOfFame />,
            },
            {
                path: "/user/",
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                    {
                        path: "profile/",
                        element: <Profile />,
                    },
                    {
                        path: "register/",
                        element: <Register />,
                    },
                ]
            },  
        ],
    },      
])

const Root = (props) => (
    <RouterProvider router={router} {...props} />
)

export default Root