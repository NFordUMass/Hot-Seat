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

  // TODO: have image overlap the text less
  return (
    <div className="w-full flex justify-end relative">
      {/* Container with text and image */}
      <div className="relative w-fit flex items-center">
        {/* Text content, absolute so it can overlap the image */}
        <div className="absolute left-0 top-4 z-10">
          <p className="text-[clamp(0.5rem,1.25vw,1.5rem)]">
            Projected Heat <span className="hidden 3xl:inline">Index</span>
          </p>
          <div>
            <p
              className={`font-bold ${
                heat === "Loading..." || loading
                  ? "animate-pulse text-2xl 3xl:text-4xl text-white"
                  : "text-4xl md:text-6xl 3xl:text-8xl"
              }`}
              style={{
                color:
                  heat === "Loading..." || loading
                    ? "white"
                    : parseFloat(heat) <= threshold
                      ? `rgba(30, 144, 255, ${1 - parseFloat(heat)})` // Dodger blue to white
                      : `rgba(220, 20, 60, ${Math.sqrt(parseFloat(heat))})`, // Darker red after threshold
              }}
            >
              {heat === "Loading..." || loading ? "Loading..." : heat}
            </p>
            <p className="text-[clamp(0.5rem,1.25vw,1.5rem)]">
              Current: {rowData.prob}
            </p>
          </div>
        </div>

        {/* Coach Image aligned right */}
        <div className="w-full flex justify-end">
          <CoachImage rowData={rowData} />
        </div>
      </div>
    </div>
  );
}
