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
  const [expanded, setExpanded] = useState(
    window.innerWidth >= 1536 ? `${coaches[0].id}_${coaches[0].year}` : ""
  );

  useEffect(() => {
    setCoaches(source);
    const key = mode.by == "team" ? "year" : "prob";
    const dir = "asc";
    setSorted({ key: key, dir: dir });
  }, [mode.by, source]);

  return (
    // TODO: header row scaling with text overflow of coach name
    <div className="w-full overflow-x-auto md:max-h-[1800px] max-h-[600px] overflow-y-auto">
      <table className="w-full text-left bg-white text-black rounded-lg">
        <thead>
          <tr className="text-sm lg:text-xl border-b">
            {[
              { key: "year", label: "Year" },
              { key: "team", label: "Team" },
              { key: "name", label: "Coach" },
              { key: "prob", label: "Heat Index" },
              { key: "fired", label: "Outcome" },
            ].map((col) => (
              <th
                key={`label_${col.key}`}
                className="px-1 whitespace-nowrap"
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
                {col.key == "prob" ? (
                  <>
                    <span className="lg:hidden">Heat</span>
                    <span className="hidden lg:inline">Heat Index</span>
                  </>
                ) : (
                  col.label
                )}
              </th>
            ))}
            <th className="px-2 whitespace-nowrap">+/-</th>
          </tr>
        </thead>
        <tbody>
          {coaches?.map((row) => (
            <Row
              history={
                coachRows.find((coach) => coach.id == row.id) ??
                ({} as coachRow)
              }
              key={`${row.id}_${row.year}`}
              rowData={row}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
