import { useState } from "react";
import type { seasonRow } from "../../supabase/types";
import { Records, Plyf_Round } from "../utils/util";

interface Props {
  seasonRow: seasonRow | null;
}

export default function WhatIf({ seasonRow }: Props) {
  const [record, setRecord] = useState(5);
  const [round, setRound] = useState(2);

  return seasonRow ? (
    <div>
      <h3>{`in ${seasonRow.year + 1},`}</h3>
      <span>
        <p>{`${seasonRow.name} goes`}</p>
        <select
          name="Choose Record"
          value={record}
          id="record"
          className="text-black"
          onChange={(event) => setRecord(parseInt(event.target.value))}
        >
          {Records.map((record, i) => (
            <option value={i} key={`record_${i}`}>
              {record}
            </option>
          ))}
        </select>
        {" and "}
        <select
          name="Choose Playoff Result"
          value={round}
          id="playoff_result"
          className="text-black"
          onChange={(event) => setRound(parseInt(event.target.value))}
        >
          {Plyf_Round.map((round, i) => (
            <option value={i} key={`plyf_result_${i}`}>
              {round}
            </option>
          ))}
        </select>
        {/* Unreasonable message */}
      </span>
      {/* Engine */}
      {/* Call Model */}
      {/* Take features as input */}
      {/* Have precomputed suggested feature values */}
    </div>
  ) : (
    ""
  );
}
