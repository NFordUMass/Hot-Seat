import { useEffect, useState } from "react";
import type { coachRow, seasonRow, Tables } from "../../supabase/types.ts";
import Row from "./Row.tsx";

interface Props {
  coachRows: coachRow[];
  source: seasonRow[];
}

type sortkey = "name" | "team" | "prob" | "fired";

export default function Heat_Table({ coachRows, source }: Props) {
  const [coaches, setCoaches] = useState<Tables<"heat_index">[]>(source);
  const [sorted, setSorted] = useState({ key: "prob", dir: "asc" });
  const [expanded, setExpanded] = useState("null_2024");

  useEffect(() => {
    setCoaches(source);
    setSorted({ key: "prob", dir: "asc" });
  }, [source]);

  function handleSort(key: sortkey, natural = "desc") {
    let dir = natural;
    if (sorted.key == key && sorted.dir == natural) {
      dir = natural == "desc" ? "asc" : "desc";
    }
    setSorted({ key, dir });
    let i = dir == "asc" ? 1 : -1;
    setCoaches([...coaches].sort((a, b) => (a[key] < b[key] ? i : -i)));
  }

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
              onClick={() => handleSort(col.key as sortkey)}
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
