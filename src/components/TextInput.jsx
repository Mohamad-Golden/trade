import { InputAdornment, TextField } from "@mui/material";
import {
  addCommas,
  digitsEnToFa,
  digitsFaToEn,
} from "@persian-tools/persian-tools";

export default function TextInput({
  label,
  adornment,
  onChange,
  numberOnly,
  integerOnly,
  maxLength,
  ...rest
}) {
  return (
    <TextField
      className="w-full"
      label={label}
      sx={{
        input: {
          textAlign: "right",
          color: "#F2F2F3",
        },
      }}
      style={{ backgroundColor: "#373943", borderRadius: 16 }}
      onChange={(e) => {
        const value = digitsFaToEn(e.target.value.replaceAll(",", ""));
        let formattedValue;
        if (value.length >= maxLength) return;
        if (numberOnly) {
          if (/^-?\d*\.?\d*$/.test(value)) {
            formattedValue = digitsEnToFa(addCommas(value));
            if (
              value.at(-1) == "." &&
              value.length > 1 &&
              value.slice(0, -1).indexOf(".") === -1
            ) {
              formattedValue += ".";
            }
            onChange({ value, formattedValue });
          }
        } else if (integerOnly) {
          formattedValue = digitsEnToFa(addCommas(value));
          if (/^-?\d*$/.test(value)) {
            onChange({ value, formattedValue });
          }
        } else {
          onChange?.(e.target.value);
        }
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
}
