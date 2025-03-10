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
import ProfilePayments from './router/routes/profile/payments/Index'
import ProfileConfiguration from './router/routes/profile/configuration/Index'
import ProfileCharacters from './router/routes/profile/characters/Index'
import ProfileCharactersCreate from './router/routes/profile/characters/Create'
import ProfileCharactersUpdate from './router/routes/profile/characters/Update'
import ProfileAffiliated from './router/routes/profile/affiliated/Index'
import ProfileImages from './router/routes/profile/images/Index'
import ProfileVideos from './router/routes/profile/videos/Index'
import AdminPanel from './router/routes/adminpanel/Index'
import AdminPanelOverview from './router/routes/adminpanel/overview/Index'
import AdminPanelLibraryAndMap from './router/routes/adminpanel/libraryandmap/Index'
import AdminPanelLibraryAndMapLanguages from './router/routes/adminpanel/libraryandmap/languages/Index'
import AdminPanelLibraryAndMapIcons from './router/routes/adminpanel/libraryandmap/icons/Index'
import AdminPanelLibraryAndMapLocations from './router/routes/adminpanel/libraryandmap/locations/Index'
import AdminPanelLibraryAndMapTraits from './router/routes/adminpanel/libraryandmap/traits/Index'
import AdminPanelLibraryAndMapEvents from './router/routes/adminpanel/libraryandmap/events/Index'
import AdminPanelLibraryAndMapNatures from './router/routes/adminpanel/libraryandmap/natures/Index'
import AdminPanelLibraryAndMapNpcs from './router/routes/adminpanel/libraryandmap/npcs/Index'
import AdminPanelLibraryAndMapQuests from './router/routes/adminpanel/libraryandmap/quests/Index'
import AdminPanelLibraryAndMapAbilities from './router/routes/adminpanel/libraryandmap/abilities/Index'
import AdminPanelLibraryAndMapMonsters from './router/routes/adminpanel/libraryandmap/monsters/Index'
import AdminPanelLibraryAndMapItemCategories from './router/routes/adminpanel/libraryandmap/itemcategories/Index'
import AdminPanelLibraryAndMapItems from './router/routes/adminpanel/libraryandmap/items/Index'


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
    adminLanguageCreateSubmit,
    adminLanguageUpdateSubmit,
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
                                path: ROUTES.USER_PROFILE_PAYMENTS.path,
                                element: <ProfilePayments />,
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
            {
                path: ROUTES.USER_ADMIN_PANEL.path,
                element: <AdminPanel />,
                children: [
                    {
                        index: true,
                        element: <AdminPanelOverview />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_OVERVIEW.path,
                        element: <AdminPanelOverview />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP.path,
                        element: <AdminPanelLibraryAndMap />,
                        children: [
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES.path,
                                element: <AdminPanelLibraryAndMapLanguages />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES_CREATE_SUBMIT.path,
                                action: adminLanguageCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LANGUAGES_UPDATE_SUBMIT.path,
                                action: adminLanguageUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS.path,
                                element: <AdminPanelLibraryAndMapIcons />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS.path,
                                element: <AdminPanelLibraryAndMapLocations />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path,
                                element: <AdminPanelLibraryAndMapTraits />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS.path,
                                element: <AdminPanelLibraryAndMapEvents />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NATURES.path,
                                element: <AdminPanelLibraryAndMapNatures />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS.path,
                                element: <AdminPanelLibraryAndMapNpcs />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS.path,
                                element: <AdminPanelLibraryAndMapQuests />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES.path,
                                element: <AdminPanelLibraryAndMapAbilities />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS.path,
                                element: <AdminPanelLibraryAndMapMonsters />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMCATEGORIES.path,
                                element: <AdminPanelLibraryAndMapItemCategories />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path,
                                element: <AdminPanelLibraryAndMapItems />,
                            },
                        ],
                    },
                ],
            }
        ],
    },      
])

const Root = (props) => <RouterProvider router={router} {...props} />

export default Root