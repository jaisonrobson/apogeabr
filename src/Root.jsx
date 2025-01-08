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
import RegisterSubmit from './router/routes/register/Submit'
import Profile from './router/routes/profile/Index'
import ProfileOverview from './router/routes/profile/Overview'
import ProfileConfiguration from './router/routes/profile/Configuration'
import ProfileCharacters from './router/routes/profile/Characters'
import ProfileAffiliated from './router/routes/profile/Affiliated'
import ProfileImages from './router/routes/profile/Images'
import ProfileVideos from './router/routes/profile/Videos'

import { sessionLoader } from 'router/loaders'
import { userLogin } from "router/actions"
import { userRegister } from "router/actions"

import ROUTES from 'router/routes'

const router = createBrowserRouter([
    {
        path: ROUTES.NOTFOUND.path,
        element: <NotFound />,
    },
    {
        path: ROUTES.HOME.path,
        loader: sessionLoader,        
        id: "root",
        errorElement: <ErrorBoundary />,
        children: [            
            {
                index: true,
                element: <Landing />,
            },            
            {
                path: ROUTES.NEWS.path,
                element: <News />,
            },
            {
                path: ROUTES.LIBRARY.path,
                element: <Library />,
            },
            {
                path: ROUTES.MAP.path,
                element: <Map />,
            },
            {
                path: ROUTES.ABOUT.path,
                element: <About />,
            },
            {
                path: ROUTES.HELP_US.path,
                element: <HelpUs />,
            },
            {
                path: ROUTES.HALL_OF_FAME.path,
                element: <HallOfFame />,
            },
            {
                path: ROUTES.USER_LOGIN.path,
                children: [
                    {
                        index: true,
                        element: <Login />,
                    },
                    {
                        path: ROUTES.USER_LOGIN_SUBMIT.path,
                        action: userLogin,
                        element: <LoginSubmit />,
                    },
                    {
                        path: ROUTES.USER_PROFILE.path,
                        element: <Profile />,
                        children: [
                            {
                                index: true,
                                element: <ProfileOverview />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_OVERVIEW.path,
                                element: <ProfileOverview />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_CONFIGURATION.path,
                                element: <ProfileConfiguration />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_CHARACTERS.path,
                                element: <ProfileCharacters />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_AFFILIATED.path,
                                element: <ProfileAffiliated />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_IMAGES.path,
                                element: <ProfileImages />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_VIDEOS.path,
                                element: <ProfileVideos />,
                            },
                        ],
                    },
                    {
                        path: ROUTES.USER_REGISTER.path,
                        element: <Register />,
                    },
                    {
                        path: ROUTES.USER_REGISTER_SUBMIT.path,
                        action: userRegister,
                        element: <RegisterSubmit />,
                    },
                ],
            },
        ],
    },      
])

const Root = (props) => <RouterProvider router={router} {...props} />

export default Root