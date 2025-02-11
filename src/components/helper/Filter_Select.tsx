import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

interface Props {
  label: string;
  default: string;
  // value: number | string;
  // id: string;
  // options: string[];
  // text_color: string;
  // helper: string;
  // onChange: (event: SelectChangeEvent) => void;
}

export default function Filter_Select({ label }: Props) {
  return (
    <FormControl fullWidth sx={{ maxWidth: "10rem" }}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        defaultValue={30}
        inputProps={{
          name: "age",
          id: "uncontrolled-native",
        }}
      >
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>
    </FormControl>
  );
}
