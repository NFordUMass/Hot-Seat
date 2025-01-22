import { useEffect, useState } from "react";
import type { Tables } from "../../supabase/types.ts";
import CurrentRow from "./Row.tsx";

interface Props {
  source: Tables<"heat_index">[];
}

type sortkey = "name" | "team" | "prob" | "fired";

export default function Heat_Table({ source }: Props) {
  const [coaches, setCoaches] = useState<Tables<"heat_index">[]>(source);
  const [sorted, setSorted] = useState({ key: "prob", dir: "asc" });

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
              className="px-0.5 "
              onClick={() => handleSort(col.key as sortkey)}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
<<<<<<< HEAD
        {coaches?.map((row, index) => (
=======
        {coaches.map((row, index) => (
>>>>>>> redo-pr
          <CurrentRow key={`${row.id}_${row.year}`} current={row} />
        ))}
      </tbody>
    </table>
  );
}
