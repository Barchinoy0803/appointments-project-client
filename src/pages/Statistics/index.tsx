import { memo, useState } from "react";
import Charts from "../../components/Charts";
import {
    getAppointmnetReport,
    getMostUsedServices,
    getToday,
    getTopBusinesses,
    getTopClients,
    getTopSpecialists
} from "./helpers";
import {
    useGetAppointmentsByDateQuery,
    useGetTopBusinessesQuery,
    useGetTopClientsQuery,
    useGetTopServicesQuery,
    useGetTopSpecialistsQuery
} from "../../service/api/statistics.api";
import { DatePickerProps, Typography, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import Loading from "../../components/Loading";

const Statistics = () => {
    const [start, setStartDate] = useState<string>("");
    const [end, setEndDate] = useState<string>("");

    const { data: topServiceData, isLoading } = useGetTopServicesQuery({});
    const { data: appointmentsData } = useGetAppointmentsByDateQuery({
        start: start || getToday(),
        end,
    });
    const { data: topClients } = useGetTopClientsQuery({});
    const { data: topSpecialists } = useGetTopSpecialistsQuery({});
    const { data: topBusinesses } = useGetTopBusinessesQuery({});

    const onChangeStart: DatePickerProps["onChange"] = (_, dateString) => {
        setStartDate(dateString as string);
    };

    const onChangeEnd: DatePickerProps["onChange"] = (_, dateString) => {
        setEndDate(dateString as string);
    };

    return (
        <div className="w-full flex justify-center h-full">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full px-8 py-5">
                    <h1 className="pb-5 text-3xl text-gray-600">Statistics</h1>
                    <div className="flex flex-col gap-16 w-full ">

                        <div className="flex gap-10 w-full">
                            <div className="h-[400px] w-1/2">
                                <Typography style={{ fontSize: 22, fontWeight: "600" }}>
                                    Top 10 Businesses
                                </Typography>
                                <Charts option={getTopBusinesses(topBusinesses)} />
                            </div>

                            <div className="flex flex-col w-1/2">
                                <Typography
                                    style={{
                                        textAlign: "center",
                                        fontSize: 22,
                                        fontWeight: "600",
                                        marginBottom: 20,
                                    }}
                                >
                                    Most Used Services
                                </Typography>

                                <Charts option={getMostUsedServices(topServiceData)} />
                            </div>
                        </div>

                        <div className="w-full">
                            <Charts option={getTopClients(topClients)} />
                        </div>

                        <div className="w-full">
                            <Charts option={getTopSpecialists(topSpecialists)} />
                        </div>

                        <div className="flex flex-col gap-5 w-full mb-4">
                            <Typography style={{ fontSize: 22, fontWeight: "600" }}>
                                Appointments Report
                            </Typography>

                            <Space direction="horizontal" size={12}>
                                <DatePicker
                                    defaultValue={dayjs()}
                                    placeholder="Start date"
                                    onChange={onChangeStart}
                                />
                                <DatePicker placeholder="End date" onChange={onChangeEnd} />
                            </Space>

                            <Charts option={getAppointmnetReport(appointmentsData?.statistics)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Statistics);
