import { TextField, Autocomplete } from "@mui/material";

// eslint-disable-next-line import/no-unresolved
import { tx } from "textUtils";
// eslint-disable-next-line import/no-unresolved
import texts from "texts";

const TEXT = texts.filters;
const LABELS = texts.filters.labels;

export const SortingBy = (props) => {
  const { filtConds, setFiltConds, current, comboBoxOptions, activatedInputs } =
    props;
  return (
    <Autocomplete
      className={"fieldstylefullnamefilter" + " " + "outlined-read-only-input"}
      autoHighlight
      options={comboBoxOptions.sortingBy}
      noOptionsText={null}
      onInputChange={(e, sortingBy) => {
        if (comboBoxOptions.sortingBy.includes(sortingBy) || !sortingBy) {
          setFiltConds({ ...filtConds, sortingBy });
        }
      }}
      sx={{ minWidth: "325px" }}
      value={filtConds?.sortingBy || null}
      renderInput={(params) => (
        <TextField
          {...params}
          className={"list-filter-input" + " " + "outlined-read-only-input"}
          label={tx(LABELS.sortingBy) + ""}
          name="sortingBy"
          error={
            activatedInputs.sortingBy.validation
              ? !!current.message(
                  "sortingBy",
                  filtConds.sortingBy,
                  `required|in:${comboBoxOptions.sortingBy}`
                )
              : null
          }
          helperText={
            activatedInputs.sortingBy.validation
              ? current.message(
                  "sortingBy",
                  filtConds.sortingBy,
                  `required|in:${comboBoxOptions.sortingBy}`,
                  {
                    messages: {
                      required: tx(TEXT.validation.fill, {
                        var: TEXT.variables.sorting,
                      }),
                      in: tx(TEXT.validation.select, {
                        var: TEXT.variables.sortedItem,
                      }),
                    },
                  }
                )
              : null
          }
          variant="outlined"
          size="small"
          // InputLabelProps={{
          //   shrink: true,
          // }}
        />
      )}
    />
  );
};
