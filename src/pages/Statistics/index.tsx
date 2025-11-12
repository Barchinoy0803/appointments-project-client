import { memo } from "react";
import Charts from "../../components/Charts";
import { data, mostUsedServicesData } from "../../constants";
import { getMostUsedServices, getWeeklyReport } from "./helpers"; 

const Statistics = () => {
    return (
        <div className="p-6 w-full h-[500px] flex justify-center items-center">
            <Charts option={getWeeklyReport(data)} />
            <Charts option={getMostUsedServices(mostUsedServicesData)} />
        </div>
    );
};
export default memo(Statistics);
