import { useEffect, useState } from "react";
import type { inputData, seasonRow } from "../../supabase/types";
import { Games, Records, Plyf_Round, get_what_if_init } from "../utils/util";
import SelectInput from "./helper/Select";
import CoachImage from "./CoachImage";
import Image_Wrapper from "./Image_Wrapper";

interface Props {
  source: seasonRow[];
}

export default function WhatIf({ source }: Props) {
  const [row_index, setRow_Index] = useState(Math.floor(Math.random() * 32));
  const currentRow = source[row_index];
  const init = get_what_if_init(currentRow.id);
  const [record, setRecord] = useState(init.record);
  const [round, setRound] = useState(init.round);
  const wins = parseInt(Records[record].split("-")[0]);
  const win_pct = wins / Games;
  const w_plyf = Math.max(round - 1, 0);
  const srs = (wins * 2 - Games) * (3 / 4);

  const [inputs, setInputs] = useState<inputData>({
    age: currentRow.age,
    poc: currentRow.poc,

    round: round,
    win_pct: win_pct,
    w_plyf: w_plyf,
    coy_share: 0,
    coy_rank: 0,
    srs: srs,
    gm: currentRow.gm,
    owner: currentRow.owner,
    ou: Number((win_pct * Games - currentRow.ou_line).toFixed(1)),

    exp: currentRow.exp == 1 ? 1 : currentRow.exp + 1,
    tenure: currentRow.tenure == 1 ? 1 : currentRow.tenure + 1,
    tenure_over_500: currentRow.tenure_over_500 + (wins * 2 - Games),
    tenure_w_plyf: currentRow.tenure_w_plyf + w_plyf,
    tenure_coy_share: currentRow.tenure_coy_share,
    exp_coy_share: currentRow.exp_coy_share,

    delta_1yr_win_pct: win_pct - currentRow.win_pct,
    delta_2yr_win_pct:
      win_pct - (currentRow.win_pct - currentRow.delta_1yr_win_pct),
    delta_3yr_win_pct:
      win_pct - (currentRow.win_pct - currentRow.delta_2yr_win_pct),
    delta_1yr_plyf: round - currentRow.round,
    delta_2yr_plyf: round - (currentRow.round - currentRow.delta_1yr_plyf),
    delta_3yr_plyf: round - (currentRow.round - currentRow.delta_2yr_plyf),
  });

  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // row_index changes
  useEffect(() => {
    const currentRow = source[row_index];
    const wins = parseInt(Records[record].split("-")[0]);
    const win_pct = wins / Games;
    const w_plyf = Math.max(round - 1, 0);
    const srs = (wins * 2 - Games) * (3 / 4);

    setInputs(() => {
      const newInputs = {
        age: currentRow.age,
        poc: currentRow.poc,
        round: round,
        win_pct: win_pct,
        w_plyf: w_plyf,
        coy_share: 0,
        coy_rank: 0,
        srs: srs,
        gm: currentRow.gm,
        owner: currentRow.owner,
        ou: Number((win_pct * Games - currentRow.ou_line).toFixed(1)),
        exp: currentRow.exp == 1 ? 1 : currentRow.exp + 1,
        tenure: currentRow.tenure == 1 ? 1 : currentRow.tenure + 1,
        tenure_over_500: currentRow.tenure_over_500 + (wins * 2 - Games),
        tenure_w_plyf: currentRow.tenure_w_plyf + w_plyf,
        tenure_coy_share: currentRow.tenure_coy_share,
        exp_coy_share: currentRow.exp_coy_share,
        delta_1yr_win_pct: win_pct - currentRow.win_pct,
        delta_2yr_win_pct:
          win_pct - (currentRow.win_pct - currentRow.delta_1yr_win_pct),
        delta_3yr_win_pct:
          win_pct - (currentRow.win_pct - currentRow.delta_2yr_win_pct),
        delta_1yr_plyf: round - currentRow.round,
        delta_2yr_plyf: round - (currentRow.round - currentRow.delta_1yr_plyf),
        delta_3yr_plyf: round - (currentRow.round - currentRow.delta_2yr_plyf),
      };
      handleClick(newInputs);
      return newInputs;
    });
  }, [row_index, source]);

  const handleClick = (inputs: inputData) => {
    setLoading(true);
    const timeout = 1000;
    const startTime = Date.now();

    fetch("https://hot-seat-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        features: Object.values(inputs),
        named_features: inputs,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response["prediction"][0][1]);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, timeout - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      });
  };

  if (!currentRow) return null;

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <p className="text-xs md:text-base xl:text-lg 3xl:text-2xl py-1">{`Next Season, `}</p>
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
          <p className="text-xs md:text-base xl:text-lg 3xl:text-2xl py-1">{`goes `}</p>
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
              const rec = parseInt(event.target.value);
              const w = parseInt(Records[rec].split("-")[0]);
              const w_pct = w / Games;
              const srs_temp = (w * 2 - Games) * (3 / 4);

              setRecord(rec);
              setInputs((prevInputs) => {
                const newInputs = {
                  ...prevInputs,
                  win_pct: w_pct,
                  srs: srs_temp,
                  tenure_over_500: currentRow.tenure_over_500 + (w * 2 - Games),
                  delta_1yr_win_pct: w_pct - currentRow.win_pct,
                  delta_2yr_win_pct:
                    w_pct - (currentRow.win_pct - currentRow.delta_1yr_win_pct),
                  delta_3yr_win_pct:
                    w_pct - (currentRow.win_pct - currentRow.delta_2yr_win_pct),
                };
                handleClick(newInputs); // Now `handleClick` gets the newest `inputs`
                return newInputs;
              });
            }}
          />
          <p className="text-xs md:text-base xl:text-lg 3xl:text-2xl py-1">{` and `}</p>
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
              const rnd = parseInt(event.target.value);
              const w_plyf = Math.max(rnd - 1, 0);
              setRound(rnd);
              setInputs((prevInputs) => {
                const newInputs = {
                  ...prevInputs,
                  round: rnd,
                  w_plyf: w_plyf,
                  tenure_w_plyf: currentRow.tenure_w_plyf + w_plyf,
                  delta_1yr_plyf: rnd - currentRow.round,
                  delta_2yr_plyf:
                    rnd - (currentRow.round - currentRow.delta_1yr_plyf),
                  delta_3yr_plyf:
                    rnd - (currentRow.round - currentRow.delta_2yr_plyf),
                };
                handleClick(newInputs); // Now `handleClick` gets the newest `inputs`
                return newInputs;
              });
            }}
          />
        </div>
      </div>
      <div className="w-1/2">
        <Image_Wrapper
          rowData={currentRow}
          heat={result !== null ? result.toFixed(2) : "Loading..."}
          loading={loading}
        />
      </div>
    </div>
  );
}
