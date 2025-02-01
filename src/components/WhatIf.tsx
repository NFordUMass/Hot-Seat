import { useState } from "react";
import type { seasonRow } from "../../supabase/types";
import { Records, Plyf_Round } from "../utils/util";

interface Props {
  seasonRow: seasonRow | null;
}

export default function WhatIf({ seasonRow }: Props) {
  const [record, setRecord] = useState(5);
  const [round, setRound] = useState(2);
  const [result, setResult] = useState([1, 0]);

  const [inputs, setInputs] = useState({
    feature1: 3,
    feature2: 2.0,
    feature3: 4,
    feature4: 7,
    feature5: 4,
    feature6: 0.5,
    feature7: -3,
    feature8: 2,
    feature9: 0.2,
    feature10: 2.5,
    feature11: 1,
    feature12: 1,
    feature13: 0.2,
    feature14: 1,
    feature15: 0.307,
    feature16: 0.19,
    feature17: 0.307,
    feature18: 0,
    feature19: 0,
    feature20: 0,
  });

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
      .then((response) => setResult(response["prediction"][0]));
  };

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
      <button onClick={handleClick}>Run Engine</button>
      {`Predicted Heat Index: ${result[0]}`}
      {/* Take features as input */}
      {/* Have precomputed suggested feature values */}
    </div>
  ) : (
    ""
  );
}
