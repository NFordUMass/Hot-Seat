"use client";

import Dropdown from "react-bootstrap/Dropdown";

interface Props {
  year: number;
  setYear: (year: number) => void;
}

export default function Drop_Down({ year, setYear }: Props) {
  return (
    <Dropdown className="my-8   ">
      <Dropdown.Toggle
        className="text-xl"
        variant="success"
        id="dropdown-basic"
      >
        {`Change Year`}
      </Dropdown.Toggle>

      <Dropdown.Menu className="flex my-4">
        {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => {
          return (
            <Dropdown.Item
              className="text-lg px-2"
              key={year}
              onClick={() => setYear(year)}
            >
              {year}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
