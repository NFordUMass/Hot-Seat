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
  const w_plyf = round - 1;
  const srs = (win_pct - 0.5) * 8;

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
    tenure_over_500: currentRow.tenure_over_500 + 1,
    tenure_w_plyf: currentRow.tenure_w_plyf + (wins * 2 - Games),
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

  // Initialize record and round when row_index changes
  useEffect(() => {
    const row = source[row_index];
    const init = get_what_if_init(row.id);
    setRecord(init.record);
    setRound(init.round);
  }, [row_index, source]);

  useEffect(() => {
    setInputs((prevInputs) => {
      const wins = parseInt(Records[record].split("-")[0]);
      const win_pct = wins / Games;
      const w_plyf = round - 1;
      const srs = (win_pct - 0.5) * 8;

      return {
        ...prevInputs,
        age: currentRow.age,
        round: round,
        win_pct: win_pct,
        w_plyf: w_plyf,
        exp: currentRow.exp == 1 ? 1 : currentRow.exp + 1,
        tenure: currentRow.tenure == 1 ? 1 : currentRow.tenure + 1,
        tenure_over_500: currentRow.tenure_over_500 + 1,
        tenure_w_plyf: currentRow.tenure_w_plyf + (wins * 2 - Games),
        tenure_coy_share: currentRow.tenure_coy_share,
        exp_coy_share: currentRow.exp_coy_share,
        srs: srs,
        ou: Number((win_pct * Games - currentRow.ou_line).toFixed(1)),
        gm: currentRow.gm,
        owner: currentRow.owner,
        coy_share: 0,
        coy_rank: 0,
        poc: currentRow.poc,
        delta_1yr_win_pct: win_pct - currentRow.win_pct,
        delta_2yr_win_pct:
          win_pct - (currentRow.win_pct - currentRow.delta_1yr_win_pct),
        delta_3yr_win_pct:
          win_pct - (currentRow.win_pct - currentRow.delta_2yr_win_pct),
        delta_1yr_plyf: round - currentRow.round,
        delta_2yr_plyf: round - (currentRow.round - currentRow.delta_1yr_plyf),
        delta_3yr_plyf: round - (currentRow.round - currentRow.delta_2yr_plyf),
      };
    });
    handleClick();
  }, [row_index, record, round, source]);

  const changeInputs = (key: string, value: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleClick = () => {
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
              setRecord(parseInt(event.target.value));
              changeInputs(
                "win_pct",
                parseInt(Records[parseInt(event.target.value)].split("-")[0]) /
                  Games
              );
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
              setRound(parseInt(event.target.value));
              changeInputs("round", parseInt(event.target.value));
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
