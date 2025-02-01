import { useState } from "react";
import type { seasonRow } from "../../supabase/types";
import Heat_Table from "./Heat_Table";
import { teams, get_abbrev, type Mode } from "../utils/util";
import WhatIf from "./WhatIf";

interface Props {
  source: seasonRow[];
  coaches: any;
}

type filterKey = "year" | "team";

export default function Content({ source, coaches }: Props) {
  const currentYear = 2024;
  const numYears = 30;

  const [mode, setMode] = useState<Mode>({ by: "year" });
  const [year, setYear] = useState(currentYear);
  const [team, setTeam] = useState("NYJ");

  function randomTeam() {
    const randIndex = Math.floor(Math.random() * teams.length);
    setTeam(teams[randIndex]);
  }

  return (
    <div>
      {/* Toggle: By Year vs By Show */}
      <div className="flex py-2 gap-4 justify-center">
        {["year", "team"].map((filterKey) => (
          <button
            key={filterKey}
            onClick={() => {
              if (mode.by == "year") randomTeam();
              else setYear(Math.floor(currentYear - Math.random() * numYears));
              setMode({ by: filterKey as filterKey });
            }}
            disabled={mode.by === filterKey}
            className="color-white text-base lg:text-lg p-1 lg:p-2 rounded-lg"
            style={{
              backgroundColor: mode.by === filterKey ? "gray" : "inherit",
              cursor: mode.by === filterKey ? "not-allowed" : "pointer",
            }}
          >
            {`By ${filterKey.toWellFormed()}`}
          </button>
        ))}
      </div>

      {/* Menu of Choices */}
      <div className="text-center py-2 mx-2 md:mx-8">
        {(mode.by == "year"
          ? Array.from({ length: numYears }, (_, i) => currentYear - i)
          : source
              .filter((row) => row.year == currentYear)
              .map((row) => get_abbrev(row.team))
              .sort()
        ).map((item) => (
          <button
            key={`button_${item}`}
            onClick={() =>
              mode.by == "year"
                ? setYear(item as number)
                : setTeam(get_abbrev(item as string, true) as string)
            }
            className="p-1 rounded-lg"
            style={{
              backgroundColor: (
                mode.by == "year"
                  ? item == year
                  : get_abbrev(item as string, true) == team
              )
                ? "gray"
                : "inherit",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <Heat_Table
        mode={mode}
        coachRows={coaches}
        source={source
          .filter((row) => row[mode.by] == (mode.by == "year" ? year : team))
          .sort((row1, row2) =>
            row1[mode.by == "year" ? "prob" : "year"] <
            row2[mode.by == "year" ? "prob" : "year"]
              ? 1
              : -1
          )}
      />
    </div>
  );
}
