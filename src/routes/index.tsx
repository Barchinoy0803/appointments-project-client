import { useRoutes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Booking from "../pages/Booking"
import Statistics from "../pages/Statistics"
import Services from "../pages/Services"
import Clients from "../pages/Clients"
import Profile from "../pages/Profile"

const MainRouter = () => {
    return (
        useRoutes([
            {
                path: "/dashboard", element: <Dashboard />, 
                children: [
                    { path: "booking", element: <Booking /> },
                    { path: "statistics", element: <Statistics /> },
                    { path: "services", element: <Services /> },
                    { path: "expert", element: <Clients /> },
                    { path: "client", element: <Clients /> },
                    { path: "profile", element: <Profile /> },
                ]
            }
        ])
    )
}

export default MainRouter
