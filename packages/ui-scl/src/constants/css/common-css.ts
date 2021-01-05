
export const hexToRgb = (input: any) => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};
export const BLACK_COLOR = "#000";
export const WHITE_COLOR = "#fff";
export const ERROR_COLOR = ["#e57373", "#f44336", "#d32f2f", "#fff"];
export const WARNING_COLOR = ["#ffb74d", "#ff9800", "#f57c00", "#000000"];
export const INFO_COLOR = ["#64b5f6", "#2196f3", "#1976d2", "#fff"];
export const SUCCESS_COLOR = ["#81c784", "#4caf50", "#388e3c", "#000000"];
export const PRIMARY_COLOR = ["#78B1E9", "#356A9E", "#084989", "#fff"];
export const SECONDARY_COLOR = ["#FFE07A", "#FFC60C", "#BF9F37", "#fff"];

export const defaultThemes: any = {
  overrides: {
    save: '',
    pause: '',
    saveWithReason: '',
  },
  palette: {
    type: "light",
    background: {
      paper: "#fff",
      default: "#eef2f4" // #eef2f4 e1e2e1 //eef2f4
    },
    common: {
      black: BLACK_COLOR,
      white: WHITE_COLOR
    },
    primary: {
      light: PRIMARY_COLOR[0],
      main: PRIMARY_COLOR[1],
      dark: PRIMARY_COLOR[2],
      contrastText: PRIMARY_COLOR[3]
    },
    secondary: {
      light: SECONDARY_COLOR[0],
      main: SECONDARY_COLOR[1],
      dark: SECONDARY_COLOR[2],
      contrastText: SECONDARY_COLOR[3]
    },
    error: {
      light: ERROR_COLOR[0],
      main: ERROR_COLOR[1],
      dark: ERROR_COLOR[2],
      contrastText: ERROR_COLOR[3]
    },
    warning: {
      light: WARNING_COLOR[0],
      main: WARNING_COLOR[1],
      dark: WARNING_COLOR[2],
      contrastText: WARNING_COLOR[3]
    },
    info: {
      light: INFO_COLOR[0],
      main: INFO_COLOR[1],
      dark: INFO_COLOR[2],
      contrastText: INFO_COLOR[3]
    },
    success: {
      light: SUCCESS_COLOR[0],
      main: SUCCESS_COLOR[1],
      dark: SUCCESS_COLOR[2],
      contrastText: SUCCESS_COLOR[3]
    },
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 1)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
}
