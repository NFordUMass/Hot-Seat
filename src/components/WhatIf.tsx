import { useEffect, useState } from "react";
import type { seasonRow } from "../../supabase/types";
import { Games, Records, Plyf_Round, get_what_if_init } from "../utils/util";
import SelectInput from "./helper/Select";
import CoachImage from "./CoachImage";
import Image_Wrapper from "./Image_Wrapper";

interface Props {
  source: seasonRow[];
}

export default function WhatIf({ source }: Props) {
  const [row_index, setRow_Index] = useState(Math.floor(Math.random() * 32));
  var row = source[row_index];
  const init = get_what_if_init(row.id);
  const record_init = init.record;
  const round_init = init.round;
  const [inputs, setInputs] = useState({});
  const [record, setRecord] = useState(record_init);
  const [round, setRound] = useState(round_init);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: add exp coy_share
  // TODO: model behavior for new coach vs existing coach
  // new coaches would not have correct delta_1yr_win_pct, delta_1yr_plyf, delta_2yr_win_pct, delta_2yr_plyf, delta_3yr_win_pct, delta_3yr_plyf
  useEffect(() => {
    row = source[row_index];
    const win_pct = parseInt(Records[record].split("-")[0]) / Games;
    const w_plyf = round - 1;
    setInputs({
      age: row.age + 1,
      round: round,
      win_pct: win_pct,
      w_plyf: w_plyf,
      exp: row.exp + 1,
      tenure: row.tenure + 1,
      tenure_over_500: row.tenure_over_500 + 1,
      tenure_w_plyf: row.tenure_w_plyf + round,
      tenure_coy_share: row.tenure_coy_share,
      exp_coy_share: row.exp_coy_share,
      srs: 0,
      gm: row.gm,
      owner: row.owner,
      coy_share: 0,
      coy_rank: 0,
      poc: row.poc,
      delta_1yr_win_pct: win_pct - row.win_pct,
      delta_2yr_win_pct: win_pct - row.delta_1yr_win_pct,
      delta_3yr_win_pct: win_pct - row.delta_2yr_win_pct,
      delta_1yr_plyf: round - row.round,
      delta_2yr_plyf: round - row.delta_1yr_plyf,
      delta_3yr_plyf: round - row.delta_2yr_plyf,
    });
    handleClick();
  }, [row_index, record, round]);

  const changeInputs = (key: string, value: number) => {
    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  const handleClick = () => {
    const featureArray = Object.values(inputs); // Create array of features
    setLoading(true);

    fetch("https://hot-seat-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: featureArray }),
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response["prediction"][0][1]);
        setTimeout(() => {
          setLoading(false);
        }, 750);
      });
  };

  return row ? (
    <div className="flex flex-row">
      <div className="w-1/2">
        <p className="text-xs md:text-lg lg:text-2xl py-1">{`Next Season, `}</p>
        <div className="flex flex-row gap-2 py-1 md:py-2 items-center">
          <SelectInput
            name="Coach"
            value={row_index}
            id="coach"
            border_color="white"
            text_color="white"
            font_size={`max(1vw, 0.75rem)`}
            label_font_size={`max(0.75vw, 0.75rem)`}
            minWidth={`10vw`}
            options={source.map((row) => row.name)}
            helper=""
            onChange={(event) => setRow_Index(parseInt(event.target.value))}
          />
          <p className="text-xs md:text-lg lg:text-2xl">{" goes "}</p>
        </div>
        <div className="flex flex-row gap-2 py-1 md:py-2 items-center">
          <SelectInput
            name="Record"
            value={record}
            id="record"
            options={Records}
            border_color="white"
            text_color="white"
            font_size={`max(1vw, 0.75rem)`}
            label_font_size={`max(0.75vw, 0.75rem)`}
            minWidth={`5vw`}
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
            border_color="white"
            text_color="white"
            font_size={`max(1vw, 0.75rem)`}
            label_font_size={`max(0.75vw, 0.75rem)`}
            minWidth={`8vw`}
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
        {/* Take features as input */}
        {/* Have precomputed suggested feature values */}
      </div>
      <div className="w-1/2">
        <Image_Wrapper
          rowData={row}
          heat={result !== null ? result.toFixed(2) : "Loading..."}
          loading={loading}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
