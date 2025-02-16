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
  outcomes: (number | null)[];
  colors_1: string[];
  colors_2: string[];
}

export default function Coach_Chart({
  heat,
  labels,
  win_pcts,
  outcomes,
  colors_1,
  colors_2,
}: Props) {
  // Define the data object with the correct type
  const data: ChartData<"bar" | "line"> = {
    labels: labels,
    datasets: [
      // Line chart dataset
      {
        type: "bar", // Specify line chart
        label: "Heat Index",
        data: heat,
        backgroundColor: outcomes.map((outcome, i) =>
          outcome != null && heat[i] != null
            ? outcome > 0
              ? "rgba(255, 99, 132, 1)"
              : `rgba(128, 128, 128, ${2 * heat[i] || 0.2})`
            : `rgba(128, 128, 128, ${heat[i] || 0.2})`
        ),
        yAxisID: "y1", // Specify the y-axis for this dataset
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
    // TODO: get rid of 2025 data in chart
    <div className="w-full">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
