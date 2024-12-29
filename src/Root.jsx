import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorBoundary from "router/routes/error/Index"
import NotFound from './router/routes/404/Index'

import Landing from './router/routes/landing/Index'
import News from './router/routes/news/Index'
import Library from './router/routes/library/Index'
import Map from './router/routes/map/Index'
import About from './router/routes/about/Index'
import HelpUs from './router/routes/helpus/Index'
import HallOfFame from './router/routes/halloffame/Index'
import Login from './router/routes/login/Index'
import LoginSubmit from './router/routes/login/Submit'
import Register from './router/routes/register/Index'
import Profile from './router/routes/profile/Index'

import { sessionLoader } from 'router/loaders'
import { userLogin } from "router/actions"

const router = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        loader: sessionLoader,        
        id: "root",
        errorElement: <ErrorBoundary />,
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
                        path: "login/submit/",
                        action: userLogin,
                        element: <LoginSubmit />,
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

const Root = (props) => <RouterProvider router={router} {...props} />

export default Root