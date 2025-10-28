import { memo } from 'react'
import { Input} from 'antd';

const { Search } = Input;

const Navbar = () => {
    return (
        <div className='px-5 py-4'>
            <Search placeholder="Search" enterButton style={{width: 400}}/>
        </div>
    )
}

export default memo(Navbar)