import { useRoutes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Statistics from "../pages/Statistics"
import Clients from "../pages/Clients"
import Profile from "../pages/Profile"
import Appointments from "../pages/Appointments"
import Service from "../pages/Service"
import Businesses from "../pages/Business"

const MainRouter = () => {
    return (
        useRoutes([
            {
                path: "/", element: <Dashboard />,
                children: [
                    { index: true, element: <Statistics /> },
                    { path: "statistics", element: <Statistics /> },
                    { path: "appointments", element: <Appointments /> },
                    { path: "services", element: <Service /> },
                    { path: "businesses", element: <Businesses /> },
                    { path: "users", element: <Clients /> },
                    { path: "profile", element: <Profile /> },
                ]
            }
        ])
    )
}

export default MainRouter
