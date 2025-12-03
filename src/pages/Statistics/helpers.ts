import { EChartsOption } from "echarts";
import { GetTopBusiness, GetTopClient, GetTopSpecialist, MonthlyReportItem, MostUsedService } from "../../types";

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
      data: data.map((item) => getServiceName(item.service_name)),
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
      bottom: "10%",
      name: "Service Usage",
      type: "pie",
      radius: "70%",
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

export const getTopClients = (data: GetTopClient[] = []): EChartsOption => {
  const colors = [
    '#5470C6', '#EE6666', '#91CC75', '#73C0DE', '#FAC858',
    '#FF7F50', '#3BA272', '#A67C52', '#FC8452', '#B8E986'
  ];

  return {
    title: {
      text: 'Top 10 Clients by Appointments'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map(item => item.client_name)
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => item.total_appointments),
        itemStyle: {
          color: (params) => {
            return colors[params.dataIndex % colors.length];
          }
        }
      }
    ]
  };
};

export const getTopSpecialists = (data: GetTopSpecialist[] = []): EChartsOption => {
  const colors = [
    '#FF7F50', '#3BA272', '#A67C52', '#FC8452', '#B8E986',
    '#5470C6', '#EE6666', '#91CC75', '#73C0DE', '#FAC858',
  ];

  return {
    title: {
      text: 'Top 10 Specialists by Appointments'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map(item => item.specialist_name)
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => item.total_appointments),
        itemStyle: {
          color: (params) => {
            return colors[params.dataIndex % colors.length];
          }
        }
      }
    ]
  };
};

export const getTopBusinesses = (data: GetTopBusiness[] = []): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        bottom: "10%",
        name: 'Business From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.map((item) => ({
          value: item.total_appointments,
          name: item.business_name
        }))
      }
    ]
  }
};

export const getToday = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
};

export const getServiceName = (name: string) => {
  return name.length > 10 ? `${name.slice(0, 18)}...` : name
};
