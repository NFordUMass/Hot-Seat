import { useEffect, useState } from "react";
import type { historyRow } from "../../supabase/types";

interface Props {
  coachId: string;
}

export default function Coach_History({ coachId }: Props) {
  const [table, setTable] = useState<historyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const temp = "CarrPe0";

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await fetch(`/api/coach_table?coach_id=temp`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: historyRow[] = await response.json();
        setTable(data);
      } catch (error) {
        console.error("Error fetching table data:", error);
        setError("Failed to load table data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTable();

    console.log(table.length);
  }, [coachId]);

  if (loading) {
    return <p>Loading table...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Tenure</th>
          <th>Start</th>
          <th>Stop</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Playoff Wins</th>
          <th>Playoff Losses</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row, index) => (
          <tr key={index}>
            <td>{row.team}</td>
            <td>{row.tenure}</td>
            <td>{row.start}</td>
            <td>{row.stop}</td>
            <td>{row.wins}</td>
            <td>{row.losses}</td>
            <td>{row.win_plyf}</td>
            <td>{row.loss_plyf}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
