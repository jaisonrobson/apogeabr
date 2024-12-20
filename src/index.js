import './css/bootstrap.css'
import 'index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client'

import Landing from './routes/landing/Index'
import News from './routes/news/Index'
import Library from './routes/library/Index'
import Map from './routes/map/Index'
import About from './routes/about/Index'
import HelpUs from './routes/helpus/Index'
import HallOfFame from './routes/halloffame/Index'
import Login from './routes/login/Index'

const container = document.getElementById("root")
const root = createRoot(container)

const router = createBrowserRouter([
    {
        path: "/",
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
        path: "/login/",
        element: <Login />,
    },
])

root.render(<RouterProvider router={router} />)
