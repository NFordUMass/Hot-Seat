import { useEffect, useState } from "react";
import type { coachRow, seasonRow } from "../../supabase/types.ts";
import { DEFAULT_COACH_IMAGE, get_coach_image } from "../utils/util.ts";

interface Props {
  rowData: seasonRow;
}

export default function CoachImage({ rowData }: Props) {
  const [image, setImage] = useState(DEFAULT_COACH_IMAGE);

  useEffect(() => {
    const fetchImage = async () => {
      const imagePath = await get_coach_image(rowData.id);
      setImage(imagePath);
    };

    fetchImage();
  }, [rowData.id]);

  return (
    <div className="relative z-0">
      <img
        src={image}
        alt={rowData.name}
        className="w-[clamp(150px,25vw,800px)]"
      />
    </div>
  );
}
