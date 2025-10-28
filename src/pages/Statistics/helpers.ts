import { EChartsOption } from "echarts";
import { MonthlyReportItem, MostUsedService } from "../../types";

export const getWeeklyReport = (data: MonthlyReportItem[]): EChartsOption => ({
    title: {
        text: "Weekly Appointments Report",
        left: "center",
    },
    tooltip: {
        trigger: "axis",
    },
    legend: {
        data: ["Sales"],
        bottom: 0,
    },
    xAxis: {
        type: "category",
        data: data.map((item) => item.month)
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            name: "Sales",
            type: "bar",
            data: data.map((item) => item.sales),
            itemStyle: { color: "#4F46E5" },
        },
    ],
})


export const getMostUsedServices = (data: MostUsedService[]): EChartsOption => ({
  title: {
    text: "Most Used Services",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c}% ({d}%)",
  },
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
        name: item.service,
        value: item.percent,
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
