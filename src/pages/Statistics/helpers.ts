import { EChartsOption } from "echarts";
import { MonthlyReportItem, MostUsedService } from "../../types";

export const getAppointmnetReport = (data: MonthlyReportItem[] = []): EChartsOption => {
  if (!data || data.length === 0) {
    return {
      title: {
        text: "No data",
        left: "center",
        top: "middle",
        textStyle: {
          fontSize: 20,
          color: "#555",
        },
      },
      xAxis: { show: false, type: "category", data: [] },
      yAxis: { show: false },
      series: [],
    };
  };

  return {
    tooltip: { trigger: "axis" },
    legend: { data: ["Sales"], bottom: 0 },
    xAxis: {
      type: "category",
      data: data.map((item) => item.service_name),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Sales",
        type: "bar",
        data: data.map((item) => item.total_appointments),
        itemStyle: { color: "#4F46E5" },
      },
    ],
  };
};

export const getMostUsedServices = (data: MostUsedService[] = []): EChartsOption => ({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  color: [
    "#3B82F6", 
    "#10B981", 
    "#F59E0B",
    "#EF4444", 
    "#8B5CF6", 
    "#14B8A6",
    "#F43F5E",
    "#6366F1",  
  ],
  legend: {
    orient: "horizontal",
    bottom: 0,
  },
  series: [
    {
      name: "Service Usage",
      type: "pie",
      radius: "60%",
      data: data.map((item) => ({
        name: item.service_id__name,
        value: item.total,
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
      label: {
        formatter: "{b}: {d}%",
      },
    },
  ],
});

export const getToday = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
};
