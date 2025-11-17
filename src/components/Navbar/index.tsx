import { memo, useEffect, useMemo, useState } from 'react'
import { Input } from 'antd';
import { useDebounceHook } from '../../hooks/useDebounceHook';
import { useParamsHook } from '../../hooks/useParamsHook';
import { hideSearchInput } from '../../constants';
import { useLocation } from 'react-router-dom';

const { Search } = Input;

const Navbar = () => {
    const { pathname } = useLocation();
    console.log(location.pathname);

    // const url = window.location.href

    const [value, setValue] = useState<string>("")
    const searchValue = useDebounceHook(value)

    const { setParam } = useParamsHook()

    const hideSearch = useMemo(() => {
        return hideSearchInput.some((hideUrl) => pathname.includes(hideUrl))
    }, [pathname])

    useEffect(() => {
        setParam("search", searchValue)
    }, [searchValue])

    return (
        <div className='px-5 py-4'>
            {
                !hideSearch &&
                <Search value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search" enterButton style={{ width: 400 }} />

            }
            <div>test</div>
        </div>
    )
}

export default memo(Navbar)