import { memo, useState } from 'react'
import CustomTable from "../../components/Table"
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../service/api/user.api'
import { ITEMS_PER_PAGE, orderOptions, roleOptions, userTableColumns } from "../../constants/index"
import { ACTIONS, FieldType, User } from "../../types/index"
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { setUsersModal } from '../../redux/features/modal.slice'
import CustomModal from '../../components/Popup'
import { Button, Form, FormProps, Modal, Pagination, PaginationProps, Select, Spin, Tooltip } from 'antd';
import { RootState } from '../../redux'
import { getErrors } from './helpers'
import toast from 'react-hot-toast'
import { useParamsHook } from '../../hooks/useParamsHook'

const Clients = () => {
    const [form] = Form.useForm<FieldType>();

    const { getParam, setParam } = useParamsHook();
    const page = getParam("page") || "1"
    const search = getParam("search") || ""
    setParam("limit", 10)

    const [role, setRole] = useState<string>("")
    const [ordering, setOrdering] = useState<string>("")
    const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE)

    const { data, isLoading: userLoading } = useGetUsersQuery({ limit: pageSize, page, search, role, ordering })
    const [createUser, { isLoading }] = useCreateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const dispatch = useDispatch()
    const { type, id } = useSelector((state: RootState) => state.modal.usersModal)

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
    };

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPageSize(pageSize)
        setParam("page", current)
        setParam("limit", pageSize)
    };

    const onChange = (current: number) => {
        setParam('page', current)
    }

    return (
        <div>
            {
                userLoading ? <div className="flex justify-center p-6 text-xl">
                    <Spin size="large" />
                </div>
                    :
                    <>
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
                        <div className='mt-6 flex justify-end fixed bottom-10 right-20'>
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                defaultCurrent={1}
                                total={data?.totalCount}
                                onChange={onChange}
                                disabled={userLoading}
                            />
                        </div>
                        <CustomModal onFinish={onFinish} loading={isLoading} form={form} />
                    </>
            }
        </div>
    )
}

export default memo(Clients);
