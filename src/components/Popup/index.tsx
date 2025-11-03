import { Button, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { setUsersModal } from '../../redux/features/modal.slice';
import { FieldType } from '../../types';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';

interface CustomModalProps {
    onFinish: (values: FieldType) => void,
    onFinishFailed: (errorInfo: ValidateErrorEntity<FieldType>) => void,
    loading: boolean
}

const CustomModal = ({ onFinish, onFinishFailed, loading }: CustomModalProps) => {
    const { isOpen } = useSelector((state: RootState) => state.modalSlice.usersModal)
    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(setUsersModal({ isOpen: false }))
    }


    return (
        <>
            <Modal
                title="Create Users"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpen}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true, role: "admin" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
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
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select role!' }]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="client">Client</Select.Option>
                            <Select.Option value="specialist">Specialist</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full' loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CustomModal;