import { useEffect, useState } from "react";
import type { seasonRow } from "../../supabase/types";
import { Games, Records, Plyf_Round } from "../utils/util";
import SelectInput from "./helper/Select";

interface Props {
  source: seasonRow[];
  record_init: number;
  round_init: number;
}

export default function WhatIf({
  source,
  record_init = 5,
  round_init = 2,
}: Props) {
  const [row_index, setRow_Index] = useState(Math.floor(Math.random() * 32));
  var row = source[row_index];
  const [inputs, setInputs] = useState({});
  const [record, setRecord] = useState(record_init);
  const [round, setRound] = useState(round_init);
  const [result, setResult] = useState(null);

  useEffect(() => {
    row = source[row_index];
    setInputs({
      round: round,
      win_pct: parseInt(Records[record].split("-")[0]) / Games,
      w_plyf: round - 1,
      exp: row ? row.exp + 1 : 1,
      tenure: row ? row.tenure + 1 : 1,
      tenure_over_500: row ? row.tenure_over_500 + 1 : 0,
      tenure_w_plyf: row ? row.tenure_w_plyf + round : 0,
      tenure_coy_share: 0.2,
      srs: 2.5,
      gm: row ? row.gm : 1,
      owner: row ? row.owner : 1,
      coy_share: 0.2,
      poc: row ? (row.poc ? 1 : 0) : 0,
      delta_1yr_win_pct: 0,
      delta_2yr_win_pct: 0,
      delta_3yr_win_pct: 0,
      delta_1yr_plyf: 0,
      delta_2yr_plyf: 0,
      delta_3yr_plyf: 0,
    });
    handleClick();
  }, [row_index, record, round]);

  useEffect(() => {
    handleClick();
  }, []);

  const changeInputs = (key: string, value: number) => {
    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  const handleClick = () => {
    const featureArray = Object.values(inputs); // Create array of features

    fetch("https://hot-seat-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: featureArray }),
    })
      .then((response) => response.json())
      .then((response) => setResult(response["prediction"][0][1]));
  };

  return row ? (
    <div className="flex flex-row">
      <div className="w-1/2">
        <p className="text-xs md:text-lg lg:text-2xl py-1">{`in ${row.year + 1},`}</p>
        <div className="flex flex-row gap-2 py-1 items-center">
          <SelectInput
            name="Coach"
            value={row_index}
            id="coach"
            options={source.map((row) => row.name)}
            helper=""
            onChange={(event) => setRow_Index(parseInt(event.target.value))}
          />
          <p className="text-xs md:text-lg lg:text-2xl">{" goes "}</p>
        </div>
        <div className="flex flex-row gap-2 py-1 items-center">
          <SelectInput
            name="Record"
            value={record}
            id="record"
            options={Records}
            helper=""
            onChange={(event) => {
              setRecord(parseInt(event.target.value));
              changeInputs(
                "win_pct",
                parseInt(Records[parseInt(event.target.value)].split("-")[0]) /
                  Games
              );
            }}
          />
          <p className="text-xs md:text-lg lg:text-2xl">{" and "}</p>
          <SelectInput
            name="Playoff Result"
            value={round}
            id="playoff_result"
            options={Plyf_Round}
            helper=""
            onChange={(event) => {
              setRound(parseInt(event.target.value));
              changeInputs("round", parseInt(event.target.value));
            }}
          />
        </div>

        {/* Unreasonable message */}
        {/* Engine */}
        {/* Call Model */}
        <div>
          <button onClick={handleClick}>Run Engine</button>
          <br />
          {`Predicted Heat Index: ${result !== null ? result : "Loading..."}`}
        </div>
        {/* Take features as input */}
        {/* Have precomputed suggested feature values */}
      </div>
      <div className="w-1/2">
        <img
          src={"images/coaches/BowlTo0.png"} // imgPath("nfl", rowData.team, 2024)
          className="w-96"
          alt={row.name}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
