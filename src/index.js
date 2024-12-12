import './css/bootstrap.css'
import 'index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import Landing from './routes/landing/Landing'
import News from './routes/news/Index'
import Library from './routes/library/Index'
import Map from './routes/map/Index'

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        //errorElement: ,
        //loader: ,
        //action: ,
        //children: [],
    },
    {
        path: "/news/",
        element: <News />,
        //errorElement: ,
        //loader: ,
        //action: ,
        //children: [],
    },    
    {
        path: "/library/",
        element: <Library />,
        //errorElement: ,
        //loader: ,
        //action: ,
        //children: [],
    },    
    {
        path: "/map/",
        element: <Map />,
        //errorElement: ,
        //loader: ,
        //action: ,
        //children: [],
    },
])

root.render(<RouterProvider router={router} />)
