import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line,} from "react-chartjs-2";
import { useRef, useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  title_1: string;
  title_2: string;
  bgColor_1: string;
  bgColor_2: string;
  labels?: string[];
}

export const BarChart = ({
  data_1 = [],
  data_2 = [],
  title_1,
  title_2,
  bgColor_1,
  bgColor_2,
  horizontal = false,
  labels = months,
}: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      }
    ],
  };

  return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
};

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

interface CurvedLineChartProps {
  data: number[];
  labels: string[]; // this is now required
  label?: string;
  gradientFrom?: string;
  gradientTo?: string;
  borderColor?: string;
}

export const CurvedLineChart = ({
  data,
  labels,
  label = "Monthly Revenue",
  gradientFrom = "rgba(99, 102, 241, 0.4)",
  gradientTo = "rgba(139, 92, 246, 0)",
  borderColor = "rgba(99, 102, 241, 1)",
}: CurvedLineChartProps) => {
  const chartRef = useRef<any>(null);
  const [chartGradient, setChartGradient] = useState<string | CanvasGradient>("");

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      setChartGradient(gradient);
    }
  }, [gradientFrom, gradientTo]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#ccc" },
      },
          y: {
            grid: { color: "#333" },
            ticks: { color: "#ccc" },
          },
    },
  };

  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label,
        data,
        fill: true,
        backgroundColor: chartGradient,
        borderColor,
      },
    ],
  };

  return <Line ref={chartRef} options={options} data={chartData} />;
};