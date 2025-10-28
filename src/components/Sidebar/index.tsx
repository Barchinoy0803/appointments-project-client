import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { SidebarItems } from '../../constants';

const Sidebar = () => {
    return (
        <div className='h-full w-[300px] flex flex-col gap-2 p-4  shadow shadow-gray-300'>
            <div className='px-3 text-3xl font-semibold text-[#3B82F6]'>
                Dashboard   
            </div>
            {SidebarItems.map((item) => (
                <NavLink
                    key={item.title}
                    to={item.link}
                    className={({ isActive }) =>
                        `flex gap-3 items-center p-3 rounded-lg transition-all duration-200
                        ${isActive ? 'bg-[#3B82F6] text-white' : 'text-gray-700 hover:bg-blue-100'}`
                    }
                >
                    <span className='text-xl'>  {item.icon}</span>
                    <span className='font-medium'>{item.title}</span>
                </NavLink>
            ))}
        </div>
    )
}

export default memo(Sidebar)
