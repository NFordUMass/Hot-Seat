import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

interface Props {
  name: string;
  value: number | string;
  id: string;
  options: string[];
  text_color: string;
  helper: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function SelectInput({
  name,
  value,
  id,
  options,
  text_color,
  helper = "",
  onChange,
}: Props) {
  return (
    <div>
      <FormControl
        sx={{
          m: 0.5,
          minWidth: "10rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Change border color to white
            },
            "&:hover fieldset": {
              borderColor: "white", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Border color when focused
            },
          },
        }}
      >
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: text_color }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value as string | undefined}
          label={name}
          onChange={onChange}
          sx={{
            color: text_color,
            borderColor: text_color,
            fontSize: "1.25rem",
          }}
        >
          {options.map((option, i) => (
            <MenuItem value={i} key={`${id}_${i}`}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ color: text_color }}>{helper}</FormHelperText>
      </FormControl>
    </div>
  );
}
