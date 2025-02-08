import type { coachRow, seasonRow } from "../../supabase/types.ts";
import { hexToRgba } from "../utils/util.ts";
import CoachChart from "./Chart.tsx";
import CoachImage from "./CoachImage.tsx";

interface Props {
  history: coachRow | undefined;
  rowData: seasonRow;
}

function space_labels<X>(
  target_array: X[],
  years: number[],
  teams: string[]
): (X | null)[] {
  return years.reduce((acc: (X | null)[], e: number, i: number) => {
    if (i > 0 && (years[i] != years[i - 1] + 1 || teams[i] != teams[i - 1])) {
      acc.push(null);
    }
    acc.push(target_array[i]);
    return acc;
  }, []);
}

export default function Expanded_Row({ history, rowData }: Props) {
  const years = history ? history.years : [];
  const heat = history ? history.heat : [1];
  const win_pcts = history ? history.win_pcts : [0];
  const teams = history ? history.teams : [""];
  const colors_1_hex = history ? history.colors_1 : ["000000"];
  const colors_2_hex = history ? history.colors_2 : ["000000"];

  const heat_spaced: (number | null)[] = space_labels(heat, years, teams);

  const win_pcts_spaced: (number | null)[] = space_labels(
    win_pcts,
    years,
    teams
  );

  const labels_spaced: (string | null)[] = space_labels(
    years,
    years,
    teams
  ).map((year) => (year != null ? year.toString() : year));

  const colors_1__rgb = space_labels<string>(colors_1_hex, years, teams)
    .map((year) => (year != null ? year.toString() : year))
    .map((color) => (color != null ? hexToRgba(color, 0.5) : "000000"));

  const colors_2__rgb = space_labels<string>(colors_2_hex, years, teams)
    .map((year) => (year != null ? year.toString() : year))
    .map((color) => (color != null ? hexToRgba(color, 0.5) : "000000"));

  return (
    <tr>
      <td colSpan={6} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
        <div className="flex flex-row">
          <div className="w-1/2">
            <strong>Details for {rowData.name}</strong>
            <CoachChart
              heat={heat_spaced}
              labels={labels_spaced}
              win_pcts={win_pcts_spaced}
              colors_1={colors_1__rgb}
              colors_2={colors_2__rgb}
            />
          </div>
          <div className="w-1/4">
            {"Coach Table"} <br />
            {"Coach Accolades"} <br />
            {"Similar Coaches"}
          </div>
          <div className="w-1/4">
            <CoachImage rowData={rowData} />
          </div>
        </div>
      </td>
    </tr>
  );
}
