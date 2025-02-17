import { use, useState } from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import {
  Current_Year,
  filterCoachRowByYear,
  hexToRgba,
  Team_Abbrevs,
} from "../utils/util.ts";
import CoachChart from "./Chart.tsx";
import Coach_Awards from "./Coach_Awards.tsx";
import Coach_History from "./Coach_History.tsx";
import CoachImage from "./CoachImage.tsx";
import SelectInput from "./helper/Select.tsx";
import Coach_Chart from "./Coach_Chart.tsx";

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
    index: history.years.length - 1,
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

  const outcomes_spaced: (number | null)[] = space_labels_num(
    coachData.outcomes
  );

  const win_pcts_spaced: (number | null)[] = space_labels_num(
    coachData.win_pcts
  );

  const labels_spaced: (string | null)[] = space_labels_num(
    coachData.years
  ).map((year) =>
    year != null ? `'${(year % 100).toString().padStart(2, "0")}` : year
  );

  const records_spaced: string[] = space_labels_str(
    coachData.wins.map((w, i) => `${w}-${coachData.losses[i]}`)
  ).map((record) => (record != null ? record : ""));

  const most_wins = Math.max(...coachData.win_pcts);
  const least_wins = Math.min(...coachData.win_pcts);

  const records_labels =
    records_spaced.length <= 5
      ? records_spaced
      : records_spaced.map((label, i) => {
          if (outcomes_spaced[i] == 1) {
            return label;
          } else if (label != "" && win_pcts_spaced[i] == most_wins) {
            return label;
          } else if (label != "" && win_pcts_spaced[i] == least_wins) {
            return label;
          } else if (i == records_spaced.length - 1) {
            return label;
          }
          return "";
        });

  const colors_1__rgb = space_labels_str(coachData.colors_1).map((color) =>
    color != null ? hexToRgba(color, 0.5) : "000000"
  );

  const colors_2__rgb = space_labels_str(coachData.colors_2).map((color) =>
    color != null ? hexToRgba(color, 0.5) : "000000"
  );

  return (
    <tr className="w-full">
      <td colSpan={6} style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
        <div className="relative">
          <div className="flex flex-row text-center justify-center items-center text relative">
            <div className="absolute w-full h-0.5 bg-gray-500"></div>
            <div className="z-10 flex flex-row items-center gap-2 bg-[#f9f9f9] px-4">
              <p className="text-sm sm:text-base md:text-lg">{`Showing Resume`}</p>
              {/* TODO: highlight year for rowData.year */}
              <SelectInput
                name="Filter"
                value={
                  filter.index == history.years.length - 1
                    ? 0
                    : filter.index + 1
                }
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
                  setFilter((prev) => {
                    const value = parseInt(event.target.value);
                    const isAll = value === 0;
                    return {
                      filter: !isAll,
                      year: isAll ? 2024 : history.years[value - 1],
                      index: isAll ? history.years.length - 1 : value - 1,
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full md:w-1/5 flex flex-col justify-center items-center text-center">
              {/* Coach Image */}
              <div className="order-2 md:order-1">
                <CoachImage rowData={rowData} />
              </div>
              {/* Coach Info */}
              <div className="order-1 md:order-2">
                <strong className="text-sm md:text-lg">
                  {rowData.name} <span></span>{" "}
                </strong>
                <div className="flex flex-row gap-2 justify-center">
                  <p>{`Age: ${rowData.age - (Current_Year - 1 - history["years"][filter.index])}`}</p>
                  <p>{`Exp: ${filter.index + 1} ${filter.index > 0 ? "yrs." : "yr."}`}</p>
                </div>
                <p>{`Team: ${Team_Abbrevs.get(history["teams"][filter.index])}`}</p>
                <p className="text-xs italic">{`(in ${history["years"][filter.index]})`}</p>
              </div>
            </div>
            <div
              className={`md:hidden h-2 border-b-2 border-gray-500 text-center`}
            />
            <div className="w-full md:w-2/5 text-center">
              <p className="text-sm md:text-base font-bold mb-1">Statistics</p>
              <div className="flex flex-col gap-x-2">
                <Coach_History history={coachData} />
                <Coach_Awards history={coachData} />
              </div>
              {/* TODO: "Similar Coaches" */}
            </div>
            {/* TODO: plot Vegas wins not .500 record */}
            <div className={`md:hidden h-2 border-b-2 border-gray-500`}></div>
            <div className="w-full md:w-2/5">
              <p className="text-sm md:text-base font-bold my-1 text-center">
                Heat Index over Time
              </p>
              <div className="w-full text-center">
                {/* <CoachChart
                  heat={heat_spaced}
                  labels={labels_spaced}
                  win_pcts={win_pcts_spaced}
                  colors_1={colors_1__rgb}
                  colors_2={colors_2__rgb}
                /> */}
                <Coach_Chart
                  heat={heat_spaced}
                  labels={labels_spaced}
                  win_pcts={win_pcts_spaced}
                  records={records_labels}
                  records_all={records_spaced}
                  outcomes={outcomes_spaced}
                  colors_1={colors_1__rgb}
                  colors_2={colors_2__rgb}
                />
                <div className="flex flex-col gap-2 text-center">
                  <p className="text-[0.5rem] md:text-xs text-gray-800">
                    dotted line indicates ML prediction threshold
                  </p>
                  {records_spaced.length > 5 ? (
                    <p className="text-[0.5rem] md:text-xs text-gray-800">
                      {`records for best, worst, ${coachData.outcomes.includes(1) ? "current, and firing" : "and current"} year labeled`}
                    </p>
                  ) : null}
                  {coachData.outcomes.includes(1) ? (
                    <p className="text-[0.5rem] md:text-xs text-gray-800">
                      black filling indicates fired
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 md:my-4 h-2 border-b-2 border-gray-500"></div>
        </div>
      </td>
    </tr>
  );
}
