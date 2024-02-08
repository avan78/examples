import * as React from "react";
import { useState, useMemo } from "react";

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

  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
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

export default function MainSlider({
  header,
  defaultValue = 0,
  max = 10,
  min = -10,
  sx,
  sxLabel1,
  defaultValue2,
  header2,
  max2 = 10,
  min2 = -10,
  sx2,
  sxLabel2,
  defaultValue3,
  header3,
  max3 = 10,
  min3 = -10,
  sx3,
  sxLabel3,
  marks,
  activatedSliders,
}) {
  const [firstValue, setFirstValue] = useState(defaultValue);
  const [secondValue, setSecondValue] = useState(defaultValue2);
  const [thirdValue, setThirdValue] = useState(defaultValue3);
  const dateConverter = (firstValue, secondValue, thirdValue) => {
    moment.locale("cs");
    const date = moment(
      new Date(
        `${secondValue?.[0] || secondValue}.${firstValue?.[0] || firstValue}.${
          thirdValue?.[0] || thirdValue
        }`
      )
    ).format("DD.MM.YYYY");

    const date2 = moment(
      new Date(`${secondValue?.[1]}.${firstValue?.[1]}.${thirdValue?.[1]}`)
    ).format("DD.MM.YYYY");
  };

  useMemo(() => {
    dateConverter(firstValue, secondValue, thirdValue);
  }, [firstValue, secondValue, thirdValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"cs"}>
      <Box>
        {activatedSliders.first ? (
          <>
            <Typography sx={sxLabel1}>{header}</Typography>
            <StyledSlider
              max={max}
              min={min}
              disableSwap
              onChange={(e, newValue) => {
                setFirstValue(newValue);
              }}
              marks={marks}
              orientation={"horizontal"}
              value={firstValue}
              valueLabelDisplay={"on"}
              sx={sx}
            />
          </>
        ) : null}
        {activatedSliders.second ? (
          <>
            <Typography sx={sxLabel2}>{header2}</Typography>
            <StyledSlider
              max={max2}
              min={min2}
              disableSwap
              onChange={(e, newValue) => {
                setSecondValue(newValue);
              }}
              marks={marks}
              orientation={"horizontal"}
              value={secondValue}
              valueLabelDisplay={"on"}
              sx={sx2}
            />
          </>
        ) : null}
        {activatedSliders.third ? (
          <>
            <Typography sx={sxLabel3}>{header3}</Typography>
            <StyledSlider
              max={max3}
              min={min3}
              disableSwap
              onChange={(e, newValue) => {
                setThirdValue(newValue);
              }}
              marks={marks}
              orientation={"horizontal"}
              value={thirdValue}
              valueLabelDisplay={"on"}
              sx={sx3}
            />
          </>
        ) : null}
      </Box>
    </LocalizationProvider>
  );
}

MainSlider.displayName = "MainSlider";
