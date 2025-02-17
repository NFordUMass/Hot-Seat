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
  border_color: string;
  helper: string;
  font_size?: string;
  label_font_size?: string;
  minWidth?: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function SelectInput({
  name,
  value,
  id,
  options,
  text_color,
  border_color = "white",
  helper = "",
  font_size = "1.25rem",
  label_font_size = "0.75rem",
  minWidth = "10rem",
  onChange,
}: Props) {
  return (
    <div>
      <FormControl
        sx={{
          m: 0.5,
          minWidth: minWidth,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: border_color, // Use border_color param
            },
            "&:hover fieldset": {
              borderColor: border_color, // Use border_color param
            },
            "&.Mui-focused fieldset": {
              borderColor: border_color, // Use border_color param
            },
          },
        }}
      >
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: text_color, fontSize: label_font_size }}
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
            fontSize: font_size,
            "& .MuiSelect-icon": {
              color: text_color, // Change arrow color
            },
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
