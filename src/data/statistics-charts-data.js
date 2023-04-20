import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [0,0,0,0,0,0,0,0,0,0,0,0,5],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Website View",
    description: "Last Campaign Performance",
    chart: {
      type: "bar",
      height: 220,
      series: [
        {
          name: "Views",
          data: [0,0,0,0,0,0,0,0,0,0,0,0,5],
        },
      ],
      options: {
        ...chartsConfig,
        colors: "#fff",
        plotOptions: {
          bar: {
            columnWidth: "16%",
            borderRadius: 5,
          },
        },
        xaxis: {
          ...chartsConfig.xaxis,
          categories: ["Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr"],
        },
      },
    },
  },
/*   {
    color: "pink",
    title: "Daily Sales",
    description: "15% increase in today sales",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    chart: completedTasksChart,
  }, */
];

export default statisticsChartsData;
