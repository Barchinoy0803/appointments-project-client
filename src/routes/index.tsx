import { useRoutes } from "react-router-dom"
import Statistics from "../pages/Statistics"
import Clients from "../pages/Clients"
import Profile from "../pages/Profile"
import Appointments from "../pages/Appointments"
import Service from "../pages/Service"
import Businesses from "../pages/Business"
import Login from "../pages/Auth"
import Private from "../pages/Private"
import Detail from "../pages/Business/Detail"
import ServiceDetail from "../pages/Service/Detail"

const MainRouter = () => {
    return (
        useRoutes([
            { path: "login", element: <Login /> },
            {
                path: "/", element: <Private />,
                children: [
                    { path: "statistics", element: <Statistics /> },
                    { path: "appointments", element: <Appointments /> },
                    { path: "services", element: <Service /> },
                    { path: "service/:id", element: <ServiceDetail /> },
                    { path: "businesses", element: <Businesses /> },
                    { path: "business/:id", element: <Detail /> },
                    { path: "users", element: <Clients /> },
                    { index: true, element: <Profile /> },
                    { path: "profile", element: <Profile /> },
                ]
            }
        ])
    )
}

export default MainRouter;
