import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { useEffect, useMemo } from "react"
import { validateToken } from "../../helpers"
import Dashboard from "../Dashboard"
import Login from "../Auth"
import { logout } from "../../redux/features/user.slice"

const Private = () => {
    const { token } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();

    const isAuthenticated = useMemo(() => {
        return validateToken(token)
    }, [token]);

    useEffect(() => {
        if(!isAuthenticated) {
            dispatch(logout())
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Dashboard /> : <Login />
}

export default Private;
