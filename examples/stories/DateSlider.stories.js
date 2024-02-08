import React from "react";
import { DateSlider } from "../../components/sliders";

export default {
  component: DateSlider,
  title: "Sliders/DateSlider",
};

const Template = (args) => {
  return <DateSlider {...args} />;
};

const now = new Date(Date.now());
const before = new Date(2022, 4, 1);
const minDate = new Date(2022, 0, 1);
const maxDate = new Date(2024, 11, 1);

export const OneDateSlider = Template.bind({});
OneDateSlider.args = {
  header: "Pick the date:",
  inputDate: now,
  min: minDate,
  max: maxDate,
  display: "off",
  sxLabel: { fontSize: "18px", fontWeight: "bold", color: "#002b59" },
  sx: { color: "#00a1e0" },
};

export const TwoDatasSlider = Template.bind({});
TwoDatasSlider.args = {
  header: "Pick the date range!",
  inputDate: [before, now],
  min: minDate,
  max: maxDate,
  display: "off",
  sxLabel: { color: "#002b59", fontSize: "18px", fontWeight: "bold" },
};
