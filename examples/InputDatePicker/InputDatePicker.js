import * as React from "react";
import { useState, useMemo } from "react";
import { InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import "moment/locale/cs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { alpha, styled } from "@mui/material/styles";

// eslint-disable-next-line import/no-unresolved
import { tx } from "textUtils";
// eslint-disable-next-line import/no-unresolved
import texts from "texts";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  color: theme?.palette.primaryColor?.compl || "#002b59",
  "& .MuiInputBase-input-MuiOutlinedInput-input": {
    color: "#002b59",
    borderColor: "#8095AC",
    borderWidth: "0.5px",
  },

  "& .MuiInputBase-input": {
    WebkitTextFillColor: "#002b59",
  },

  "& .MuiOutlinedInput-root fieldset": {
    color: "#002b59",
    borderColor: "#8095AC",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "0.5px",
  },

  "& .MuiOutlinedInput-root:hover fieldset": {
    color: theme?.palette.primaryColor?.compl || "#002b59",
    boxShadow: `${alpha("#ff5200", 0.04)} 0 0 0 0.15rem`,
    borderColor: `${alpha("#ff5200", 0.3)}`,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "1px",
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    color: theme?.palette.primaryColor?.compl || "#002b59",
    boxShadow: `${alpha("#ff5200", 0.05)} 0 0 0 0.2rem`,
    borderColor: `${alpha("#ff5200", 0.35)}`,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "1px",
  },

  "& .MuiSvgIcon-root": {
    color: "#ff5200",
  },
}));
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  "&": {
    color: theme?.palette.primaryColor?.compl || "#002b59",
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: theme?.typography?.fontFamily || "Verdana, Tahoma, sans-serif",
  },
}));

export default function InputDatePicker(props) {
  const {
    head,
    error,
    helperTexts,
    filtConds,
    setFiltConds,
    minDate = moment(new Date("01.01.1970")).format("DD.MM.YYYY"),
    maxDate = moment(new Date("31.12.2100")).format("DD.MM.YYYY"),
    beginDate,
    sx,
  } = props;

  const [date, setDate] = useState(filtConds?.date || null);

  const [errorValue, setErrorValue] = useState(error);
  const errorMessage = useMemo(() => {
    switch (errorValue) {
      case "minDate": {
        return helperTexts?.[0]?.tooEarly || "Vyberte pozdější termín.";
      }
      case "maxDate": {
        return helperTexts?.[1]?.tooLate || "Vyberte dřívější termín.";
      }
      case "invalidDate": {
        return helperTexts?.[2]?.invalid || "Neplatný termín.";
      }
      default: {
        return helperTexts?.[3]?.infoText || "";
      }
    }
  }, [errorValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"cs"}>
      <StyledInputLabel id={`listFilter-Label`}>{head}</StyledInputLabel>
      <StyledDatePicker
        id={"szDatePicker"}
        format={"DD.MM.YYYY"}
        //    value={moment(filtConds?.date) || null}
        allowSameDateSelection={true}
        maxDate={moment(maxDate)}
        minDate={moment(minDate)}
        onChange={(value) => {
          value
            ? setDate(moment(new Date(value)).format("DD.MM.YYYY"))
            : setDate(moment(new Date(new Date(value).setFullYear(1, 1, 1))));

          console.log("filtConds.date", date);
        }}
        onError={(newErrorValue) => {
          console.log("errorValue", errorValue);
          return setErrorValue(newErrorValue);
        }}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
        sx={sx}
      />
    </LocalizationProvider>
  );
}

InputDatePicker.displayName = "InputDatePicker";
