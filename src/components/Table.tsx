"use client";

import { useState } from "react";
import type { Tables } from "../../supabase/types.ts";
import CurrentRow from "./Row.tsx";

interface Props {
  source: Tables<"heat_index">[];
}

type sortkey = "name" | "team" | "prob";

export default function Heat_Table({ source }: Props) {
  const [coaches, setCoaches] = useState<Tables<"heat_index">[]>(source);
  const [sorted, setSorted] = useState({ key: "prob", dir: "asc" });

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
    <table className="w-full text-left">
      <thead>
        <tr className="font-mono text-base border-t border-b">
          {[
            { column: "year", label: "Year" },
            { column: "team", label: "Team" },
            { column: "name", label: "Coach" },
            { column: "prob", label: "Heat Index" },
          ].map((col) => (
            <th onClick={() => handleSort(col.column as sortkey)}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {coaches?.map((row, index) => (
          <CurrentRow key={`${row.id}_${row.year}`} current={row} />
        ))}
      </tbody>
    </table>
  );
}
