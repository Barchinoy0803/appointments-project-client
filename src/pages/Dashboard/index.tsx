import { memo } from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Dashboard = () => {
    return (
        <div className='flex h-screen'>
            <Sidebar />

            <div className='flex flex-col flex-1 bg-white'>
                <Navbar />
                <div  className='flex-1 bg-gray-100 p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default memo(Dashboard);