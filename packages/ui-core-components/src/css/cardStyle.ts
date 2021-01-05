import { hexToRgb } from "@dtap/ui-scl";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const cardStyle: any = makeStyles((theme: Theme): any =>
  createStyles({
    card: {
      border: "0",
      // marginBottom: "30px",
      // marginTop: "30px",
      borderRadius: "6px",
      color: "rgba(" + hexToRgb(theme.palette.common.black) + ", 0.87)",
      background: theme.palette.common.white,
      width: "100%",
      boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(theme.palette.common.black) + ", 0.14)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minWidth: "0",
      wordWrap: "break-word",
      fontSize: ".875rem"
    },
    cardPlain: {
      background: "transparent",
      boxShadow: "none"
    },
    cardProfile: {
      marginTop: "30px",
      textAlign: "center"
    },
    cardChart: {
      "& p": {
        marginTop: "0px",
        paddingTop: "0px"
      }
    }
  })
)
export default cardStyle;
