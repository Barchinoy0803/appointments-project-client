import { memo, useEffect, useState } from 'react'
import { Input } from 'antd';
import { useDebounceHook } from '../../hooks/useDebounceHook';
import { useParamsHook } from '../../hooks/useParamsHook';

const { Search } = Input;

const Navbar = () => {
    const [value, setValue] = useState<string>("")
    const searchValue = useDebounceHook(value)

    const { setParam } = useParamsHook()

    useEffect(() => {
        setParam("search", searchValue)
    }, [searchValue])

    return (
        <div className='px-5 py-4'>
            <Search value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search" enterButton style={{ width: 400 }} />
        </div>
    )
}

export default memo(Navbar)