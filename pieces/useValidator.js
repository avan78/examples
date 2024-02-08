import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";

// eslint-disable-next-line import/no-unresolved
import { tx } from "textUtils";
// eslint-disable-next-line import/no-unresolved
import texts from "texts";

const TEXT = texts.hooks.useValidator;
const MaxNumber = 32767;

const useValidator = (customValidator = {}) => {
  const [show, setShow] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        email: tx(TEXT.email),
        default: tx(TEXT.default),
      },
      element: false,
      validators: {
        ...customValidator,
        customDate: {
          message: tx(TEXT.date),
          rule: (val, params, validator) => {
            return (
              parseInt(/-\d{1,2}/.exec(val)) < 32 &&
              parseInt(/-\d{1,2}(?=-\d{1,2})/.exec(val)) < 13 &&
              validator.helpers.testRegex(
                val,
                /^\d{4}-(| )\d{1,2}-(| )\d{1,2}$/i
              )
            );
          },
        },

        customShort: {
          message: tx(TEXT.shortFormat, {
            maxNumber: MaxNumber,
          }),
          rule: (val) => parseFloat(val) <= 32767 && parseFloat(val) >= 0,
        },
        customPlusValue: {
          message: tx(TEXT.plusValue),
          rule: (val) => parseInt(val) > 0,
        },
        customDateValue: {
          message: tx(TEXT.dateValue),
          rule: (val) => moment(val).isValid(),
        },
        customTimeFromValue: {
          message: tx(TEXT.dateValue),
          rule: (val) => moment(val?.timeFrom).isValid(),
        },

        customTimeToValue: {
          message: tx(TEXT.dateValue),
          rule: (val) => moment(val?.timeTo).isValid(),
        },

        customDateScale: {
          message: tx(TEXT.dateScale),
          rule: (val) =>
            moment(val) >=
              new Date(new Date(new Date().setFullYear(1970, 0, 0))) &&
            moment(val) <=
              new Date(new Date(new Date().setFullYear(2099, 11, 31))),
        },
        customDateComparing: {
          message: tx(TEXT.dateComparing),
          rule: (val, val1) => {
            if (val && val1) {
              return new Date(val) <= new Date(val1);
            }
            return true;
          },
        },

        // form ehv inputs
        customDateComparing2: {
          message: tx(TEXT.dateComparing2),
          rule: (val, val1) => {
            if (val && val1) {
              return new Date(val) >= new Date(val1);
            }
            return true;
          },
        },

        customDateToComparing: {
          message: tx(TEXT.dateComparing),
          rule: (filtConds) => {
            const { from, to } = filtConds;
            if (from && to) {
              return new Date(from) <= new Date(to);
            }
            return true;
          },
        },

        customTimeComparing: {
          message: tx(TEXT.timeComparing),
          rule: (filtConds) => {
            const { from, to, timeFrom, timeTo } = filtConds;

            if (
              from &&
              to &&
              timeFrom &&
              timeTo &&
              new Date(from).getFullYear() === new Date(to).getFullYear() &&
              new Date(from).getMonth() === new Date(to).getMonth() &&
              new Date(from).getDate() === new Date(to).getDate()
            ) {
              // compare just time, not date -> same date for both vals
              const sameDate = [2022, 1, 1];
              return (
                new Date(timeFrom).setFullYear(...sameDate) <=
                new Date(timeTo).setFullYear(...sameDate)
              );
            }
            return true;
          },
        },
      },
    })
  );

  // uncomment to display validator object
  //  console.log("validator.current.errorMessages");
  //  console.log(validator.current);
  if (show) {
    validator.current.showMessages();
  }

  return [validator, setShow];
};

export default useValidator;
