import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import withWidth from '@material-ui/core/withWidth';
import Close from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 20,
      margin: '0 auto',
      zIndex: 1700,
      maxHeight: '300px',
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        ...(getDataForBreakpoints('xs'))
      },
      [theme.breakpoints.down('sm')]: {
        ...(getDataForBreakpoints('sm'))
      },
      [theme.breakpoints.up('md')]: {
        ...(getDataForBreakpoints('md'))
      },
      [theme.breakpoints.up('lg')]: {
        ...(getDataForBreakpoints('lg'))
      },
      [theme.breakpoints.up('xl')]: {
        ...(getDataForBreakpoints('xl'))
      }
    },
    itemGrid: {
      position: 'relative',
      maxHeight: '250px',
      width: '100%',
      overflow: 'hidden'
    },
    iconCloseAll: {
      position: 'absolute',
      top: -10,
      right: 5,
    },
    itemAlert: {
      margin: '8px'
    },
    messageLong: {
      maxHeight: '60px',
      height: '60px',
    }
  }),
);
const AlertNormal = withStyles(() => ({
  action: {
    paddingLeft: 0
  }
}))(Alert);
function getDataForBreakpoints(breakpoints: any) {
  let outPut: any = {}
  switch (breakpoints) {
    case "xs": {
      outPut = {
        left: 0,
        width: '100%',
        maxWidth: '100%'
      }
      break;
    }
    case "sm": {
      outPut = {
        left: 0,
        width: '100%',
        maxWidth: '100%'
      }
      break;
    }
    case "md": {
      outPut = {
        left: '30%',
        width: '500px',
      }
      break;
    }
    case "lg": {
      outPut = {
        left: '35%',
        width: '500px',
      }
      break;
    }
    case "xl": {
      outPut = {
        left: '40%',
        width: '500px',
      }
      break;
    }
    default:
      break;
  }
  return outPut;
}
function getStrLengthForBreakpoints(breakpoints: any) {
  let outPut: any = 49
  switch (breakpoints) {
    case "xs": {
      outPut = 35
      break;
    }
    case "sm": {
      outPut = 90
      break;
    }
    case "md":
    case "lg":
    case "xl": {
      outPut = 49
      break;
    }
    default:
      break;
  }
  return outPut;
}
function AlertCustomComponent(props: any) {
  const {setHiddenAlert = () => null, setHiddenAlertAll = () => null, alertList = [], width = 'lg'} = props;
  const strLength = getStrLengthForBreakpoints(width);
  const [isOpen, setOpen]: any = React.useState({});
  const classes = useStyles();
  const handleClose = (zIndex: any) => () => {
    setHiddenAlert(zIndex)
    setOpen({})
  }
  const handleCloseAll = () => {
    setHiddenAlertAll()
  }
  const handleOpenTooltip = (zIndex: any) => () => {
    if (isOpen[zIndex] === true || isOpen[zIndex] === false) {
      setOpen({[zIndex]: !isOpen[zIndex]})
    } else {
      setOpen({[zIndex]: true})
    }
  }
  if (alertList && alertList.length > 0) {
    return (
      <Grid
        container spacing={0}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Tooltip title="Close All" placement="top" >
          <IconButton aria-label="Close All" onClick={handleCloseAll}>
            <Close color="secondary" />
          </IconButton>
        </Tooltip>
        <Grid item xs={12} className={classes.itemGrid}>
          {
            alertList && alertList.length > 0 && alertList.map((alert: any, zIndex: any) => {
              return (
                <Grow
                  in={true}
                  style={{transformOrigin: '0 0 0'}}
                  timeout={1000}
                >
                  <Tooltip open={isOpen[zIndex] || false} title={alert.message} placement={width === 'xs' || width === 'sm' || width === 'md' ? 'top' : 'right'}>
                    <AlertNormal
                      className={classes.itemAlert}
                      variant="filled"
                      severity={alert.type}
                      onClose={handleClose(zIndex)}
                      onClick={handleOpenTooltip(zIndex)}
                    >
                      {
                        alert.message.length <= strLength ?
                          alert.message
                          :
                          `${alert.message.substr(0, strLength)} ....`
                      }
                    </AlertNormal>
                  </Tooltip>
                </Grow>
              )
            })
          }
        </Grid>
      </Grid>
    );
  }
  return (<></>);
}
const AlertComponent: any = withWidth()(AlertCustomComponent);
export default AlertComponent;
export {AlertComponent};

