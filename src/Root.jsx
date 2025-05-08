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
import ProfileDonations from './router/routes/profile/donations/Index'
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
import AdminPanelNews from './router/routes/adminpanel/news/Index'
import AdminPanelPresentations from './router/routes/adminpanel/presentations/Index'
import AdminPanelCommuniques from './router/routes/adminpanel/communiques/Index'
import AdminPanelCharacters from './router/routes/adminpanel/characters/Index'
import AdminPanelVideos from './router/routes/adminpanel/videos/Index'
import AdminPanelImages from './router/routes/adminpanel/images/Index'

import {
    sessionLoader,
    charactersLoader,
    configurationLoader,
    adminpanelLoader,
    newsLoader,
    landingLoader,
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
    adminIconCreateSubmit,
    adminIconUpdateSubmit,
    adminLocationCreateSubmit,
    adminLocationUpdateSubmit,
    adminTraitCreateSubmit,
    adminTraitUpdateSubmit,
    adminEventCreateSubmit,
    adminEventUpdateSubmit,
    adminNatureCreateSubmit,
    adminNatureUpdateSubmit,
    adminNpcCreateSubmit,
    adminNpcUpdateSubmit,
    adminQuestCreateSubmit,
    adminQuestUpdateSubmit,
    adminAbilityCreateSubmit,
    adminAbilityUpdateSubmit,
    adminMonsterCreateSubmit,
    adminMonsterUpdateSubmit,
    adminItemCategoryCreateSubmit,
    adminItemCategoryUpdateSubmit,
    adminItemCreateSubmit,
    adminItemUpdateSubmit,
    adminNewsPostCreateSubmit,
    adminNewsPostUpdateSubmit,
    adminPresentationCreateSubmit,
    adminPresentationUpdateSubmit,
    adminCommuniqueCreateSubmit,
    adminCommuniqueUpdateSubmit,
    adminCharacterValidateSubmit,
    adminVideoValidateSubmit,
    adminImageValidateSubmit,
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
                id: "landing",
                loader: landingLoader,
                element: <Landing />,
            },
            {
                path: ROUTES.NEWS.path,
                id: "news",
                loader: newsLoader,
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
                                id: "configuration",
                                loader: configurationLoader,
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
                                path: ROUTES.USER_PROFILE_DONATIONS.path,
                                element: <ProfileDonations />,
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
                id: "adminpanel",
                loader: adminpanelLoader,
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
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS_CREATE_SUBMIT.path,
                                action: adminIconCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ICONS_UPDATE_SUBMIT.path,
                                action: adminIconUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS.path,
                                element: <AdminPanelLibraryAndMapLocations />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS_CREATE_SUBMIT.path,
                                action: adminLocationCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_LOCATIONS_UPDATE_SUBMIT.path,
                                action: adminLocationUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS.path,
                                element: <AdminPanelLibraryAndMapTraits />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS_CREATE_SUBMIT.path,
                                action: adminTraitCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_TRAITS_UPDATE_SUBMIT.path,
                                action: adminTraitUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS.path,
                                element: <AdminPanelLibraryAndMapEvents />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS_CREATE_SUBMIT.path,
                                action: adminEventCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_EVENTS_UPDATE_SUBMIT.path,
                                action: adminEventUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NATURES.path,
                                element: <AdminPanelLibraryAndMapNatures />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NATURES_CREATE_SUBMIT.path,
                                action: adminNatureCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NATURES_UPDATE_SUBMIT.path,
                                action: adminNatureUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS.path,
                                element: <AdminPanelLibraryAndMapNpcs />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS_CREATE_SUBMIT.path,
                                action: adminNpcCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_NPCS_UPDATE_SUBMIT.path,
                                action: adminNpcUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS.path,
                                element: <AdminPanelLibraryAndMapQuests />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS_CREATE_SUBMIT.path,
                                action: adminQuestCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_QUESTS_UPDATE_SUBMIT.path,
                                action: adminQuestUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES.path,
                                element: <AdminPanelLibraryAndMapAbilities />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES_CREATE_SUBMIT.path,
                                action: adminAbilityCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ABILITIES_UPDATE_SUBMIT.path,
                                action: adminAbilityUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS.path,
                                element: <AdminPanelLibraryAndMapMonsters />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS_CREATE_SUBMIT.path,
                                action: adminMonsterCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS_UPDATE_SUBMIT.path,
                                action: adminMonsterUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMCATEGORIES.path,
                                element: <AdminPanelLibraryAndMapItemCategories />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMCATEGORIES_CREATE_SUBMIT.path,
                                action: adminItemCategoryCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMCATEGORIES_UPDATE_SUBMIT.path,
                                action: adminItemCategoryUpdateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS.path,
                                element: <AdminPanelLibraryAndMapItems />,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS_CREATE_SUBMIT.path,
                                action: adminItemCreateSubmit,
                            },
                            {
                                path: ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_ITEMS_UPDATE_SUBMIT.path,
                                action: adminItemUpdateSubmit,
                            },
                        ],
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_NEWS.path,
                        element: <AdminPanelNews />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_NEWS_CREATE_SUBMIT.path,
                        action: adminNewsPostCreateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_NEWS_UPDATE_SUBMIT.path,
                        action: adminNewsPostUpdateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_PRESENTATIONS.path,
                        element: <AdminPanelPresentations />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_PRESENTATIONS_CREATE_SUBMIT.path,
                        action: adminPresentationCreateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_PRESENTATIONS_UPDATE_SUBMIT.path,
                        action: adminPresentationUpdateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_COMMUNIQUES.path,
                        element: <AdminPanelCommuniques />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_COMMUNIQUES_CREATE_SUBMIT.path,
                        action: adminCommuniqueCreateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_COMMUNIQUES_UPDATE_SUBMIT.path,
                        action: adminCommuniqueUpdateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_CHARACTERS.path,
                        element: <AdminPanelCharacters />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_CHARACTERS_VALIDATE_SUBMIT.path,
                        action: adminCharacterValidateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_VIDEOS.path,
                        element: <AdminPanelVideos />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_VIDEOS_VALIDATE_SUBMIT.path,
                        action: adminVideoValidateSubmit,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_IMAGES.path,
                        element: <AdminPanelImages />,
                    },
                    {
                        path: ROUTES.USER_ADMIN_PANEL_IMAGES_VALIDATE_SUBMIT.path,
                        action: adminImageValidateSubmit,
                    },
                ],
            }
        ],
    },      
])

const Root = (props) => <RouterProvider router={router} {...props} />

export default Root