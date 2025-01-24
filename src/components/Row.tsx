import React from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import { imgPath } from "../utils/util";
import Expanded_Row from "./Expanded_Row.tsx";

interface Props {
  history: coachRow | undefined;
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
        <Expanded_Row rowData={rowData} history={history} />
      )}
    </React.Fragment>
  );
}
