import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useState } from 'react';

interface PasswordViewerProps {
    password: string;
};

const PasswordViewer = ({password}: PasswordViewerProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className='flex items-center justify-between'>
            <span>{visible ? password : "••••••••"}</span>

            <span onClick={() => setVisible(!visible)} className='cursor-pointer'>
                {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
        </div>
    );
}

export default PasswordViewer;
