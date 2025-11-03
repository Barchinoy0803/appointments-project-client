import { memo } from 'react'
import CustomTable from "../../components/Table"
import { useCreateUserMutation, useGetUsersQuery } from '../../service/api/user.api'
import { userTableColumns } from "../../constants/index"
import { ACTIONS, FieldType, User } from "../../types/index"
import { FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { setUsersModal } from '../../redux/features/modal.slice'
import CustomModal from '../../components/Popup'
import { Button, FormProps } from 'antd';

const Clients = () => {
    const dispatch = useDispatch()
    const { data } = useGetUsersQuery({})
    const [createUser, { isLoading }] = useCreateUserMutation()

    const handleOpenModal = () => {
        dispatch(setUsersModal({ isOpen: true, type: ACTIONS.CREATE }))
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await createUser(values).unwrap()
            dispatch(setUsersModal({ isOpen: false }))
        } catch (error) {
            console.log(error);
        }

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <div className='flex justify-end p-4 items-center'>
                <Button onClick={handleOpenModal} type="default" icon={<FaPlus />} iconPosition={'start'}>
                    Add
                </Button>
            </div>
            <CustomTable<User> data={data} columns={userTableColumns(dispatch)} key={data?.id}/>
            <CustomModal onFinish={onFinish} onFinishFailed={onFinishFailed} loading={isLoading} />
        </div>
    )
}

export default memo(Clients);
