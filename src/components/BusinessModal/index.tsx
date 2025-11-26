import { Button, Form, FormInstance, Input, Modal, Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useGetOneBusinessesQuery } from '../../service/api/business.api';
import { skipToken } from '@reduxjs/toolkit/query';
import { ACTIONS, Business } from '../../types';
import { getBusinessTableTitle } from './helpers';
import { setButtonTitle } from '../Popup/helpers';
import { typeOptions } from '../../constants';
import { LocationPicker } from '../LocationPicker';
import { setBusinessModal } from '../../redux/features/modal.slice';

const { TextArea } = Input;

interface BusinessModalProps {
    onFinish: (values: Business) => void,
    loading: boolean,
    form: FormInstance<any>,
    position: number[] | null,
    setPosition:  Dispatch<SetStateAction<[number, number] | null>>
}

const BusinessModal = ({ onFinish, loading, form, position, setPosition }: BusinessModalProps) => {
    const { isOpen, type, id } = useSelector((state: RootState) => state.modal.businessModal)
    const dispatch = useDispatch()

    const { data: businessData } = useGetOneBusinessesQuery(id ?? skipToken)

    useEffect(() => {
        if (type === ACTIONS.EDIT && businessData) {
            form.setFieldsValue({ ...businessData, password: businessData.unhashed_password })
            setPosition([businessData.latitude, businessData.longitude])
        }
    }, [businessData, type])

    const handleCancel = () => {
        dispatch(setBusinessModal({ isOpen: false }))
        form.resetFields()
    }

    return (
        <>
            <Modal
                title={getBusinessTableTitle(type!)}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpen}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true, type: "clinic", is_active: "Active" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <>
                        <Form.Item<Business>
                            label="Title"
                            name="name"
                            rules={[{ required: true, message: 'Please input business name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Business>
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please select role!' }]}
                        >
                            <Select>
                                {
                                    typeOptions.map((type) => (
                                        <Select.Option value={type.value}>{type.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item<Business>
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input business address!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Business>
                            label="Contact"
                            name="contact"
                            rules={[{ required: true, message: 'Please input business contact' }]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Business>
                            label="Opening hours"
                            name="opening_hours"
                            rules={[{ required: true, message: 'Please input business contact' }]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<Business>
                            label="Active"
                            name="is_active"
                            rules={[{ required: true, message: 'Please select role!' }]}
                        >
                            <Select>
                                <Select.Option value={true}>Active</Select.Option>
                                <Select.Option value={false}>Inactive</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item<Business>
                            label="Description"
                            name="description"
                        >
                            <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item>
                            <LocationPicker position={position as any} setPosition={setPosition} />
                        </Form.Item>
                    </>

                    <Form.Item
                        label={null}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            {setButtonTitle(type!)}
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}

export default BusinessModal
