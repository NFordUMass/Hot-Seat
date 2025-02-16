import { useEffect, useState } from "react";
import type { coachRow } from "../../supabase/types";
import { imgPath } from "../utils/util";

interface Props {
  history: coachRow;
}

interface tableRow {
  team: string;
  start: number;
  stop: number;
  duration: number;
  wins: number;
  losses: number;
  wins_plyf: number;
  losses_plyf: number;
  // super_bowls: number; // TODO
}

export default function Coach_History({ history }: Props) {
  let prev = {
    team: "",
    start: 0,
    stop: 0,
    duration: 0,
    wins: 0,
    losses: 0,
    wins_plyf: 0,
    losses_plyf: 0,
  };
  let min_start = 0;
  const wins = [];
  const rows: tableRow[] = history.teams.reduce(
    (acc: tableRow[], team: string, i: number) => {
      if (i == 0) {
        prev.start = min_start = history.years[i];
      } else if (team != prev.team && prev.team != "") {
        acc.push(prev);
        prev = {
          team: team,
          start: history.years[i],
          stop: history.years[i],
          duration: 0,
          wins: 0,
          losses: 0,
          wins_plyf: 0,
          losses_plyf: 0,
        };
      }
      prev.team = team;
      prev.duration += 1;
      prev.wins += history.wins[i];
      prev.losses += history.losses[i];
      prev.wins_plyf += history.wins_plyf[i];
      prev.losses_plyf += history.losses_plyf[i];
      prev.stop = history.years[i];

      // push new row
      if (i == history.teams.length - 1) {
        prev.stop = history.years[i];
        acc.push(prev);
        acc.push({
          team: "N/A",
          start: min_start,
          stop: prev.stop,
          duration: acc.reduce(
            (acc: number, row: tableRow) => row.duration + acc,
            1
          ),
          wins: acc.reduce((acc: number, row: tableRow) => row.wins + acc, 0),
          losses: acc.reduce(
            (acc: number, row: tableRow) => row.losses + acc,
            0
          ),
          wins_plyf: acc.reduce(
            (acc: number, row: tableRow) => row.wins_plyf + acc,
            0
          ),
          losses_plyf: acc.reduce(
            (acc: number, row: tableRow) => row.losses_plyf + acc,
            0
          ),
        });
      }
      return acc;
    },
    []
  );

  return (
    <table className="w-full border-collapse text-center text-xs md:text-sm lg:text-base">
      <thead>
        <tr className="py-0 my-0">
          {[
            { span: 3, text: "" },
            { span: 2, text: "Playoffs" },
            { span: 2, text: "" },
          ].map((header, index) => (
            <th
              className={`py-0 my-0 text-center ${index === 1 ? "border border-black" : ""}`}
              key={`header_${index}`}
              colSpan={header.span}
            >
              {header.text}
            </th>
          ))}
        </tr>
        <tr>
          {["Team", "W", "L", "W", "L", "from", "to"].map((col, index) => (
            <th
              className="border border-black p-1 md:px-4 md:py-2"
              key={`${col}_${index}`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            className={`border border-black ${index === rows.length - 1 ? "my-0 py-0" : ""}`}
            key={index}
            style={{}}
          >
            <td
              className={`border border-black px-1 ${index === rows.length - 1 ? "my-0 py-0" : "my-2 py-2"}`}
            >
              {index == rows.length - 1 ? (
                "Total"
              ) : (
                <div className="flex flex-row items-center gap-1">
                  <img
                    src={imgPath("nfl", row.team, 2024)}
                    className="w-6 lg:w-8"
                    alt={row.team}
                  />
                  <p className="text-xs md:text-sm lg:text-base">
                    {`${row.duration} yr${row.duration <= 1 ? "" : "s"}.`}
                  </p>
                </div>
              )}
            </td>
            {[
              row.wins,
              row.losses,
              row.wins_plyf,
              row.losses_plyf,
              row.start,
              row.stop,
            ].map((value, i) => (
              <td
                className={`${index === rows.length - 1 ? "my-1 py-1" : "my-2 py-2"}`}
                key={`row_${value}_${i}`}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
