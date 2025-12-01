import { memo, useState } from "react";
import Charts from "../../components/Charts";
import { getAppointmnetReport, getMostUsedServices, getToday } from "./helpers";
import { useGetAppointmentsByDateQuery, useGetTopServicesQuery } from "../../service/api/statistics.api";
import { DatePickerProps, Spin, Typography } from "antd";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";

const Statistics = () => {
    const [start, setStartDate] = useState<string | string[]>("")
    const [end, setEndDate] = useState<string | string[]>("")

    const { data: topServiceData, isLoading } = useGetTopServicesQuery({})
    const { data: appointmentsData } = useGetAppointmentsByDateQuery({ start: start || getToday(), end })

    const onChangeStart: DatePickerProps['onChange'] = (_, dateString) => {
        setStartDate(dateString)
    };

    const onChangeEnd: DatePickerProps['onChange'] = (_, dateString) => {
        setEndDate(dateString)
    };

    return (
        <div className="w-full h-[500px] flex justify-center gap-5 items-center">
            {
                isLoading ?
                    <div className="flex items-center justify-center min-h-[900px]">
                        <Spin size="large" />
                    </div>
                    :
                    <>
                        <div className="flex flex-col gap-5 w-1/2">
                            <Typography style={{ textAlign: 'left', fontSize: 22, fontWeight: '600' }}>Weekly Appointments Report</Typography>
                            <Space direction="horizontal" size={12}>
                                <DatePicker defaultValue={dayjs()} placeholder="Start date" onChange={onChangeStart} />
                                <DatePicker placeholder="End date" onChange={onChangeEnd} />
                            </Space>
                            <Charts option={getAppointmnetReport(appointmentsData?.statistics)} />
                        </div>
                        <div className="w-1/2">
                            <Typography style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', marginBottom: 68 }}>Most Used Services</Typography>
                            <Charts option={getMostUsedServices(topServiceData)} />
                        </div>
                    </>
            }
        </div>
    );
}

export default memo(Statistics);
