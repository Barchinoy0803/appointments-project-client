import { Table } from 'antd'
import { ColumnType } from 'antd/es/table';

interface CustomTableProps<T> {
    data: T[];
    columns: ColumnType<T>[];
};

const CustomTable = <T,>({ data, columns }: CustomTableProps<T>) => {
    return (
        <div>
            <Table<T> columns={columns} dataSource={data} rowKey="id"/>
        </div>
    )
}

export default CustomTable;
