import { useEffect, useState } from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import { DEFAULT_COACH_IMAGE, get_coach_image } from "../utils/util.ts";
import CoachImage from "./CoachImage.tsx";

interface Props {
  rowData: seasonRow;
  heat: string;
  loading: boolean;
}

export default function Image_Wrapper({ rowData, heat, loading }: Props) {
  const threshold = 0.33;

  return (
    <div className="w-full justify-center">
      <div className="relative w-fit">
        <CoachImage rowData={rowData} />
        <div className="absolute top-4 left-4">
          <p className="text-[clamp(0.5rem,1.25vw,1.5rem)]">
            Projected Heat <span className="hidden 3xl:inline">Index</span>
          </p>
          <div>
            <p
              className={`font-bold ${heat === "Loading..." || loading ? "animate-pulse text-2xl 3xl:text-4xl text-white" : "text-6xl 3xl:text-8xl"}`}
              style={{
                color:
                  heat === "Loading..." || loading
                    ? "white"
                    : parseFloat(heat) <= threshold
                      ? `rgba(30, 144, 255, ${1 - parseFloat(heat)})` // dodger blue to white
                      : `rgba(220, 20, 60, ${Math.sqrt(parseFloat(heat))})`, // darker red after threshold
              }}
            >
              {heat === "Loading..." || loading ? "Loading..." : heat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
