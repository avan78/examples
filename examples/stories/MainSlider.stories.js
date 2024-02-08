import React from "react";
import { MainSlider } from "../../components/sliders";
export default {
  component: MainSlider,
  title: "Sliders/MainSlider",
};

const Template = (args) => {
  return <MainSlider {...args} />;
};
const now = new Date(Date.now()).getDate();
const yesterday = new Date(Date.now()).getDate() - 5;
const defaultMonth = new Date(Date.now()).getMonth() + 1;
const nextMonth = new Date(Date.now()).getMonth() + 3;
const defaultYear = new Date(Date.now()).getFullYear();
const prevYear = new Date(Date.now()).getFullYear() - 10;
const nextYear = new Date(Date.now()).getFullYear() + 10;
export const SimpleSlider = Template.bind({});
SimpleSlider.args = {
  header: "Numbers",
  marks: [
    { value: -10, label: -10 },
    { value: -5, label: -5 },
    { value: 0, label: 0 },
    { value: 5, label: 5 },
    { value: 10, label: 10 },
  ],
  activatedSliders: { first: true, second: false, third: false },
};

export const TwoValuesSlider = Template.bind({});
TwoValuesSlider.args = {
  header: "Two values",
  defaultValue: [-1, 1],
  marks: true,
  activatedSliders: { first: true, second: false, third: false },
};

export const DateSlider = Template.bind({});
DateSlider.args = {
  header: "Date",
  max: 31,
  min: 1,
  defaultValue: now,
  header2: "Month",
  max2: 12,
  min2: 1,
  defaultValue2: defaultMonth,
  header3: "Year",
  max3: 2100,
  min3: 1970,
  defaultValue3: defaultYear,
  activatedSliders: { first: true, second: true, third: true },
  marks: [
    { value: 1, label: 1 },
    { value: 31, label: 31 },
    { value: 1, label: 1 },
    { value: 12, label: 12 },
    { value: 1970, label: 1970 },
    { value: 2100, label: 2100 },
  ],
  sxLabel1: { color: "#002b59" },
  sxLabel2: { color: "#002b59" },
  sxLabel3: { color: "#002b59" },
};

export const DateSliderExtra = Template.bind({});
DateSliderExtra.args = {
  header: "Date",
  max: 31,
  min: 1,
  defaultValue: [now, yesterday],
  header2: "Month",
  max2: 12,
  min2: 1,
  defaultValue2: [defaultMonth, nextMonth],
  header3: "Year",
  max3: 2050,
  min3: 1990,
  defaultValue3: [prevYear, nextYear],
  activatedSliders: { first: true, second: true, third: true },
  sx2: { color: "#00a1e0" },
  sx3: { color: "#002b59" },
  sxLabel1: { color: "#002b59", fontWeight: "bold" },
  sxLabel2: { color: "#002b59", fontWeight: "bold" },
  sxLabel3: { color: "#002b59", fontWeight: "bold" },
  marks: [
    { value: 1, label: 1 },
    { value: 31, label: 31 },
    { value: 1, label: 1 },
    { value: 12, label: 12 },
    { value: 1990, label: 1990 },
    { value: 2050, label: 2050 },
  ],
};
