
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {errorCardHeader, infoCardHeader, primaryCardHeader, secondaryCardHeader, successCardHeader, warningCardHeader} from './common';
const cardIconStyle: any = makeStyles((theme: Theme): any =>
  createStyles({
    cardIcon: {
      "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
        borderRadius: "3px",
        backgroundColor: theme.palette.grey[100],
        padding: "15px",
        marginTop: "-20px",
        marginRight: "15px",
        float: "left"
      }
    },
    warningCardHeader,
    successCardHeader,
    errorCardHeader,
    infoCardHeader,
    primaryCardHeader,
    secondaryCardHeader
  })
)

export default cardIconStyle;
