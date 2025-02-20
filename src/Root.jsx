import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorBoundary from "router/routes/error/Index"
import NotFound from './router/routes/404/Index'

import Landing from './router/routes/landing/Index'
import News from './router/routes/news/Index'
import Library from './router/routes/library/Index'
import MapPage from './router/routes/map/Index'
import About from './router/routes/about/Index'
import HelpUs from './router/routes/helpus/Index'
import HallOfFame from './router/routes/halloffame/Index'
import Login from './router/routes/login/Index'
import Register from './router/routes/register/Index'
import Profile from './router/routes/profile/Index'
import ProfileOverview from './router/routes/profile/overview/Index'
import ProfileConfiguration from './router/routes/profile/configuration/Index'
import ProfileCharacters from './router/routes/profile/characters/Index'
import ProfileCharactersCreate from './router/routes/profile/characters/Create'
import ProfileCharactersUpdate from './router/routes/profile/characters/Update'
import ProfileAffiliated from './router/routes/profile/affiliated/Index'
import ProfileImages from './router/routes/profile/images/Index'
import ProfileVideos from './router/routes/profile/videos/Index'

import {
    sessionLoader,
    charactersLoader,
} from 'router/loaders'

import {
    userConfigurationSubmit,
    userLogin,
    userRegister,
    userProfileCharacterCreationSubmit,
    userProfileCharacterUpdateSubmit,
    userImageSubmit,
    userVideoSubmit,
} from "router/actions"

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
                element: <MapPage />,
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
                                path: ROUTES.USER_PROFILE_CONFIGURATION_SUBMIT.path,
                                action: userConfigurationSubmit,
                            },
                            {
                                path: ROUTES.USER_PROFILE_CHARACTERS.path,
                                loader: charactersLoader,
                                id: "characters",
                                children: [
                                    {
                                        index: true,
                                        element: <ProfileCharacters />,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_CHARACTERS_CREATE.path,
                                        element: <ProfileCharactersCreate />,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_CHARACTERS_CREATE_SUBMIT.path,
                                        action: userProfileCharacterCreationSubmit,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_CHARACTERS_UPDATE.path,
                                        element: <ProfileCharactersUpdate />,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_CHARACTERS_UPDATE_SUBMIT.path,
                                        action: userProfileCharacterUpdateSubmit,
                                    },
                                ],
                            },
                            {
                                path: ROUTES.USER_PROFILE_AFFILIATED.path,
                                element: <ProfileAffiliated />,
                            },
                            {
                                path: ROUTES.USER_PROFILE_IMAGES.path,
                                children: [
                                    {
                                        index: true,
                                        element: <ProfileImages />,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_IMAGES_SUBMIT.path,
                                        action: userImageSubmit,
                                    },
                                ],
                            },
                            {
                                path: ROUTES.USER_PROFILE_VIDEOS.path,
                                children: [
                                    {
                                        index: true,
                                        element: <ProfileVideos />,
                                    },
                                    {
                                        path: ROUTES.USER_PROFILE_VIDEOS_SUBMIT.path,
                                        action: userVideoSubmit,
                                    },
                                ],
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
                    },
                ],
            },
        ],
    },      
])

const Root = (props) => <RouterProvider router={router} {...props} />

export default Root