import type { coachRow, seasonRow } from "../../supabase/types.ts";
import CoachChart from "./Chart.tsx";

interface Props {
  history: coachRow | undefined;
  rowData: seasonRow;
}

export default function Expanded_Row({ history, rowData }: Props) {
  const labels = history
    ? history.years.map((x) => x.toString())
    : ["2022", "2023", "2024"];
  const heat = history ? history.heat : [0.16, 0.42, 0.67];
  const win_pcts = history ? history.win_pcts : [0.4, 0.3, 0.2];

  return (
    <tr>
      <td colSpan={6} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
        <div>
          <strong>Details for {rowData.team}</strong>
          <CoachChart heat={heat} labels={labels} win_pcts={win_pcts} />
        </div>
      </td>
    </tr>
  );
}

// //
// // Define the data object with the correct type
// const data: ChartData<"bar" | "line"> = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     // Bar chart dataset
//     {
//       type: "bar", // Specify bar chart
//       label: "Bar Dataset",
//       data: [50, 60, 40, 80, 70, 90],
//       borderColor: "rgba(54, 162, 235, 1)",
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderWidth: 1,
//       yAxisID: "y1", // Specify the y-axis for this dataset
//     },
//     // Line chart dataset
//     {
//       type: "line", // Specify line chart
//       label: "Line Dataset",
//       data: [5, 15, 10, 20, 18, 25],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       borderWidth: 2,
//       fill: false,
//       tension: 0.4,
//       yAxisID: "y2", // Specify the y-axis for this dataset
//     },
//   ],
// };
