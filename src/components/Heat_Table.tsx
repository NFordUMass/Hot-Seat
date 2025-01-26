import { useEffect, useState } from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import Row from "./Row.tsx";
import { handleSort, type Mode, type sortkey } from "../utils/util";

interface Props {
  mode: Mode;
  coachRows: coachRow[];
  source: seasonRow[];
}

export default function Heat_Table({ mode, coachRows, source }: Props) {
  const [coaches, setCoaches] = useState<seasonRow[]>(source);
  const [sorted, setSorted] = useState<{ key: sortkey; dir: "asc" | "desc" }>({
    key: "prob",
    dir: "desc",
  });
  const [expanded, setExpanded] = useState("null_2024");

  useEffect(() => {
    setCoaches(source);
    const key = mode.by == "team" ? "year" : "prob";
    const dir = "asc";
    setSorted({ key: key, dir: dir });
  }, [mode.by, source]);

  return (
    <table className="w-full text-left bg-white text-black">
      <thead>
        <tr className="font-mono text-sm md:text-base lg:text-xl border-t border-b">
          {[
            { key: "year", label: "Year" },
            { key: "team", label: "Team" },
            { key: "name", label: "Coach" },
            { key: "prob", label: "Heat Index" },
            { key: "fired", label: "Outcome" },
          ].map((col) => (
            <th
              key={`label_${col.key}`}
              className="px-0.5 "
              onClick={() =>
                handleSort({
                  data: coaches,
                  setData: setCoaches,
                  sorted: sorted,
                  setSorted: setSorted,
                  key: col.key as sortkey,
                  natural: col.key == "name" ? "desc" : "asc",
                })
              }
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {coaches?.map((row) => (
          <Row
            history={coachRows.find((coach) => coach.id == row.id)}
            key={`${row.id}_${row.year}`}
            rowData={row}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </tbody>
    </table>
  );
}
