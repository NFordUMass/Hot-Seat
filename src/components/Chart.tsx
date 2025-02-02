import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
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
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  heat: (number | null)[];
  labels: (string | null)[];
  win_pcts: (number | null)[];
  colors_1: string[];
  colors_2: string[];
}

export default function CoachChart({
  heat,
  labels,
  win_pcts,
  colors_1,
  colors_2,
}: Props) {
  // Define the data object with the correct type
  const data: ChartData<"bar" | "line"> = {
    labels: labels,
    datasets: [
      // Line chart dataset
      {
        type: "line", // Specify line chart
        label: "Heat Index",
        data: heat,
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: heat.map((value, index) =>
          value != null && heat[index + 1] != null ? Math.max(5 * value, 1) : 1
        ),
        pointRadius: heat.map((value) =>
          value != null ? Math.max(10 * value, 1) : 1
        ),
        pointBorderWidth: heat.map((heat) =>
          Math.max(5 * (heat != null ? heat : 0), 1)
        ),
        fill: false,
        tension: 0,
        yAxisID: "y1", // Specify the y-axis for this dataset
      },
      // Bar chart dataset
      {
        type: "bar", // Specify bar chart
        label: "Team Winning Pct",
        data: win_pcts,
        borderColor: colors_2,
        backgroundColor: colors_1,
        borderWidth: 3,
        yAxisID: "y2", // Specify the y-axis for this dataset
        minBarLength: 5,
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
    // TODO: make this a flex flex-col where chart takes up left half, but slides to top in small screen
    <div className="w-full md:w-[50%]">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
