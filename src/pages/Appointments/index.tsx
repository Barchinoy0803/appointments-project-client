import { memo, useEffect, useState } from 'react'
import CustomTable from '../../components/Table'
import { Appointment } from '../../types'
import { useGetAppointmentsQuery } from '../../service/api/appointment.api'
import { appointmentTableColumns, ITEMS_PER_PAGE, orderOptions, statusOptions } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Pagination, PaginationProps, Select, Tooltip } from 'antd'
import Loading from '../../components/Loading'

const Appointments = () => {
    const { getParam, setParam } = useParamsHook();
    const page = Number(getParam("page") || 1);

    const [ordering, setOrdering] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(ITEMS_PER_PAGE);

    const { data, isLoading } = useGetAppointmentsQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, ordering, status });

    useEffect(() => {
        setParam("limit", pageSize);
    }, [pageSize]);

    useEffect(() => {
        setParam("page", 1)
    }, [status, ordering]);

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
        setPageSize(size);
        setParam("page", current);
    };

    const onChange = (current: number) => {
        setParam('page', current);
    };

    return (
        <div className='h-full'>
            {
                isLoading ?
                    <Loading />
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
                            <Tooltip title="Status">
                                <Select
                                    value={status}
                                    onChange={(value) => setStatus(value)}
                                    defaultValue=""
                                    style={{ width: 160 }}
                                    options={[{ value: "", label: "All" }, ...statusOptions]}
                                />
                            </Tooltip>
                        </div>

                        <div className='overflow-y-auto max-h-[730px]'>
                            <CustomTable<Appointment> data={Array.isArray(data?.items) ? data.items : []} columns={appointmentTableColumns(Number(page))} />
                        </div>

                        <div className='mt-6 flex justify-end fixed bottom-10 right-20'>
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                defaultCurrent={1}
                                total={data?.totalCount}
                                onChange={onChange}
                                disabled={isLoading}
                            />
                        </div>
                    </>
            }
        </div>
    )
}

export default memo(Appointments);
