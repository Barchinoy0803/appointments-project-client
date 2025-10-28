import { Space, Table, Tag } from 'antd'
import { memo } from 'react'
import type { TableProps } from 'antd';
import { DataType } from '../../types';

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {
                    tags === "specialist" ?
                        <Tag color={'orange'} key={tags}>
                            {tags.toUpperCase()}
                        </Tag> :
                        <Tag color={'blue'} key={tags}>
                            {tags.toUpperCase()}
                        </Tag>
                }

            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        phoneNumber: "+998 88 789 65 54",
        address: 'New York No. 1 Lake Park',
        tags: "specialist",
    },
    {
        key: '2',
        name: 'Jim Green',
        phoneNumber: "+998 78 456 32 12",
        address: 'London No. 1 Lake Park',
        tags: "client",
    },
    {
        key: '3',
        name: 'Joe Black',
        phoneNumber: "+998 50 456 78 96",
        address: 'Sydney No. 1 Lake Park',
        tags: "client",
    },
    {
        key: '4',
        name: 'Joe Down',
        phoneNumber: "+998 99 896 63 32",
        address: 'Sydney No. 1 Lake Park',
        tags: "specialist",
    },
];


const CustomTable = () => {
    return (
        <div>
            <Table<DataType> columns={columns} dataSource={data} />
        </div>
    )
}

export default memo(CustomTable)