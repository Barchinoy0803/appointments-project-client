import { useRoutes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Booking from "../pages/Booking"
import Statistics from "../pages/Statistics"
import Clients from "../pages/Clients"
import Profile from "../pages/Profile"

const MainRouter = () => {
    return (
        useRoutes([
            {
                path: "/", element: <Dashboard />,
                children: [
                    { index: true, element: <Statistics /> },
                    { path: "statistics", element: <Statistics /> },
                    { path: "booking", element: <Booking /> },
                    { path: "users", element: <Clients /> },
                    { path: "profile", element: <Profile /> },
                ]
            }
        ])
    )
}

export default MainRouter
