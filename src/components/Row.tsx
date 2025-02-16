import React from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import { imgPath } from "../utils/util";
import Expanded_Row from "./Expanded_Row.tsx";

interface Props {
  history: coachRow;
  rowData: seasonRow;
  expanded: string;
  setExpanded: (rowId: string) => void;
}

export default function Row({
  history,
  rowData,
  expanded,
  setExpanded,
}: Props) {
  return (
    <React.Fragment key={`${rowData.id}_${rowData.year}`}>
      <tr
        className="border-b border-neutral-600"
        style={{ backgroundColor: rowData.fired ? "red" : "inherit" }}
        onClick={() =>
          expanded == `${rowData.id}_${rowData.year}`
            ? setExpanded("")
            : setExpanded(`${rowData.id}_${rowData.year}`)
        }
      >
        <td className="text-sm md:text-base lg:text-xl font-bold">
          {rowData.year}
        </td>
        <td className="px-0.5">
          <img
            src={imgPath("nfl", rowData.team, 2024)}
            className="w-8 lg:w-16"
            alt={rowData.team}
          />
        </td>
        <td className="text-sm md:text-base lg:text-xl font-bold">
          {rowData.name}
        </td>
        <td className="text-sm md:text-base lg:text-xl">
          {rowData.prob.toFixed(2)}
        </td>
        <td className="text-sm md:text-base lg:text-xl">
          {rowData.fired ? "Fired" : "Safe"}
        </td>
      </tr>
      {expanded == `${rowData.id}_${rowData.year}` && (
        <Expanded_Row
          rowData={rowData}
          history={
            rowData.tenure > 1
              ? {
                  ...history,
                  years: history.years.filter((y) => y <= 2024),
                  teams: history.teams.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  heat: history.heat.filter((_, i) => history.years[i] <= 2024),
                  wins: history.wins.filter((_, i) => history.years[i] <= 2024),
                  losses: history.losses.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  rounds: history.rounds.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  wins_plyf: history.wins_plyf.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  losses_plyf: history.losses_plyf.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  win_pcts: history.win_pcts.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  coy_ranks: history.coy_ranks.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  coy_shares: history.coy_shares.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  colors_1: history.colors_1.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                  colors_2: history.colors_2.filter(
                    (_, i) => history.years[i] <= 2024
                  ),
                }
              : history
          }
        />
      )}
    </React.Fragment>
  );
}
