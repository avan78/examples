import React from "react";
import useState from "storybook-addon-state";
import { InputDatePicker } from "../../components/inputs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/cs";

export default {
  component: InputDatePicker,
  title: "Inputs/DatePicker",
};

const Template = (args) => {
  const [filtConds, setFiltConds] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"cs"}>
      <InputDatePicker
        {...args}
        onChange={(updatedDay) => {
          setFiltConds(updatedDay);
        }}
      />
    </LocalizationProvider>
  );
};

const now = moment(new Date(Date.now())).format("DD.MM.YYYY");
const minDay = moment(new Date("01.06.2023")).format("DD.MM.YYYY");
const maxDay = moment(new Date("01.08.2023")).format("DD.MM.YYYY");

export const DatePickerSimple = Template.bind({});
DatePickerSimple.args = {
  head: "Datum od",
};

export const DPAdvancedSettings = Template.bind({});
DPAdvancedSettings.args = {
  head: "Take a holiday from:",
  filtConds: { date: moment(new Date(Date.now())).format("DD.MM.YYYY") },
  minDate: minDay,
  maxDate: maxDay,
  helperTexts: [
    { tooEarly: `Please pick the date after ${minDay}.` },
    { tooLate: `Please pick the date before ${maxDay}.` },
    { invalid: `Sorry, invalid date.` },
  ],
};
