import './css/bootstrap.css'
import 'index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createRoot } from 'react-dom/client';
import Landing from './routes/landing/Landing'

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
])

root.render(<RouterProvider router={router} />)
