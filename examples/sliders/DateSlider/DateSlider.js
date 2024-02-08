import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/cs";

import { styled } from "@mui/material/styles";

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme?.palette?.primaryColor?.main || "#ff5200",
  width: "325px",
  fontSize: 8,

  "& .MuiSlider-valueLabel": {
    fontSize: 8,
    fontWeight: "normal",
    backgroundColor: "unset",
    color: theme?.palette?.text?.primaryColor?.compl || "#002b59",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme?.palette?.text?.primaryColor?.compl || "#002b59",
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme?.palette?.primaryColor?.compl || "#002b59",
  textAlign: "right",
  width: "325px",
}));

export default function DateSlider({
  header,
  inputDate = new Date(Date.now()),
  max = new Date(2100, 11, 1),
  min = new Date(1970, 0, 1),
  position = "horizontal",
  display = "on",
  sx,
  sxLabel,
}) {
  const [convertedDate, setConvertedDate] = useState(inputDate);
  const monthYearConverter = (inputValue) => {
    if (Array.isArray(inputValue)) {
      const month = new Date(inputValue?.[0]).getMonth() + 1;
      const year = new Date(inputValue?.[0]).getFullYear();

      const month2 = new Date(inputValue?.[1]).getMonth() + 1;
      const year2 = new Date(inputValue?.[1]).getFullYear();
      const outputNumber1 = month + year * 12;
      const outputNumber2 = month2 + year2 * 12;

      return [outputNumber1, outputNumber2];
    }
    const month = new Date(inputValue).getMonth() + 1;
    const year = new Date(inputValue).getFullYear();

    return month + year * 12;
  };
  const maxDate = monthYearConverter(max);
  const minDate = monthYearConverter(min);

  const dateConverter = (setedDate) => {
    if (Array.isArray(setedDate)) {
      const month = setedDate?.[0] % 12 === 0 ? 12 : setedDate?.[0] % 12;
      const year = (setedDate?.[0] - month) / 12;
      const newDate = new Date(year, month - 1);

      const month2 = setedDate?.[1] % 12 === 0 ? 12 : setedDate?.[1] % 12;
      const year2 = (setedDate?.[1] - month2) / 12;
      const newDate2 = new Date(year2, month2 - 1);

      return [newDate, newDate2];
    }

    const month = setedDate % 12 === 0 ? 12 : setedDate % 12;
    const year = (setedDate - month) / 12;

    const newDate = new Date(year, month - 1);

    return newDate;
  };

  const textDate = Array.isArray(convertedDate)
    ? `Selected dates: ${moment(convertedDate?.[0]).format(
        "MM/YYYY"
      )}, ${moment(convertedDate?.[1]).format("MM/YYYY")}`
    : `${moment(convertedDate).format("MM/YYYY")}`;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"cs"}>
      <Box>
        <Typography sx={sxLabel}>
          {header} {textDate}
        </Typography>
        <StyledSlider
          max={maxDate}
          min={minDate}
          disableSwap
          onChange={(e, val) => {
            setConvertedDate(dateConverter(val));
          }}
          marks={[
            {
              value: minDate,
              label: moment(min).format("MM/YYYY"),
            },
            {
              value: maxDate,
              label: moment(max).format("MM/YYYY"),
            },
          ]}
          orientation={position}
          value={
            monthYearConverter(convertedDate) || monthYearConverter(inputDate)
          }
          valueLabelDisplay={display}
          sx={sx}
        />
      </Box>
    </LocalizationProvider>
  );
}
DateSlider.displayName = "DateSlider";
