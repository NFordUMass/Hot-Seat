import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js"; // Import proper types
// Import proper types

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  heat: number[];
  labels: string[];
  win_pcts: number[];
}

export default function CoachChart({ heat, labels, win_pcts }: Props) {
  // Define the data object with the correct type
  const data: ChartData<"bar" | "line"> = {
    labels: labels,
    datasets: [
      // Line chart dataset
      {
        type: "line", // Specify line chart
        label: "Heat Index",
        data: heat,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: "y1", // Specify the y-axis for this dataset
      },
      // Bar chart dataset
      {
        type: "bar", // Specify bar chart
        label: "Team Winning Pct",
        data: win_pcts,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        yAxisID: "y2", // Specify the y-axis for this dataset
      },
    ],
  };

  // Define the options object with the correct type
  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    scales: {
      y1: {
        type: "linear", // Second Y-axis
        position: "right",
        suggestedMin: 0,
        suggestedMax: 1,
        grid: {
          drawOnChartArea: false, // Do not draw gridlines for this axis
        },
      },
      y2: {
        reverse: true,
        type: "linear", // First Y-axis
        position: "left",
        suggestedMin: 0,
        suggestedMax: 1,
        grid: {
          drawOnChartArea: true, // Draw gridlines for this axis
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };
  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
