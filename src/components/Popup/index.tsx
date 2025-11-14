import { Button, Form, FormInstance, Input, Modal, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setUsersModal } from '../../redux/features/modal.slice';
import { ACTIONS, FieldType } from '../../types';
import { roleOptions } from '../../constants';
import { getUserModalTitle, setButtonTitle } from './helpers';
import { useGetOneUserQuery } from '../../service/api/user.api';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { userDataValidation } from '../../validations/user.validation';

interface CustomModalProps {
    onFinish: (values: FieldType) => void,
    loading: boolean,
    form: FormInstance<any>
}

const CustomModal = ({ onFinish,  loading, form }: CustomModalProps) => {
    const { isOpen, type, id } = useSelector((state: RootState) => state.modalSlice.usersModal)
    const dispatch = useDispatch()

    const { data: userData } = useGetOneUserQuery(id ?? skipToken)

    useEffect(() => {
        if (type === ACTIONS.EDIT && userData) {
            form.setFieldsValue({...userData, password: userData.unhashed_password})
        }
    }, [userData, type])

    const handleCancel = () => {
        dispatch(setUsersModal({ isOpen: false }))
        form.resetFields()
    }

    return (
        <>
            <Modal
                title={getUserModalTitle(type!)}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpen}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true, role: "admin" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    {
                        type === ACTIONS.CREATE || type === ACTIONS.EDIT ?
                            <>
                                <Form.Item<FieldType>
                                    label="First name"
                                    name="first_name"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Last name"
                                    name="last_name"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Phone number"
                                    name="phone_number"
                                    rules={userDataValidation.phone_number}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Password"
                                    name="password"
                                    rules={userDataValidation.password}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Role"
                                    name="role"
                                    rules={[{ required: true, message: 'Please select role!' }]}
                                >
                                    <Select>
                                        {
                                            roleOptions.map((role) => (
                                                <Select.Option value={role.value}>{role.label}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </>
                            :
                            <Typography style={{ fontSize: 18 }}>Are you sure delete?</Typography>
                    }

                    <Form.Item
                        label={null}
                    >
                        {type === ACTIONS.DELETE ? (
                            <div className='flex gap-4 justify-end pt-3'>
                                <Button
                                    type="default"
                                    className="w-1/2"
                                    loading={loading}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    danger
                                    className="w-1/2"
                                    loading={loading}
                                >
                                    {setButtonTitle(type!)}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                {setButtonTitle(type!)}
                            </Button>
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default CustomModal;