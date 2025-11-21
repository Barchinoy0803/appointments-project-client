import { memo, useState } from 'react'
import CustomTable from "../../components/Table"
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../service/api/user.api'
import { ITEMS_PER_PAGE, orderOptions, roleOptions, userTableColumns } from "../../constants/index"
import { ACTIONS, FieldType, User } from "../../types/index"
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { setUsersModal } from '../../redux/features/modal.slice'
import CustomModal from '../../components/Popup'
import { Button, Form, FormProps, Modal, Pagination, Select, Spin, Tooltip } from 'antd';
import { RootState } from '../../redux'
import { getErrors } from './helpers'
import toast from 'react-hot-toast'
import { useParamsHook } from '../../hooks/useParamsHook'
import { LoadingOutlined } from '@ant-design/icons'

const Clients = () => {
    const [form] = Form.useForm<FieldType>();

    const { getParam, setParam } = useParamsHook();
    const page = getParam("page") || "1"
    const search = getParam("search") || ""

    const [role, setRole] = useState<string>("")
    const [ordering, setOrdering] = useState<string>("")

    const { data, isLoading: userLoading } = useGetUsersQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, search, role, ordering })
    const [createUser, { isLoading }] = useCreateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const dispatch = useDispatch()
    const { type, id } = useSelector((state: RootState) => state.modalSlice.usersModal)

    const handleOpenModal = () => {
        dispatch(setUsersModal({ isOpen: true, type: ACTIONS.CREATE }))
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (type === ACTIONS.EDIT) {
                await updateUser({ id, body: values }).unwrap()
                toast.success("Successfully updated")
            } else {
                await createUser(values).unwrap()
                toast.success("Successfully created")
            }
            dispatch(setUsersModal({ isOpen: false }))
        } catch (error: any) {
            form.setFields(getErrors(error.data))
        }
        form.resetFields()
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Are you sure you want to delete this user?",
            okText: "Yes, delete",
            cancelText: "Cancel",
            okType: "danger",
            onOk: async () => {
                try {
                    await deleteUser(id).unwrap()
                    toast.success("Successfully deleted")
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }

    if (userLoading) return
    <div className="p-6 text-xl">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
    return (
        <div>
            <div className='flex gap-5 justify-end p-4 items-center'>
                <Tooltip title="Date">
                    <Select
                        value={ordering}
                        onChange={(value) => setOrdering(value)}
                        defaultValue=""
                        style={{ width: 160 }}
                        options={[{ value: "", label: "All" }, ...orderOptions]}
                    />
                </Tooltip>
                <Tooltip title="Role">
                    <Select
                        value={role}
                        onChange={(value) => setRole(value)}
                        defaultValue=""
                        style={{ width: 160 }}
                        options={[{ value: "", label: "All" }, ...roleOptions]}
                    />
                </Tooltip>


                <Button onClick={handleOpenModal} type="default" icon={<FaPlus />} iconPosition={'start'}>
                    Add
                </Button>
            </div>

            <CustomTable<User> data={Array.isArray(data?.items) ? data.items : []} columns={userTableColumns(dispatch, handleDelete, Number(page))} key={data?.id} />
            <div className='mt-6 flex justify-end'>
                <Pagination
                    current={Number(page)}
                    onChange={(value) => setParam("page", value.toString())}
                    pageSize={ITEMS_PER_PAGE}
                    total={data?.count}
                />
            </div>
            <CustomModal onFinish={onFinish} loading={isLoading} form={form} />
        </div>
    )
}

export default memo(Clients);
