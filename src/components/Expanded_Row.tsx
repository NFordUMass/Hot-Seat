import { use, useState } from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import {
  filterCoachRowByYear,
  hexToRgba,
  Team_Abbrevs,
} from "../utils/util.ts";
import CoachChart from "./Chart.tsx";
import Coach_Awards from "./Coach_Awards.tsx";
import Coach_History from "./Coach_History.tsx";
import CoachImage from "./CoachImage.tsx";
import SelectInput from "./helper/Select.tsx";

interface Props {
  history: coachRow;
  rowData: seasonRow;
}

function space_labels_helper<X>(
  years: number[],
  teams: string[]
): (target_array: X[]) => (X | null)[] {
  return (target_array: X[]) => space_labels(target_array, years, teams);
}

function space_labels<X>(
  target_array: X[],
  years: number[],
  teams: string[]
): (X | null)[] {
  const acc: (X | null)[] = [];

  for (let i = 0; i < years.length; i++) {
    if (i > 0 && (years[i] !== years[i - 1] + 1 || teams[i] !== teams[i - 1])) {
      acc.push(null);
    }
    acc.push(target_array[i]);
  }

  return acc;
}

export default function Expanded_Row({ history, rowData }: Props) {
  const [filter, setFilter] = useState({
    filter: false,
    year: rowData.year,
    index: 0,
  });
  const coachData = filter.filter
    ? filterCoachRowByYear(history, filter.year)
    : history;

  const space_labels_num = space_labels_helper<number>(
    coachData.years,
    coachData.teams
  );
  const space_labels_str = space_labels_helper<string>(
    coachData.years,
    coachData.teams
  );

  const heat_spaced: (number | null)[] = space_labels_num(coachData.heat);

  const win_pcts_spaced: (number | null)[] = space_labels_num(
    coachData.win_pcts
  );

  const labels_spaced: (string | null)[] = space_labels_num(
    coachData.years
  ).map((year) => (year != null ? year.toString() : year));

  const colors_1__rgb = space_labels_str(coachData.colors_1).map((color) =>
    color != null ? hexToRgba(color, 0.5) : "000000"
  );

  const colors_2__rgb = space_labels_str(coachData.colors_2).map((color) =>
    color != null ? hexToRgba(color, 0.5) : "000000"
  );

  return (
    <tr className="w-full">
      <td colSpan={6} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
        <div className="flex flex-row text-center justify-center items-center text">
          <p className="text-lg">{`Resume`}</p>
          <SelectInput
            name="Filter"
            value={filter.index}
            id="resume_filter"
            options={[
              "All Time",
              ...history.years.map((yr: number) => `in ${yr.toString()}`),
            ]}
            border_color="black"
            text_color="black"
            font_size="0.75rem"
            minWidth="5rem"
            helper=""
            onChange={(event) => {
              setFilter((prev) => ({
                filter: !prev.filter,
                year: rowData.year,
                index: parseInt(event.target.value),
              }));
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/5 flex flex-col justify-center items-center text-center">
            {/* Coach Image */}
            <div className="order-2 md:order-1">
              <CoachImage rowData={rowData} />
            </div>
            {/* Coach Info */}
            <div className="order-1 md:order-2">
              <strong>
                {rowData.name} <span></span>{" "}
              </strong>
              <div className="flex flex-row gap-2 justify-center">
                <p>{`Age: ${rowData.age} `}</p>
                <p>{`Exp: ${rowData.exp} ${rowData.exp > 1 ? "yrs." : "yr."}`}</p>
              </div>
              <p>{`Team: ${Team_Abbrevs.get(rowData.team)}`}</p>
              <p className="text-xs italic">{`(in ${rowData.year})`}</p>
            </div>
          </div>
          <div className="w-full md:w-2/5 flex flex-col gap-x-2">
            <Coach_History history={coachData} />
            <Coach_Awards history={coachData} />
            {"Similar Coaches"}
          </div>
          <div className="w-full md:w-2/5">
            <CoachChart
              heat={heat_spaced}
              labels={labels_spaced}
              win_pcts={win_pcts_spaced}
              colors_1={colors_1__rgb}
              colors_2={colors_2__rgb}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}
