import { memo } from 'react'
import CustomTable from "../../components/Table"
import { useGetUsersQuery } from '../../service/api/user.api'

const Clients = () => {
    const {data: any} = useGetUsersQuery({})
    
    return (
        <div>
            <CustomTable/>
        </div>
    )
}

export default memo(Clients)