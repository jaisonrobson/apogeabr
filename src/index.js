import './css/bootstrap.css'
import 'index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import Landing from './routes/landing/Landing'
import News from './routes/news/Index'
import Library from './routes/library/Index'
import Map from './routes/map/Index'
import About from './routes/about/Index'

const container = document.getElementById("root");
const root = createRoot(container);

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
])

root.render(<RouterProvider router={router} />)
