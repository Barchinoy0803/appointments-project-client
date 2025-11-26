import { memo, useState } from 'react'
import CustomTable from '../../components/Table'
import { Appointment } from '../../types'
import { useGetAppointmentsQuery } from '../../service/api/appointment.api'
import { appointmentTableColumns, ITEMS_PER_PAGE, orderOptions, statusOptions } from '../../constants'
import { useParamsHook } from '../../hooks/useParamsHook'
import { Pagination, Select, Tooltip } from 'antd'

const Appointments = () => {
    const { getParam, setParam } = useParamsHook();
    const page = getParam("page") || "1";

    const [ordering, setOrdering] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const { data } = useGetAppointmentsQuery({ offset: (Number(page) - 1) * ITEMS_PER_PAGE, ordering, status })

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
            <CustomTable<Appointment> data={Array.isArray(data?.items) ? data.items : []} columns={appointmentTableColumns(Number(page))} />
            <div className='mt-6 flex justify-end fixed bottom-10 right-20'>
                <Pagination
                    current={Number(page)}
                    onChange={(value) => setParam("page", value.toString())}
                    pageSize={ITEMS_PER_PAGE}
                    total={data?.count}
                />
            </div>
        </div>
    )
}

export default memo(Appointments)
