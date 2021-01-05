import Button from '@material-ui/core/Button';
import {makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import {Translate} from 'react-redux-i18n';
import {KEY_TRANSLATE} from './dashboard-constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  margin: {
    marginRight: 4
  },
  primaryLight: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  secondaryLight: {
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  },
  errorLight: {
    background: theme.palette.error.light,
    color: theme.palette.secondary.contrastText,
  },
  warningLight: {
    background: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  },
  infoLight: {
    background: theme.palette.info.light,
    color: theme.palette.info.contrastText,
  },
  successLight: {
    background: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },

  primaryMain: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  secondaryMain: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  errorMain: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  warningMain: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  infoMain: {
    background: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
  successMain: {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },

  primaryDark: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  secondaryDark: {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
  },
  errorDark: {
    background: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  },
  warningDark: {
    background: theme.palette.warning.dark,
    color: theme.palette.warning.contrastText,
  },
  infoDark: {
    background: theme.palette.info.dark,
    color: theme.palette.info.contrastText,
  },
  successDark: {
    background: theme.palette.success.dark,
    color: theme.palette.success.contrastText,
  },
}));

function DashboardComponent(props: any) {
  const {
    setLogout = () => null,
    callAPIGetApps = () => null,
    callAPIGetFile = () => null,
    callAPIGetFile2 = () => null,
  } = props;
  const classes = useStyles();

  const handleLogout = () => {
    setLogout();
  }

  const handleCallApiNormal = () => {
    callAPIGetApps();
  }
  const handleCallApiFile = () => {
    callAPIGetFile();
  }
  const handleCallApiFile2 = () => {
    callAPIGetFile2();
  }
  return (
    <div className={clsx(classes.root)}>
      <div style={{display: 'flex', margin: 10, overflow: 'auto'}}>
        <Button variant="contained" className={clsx(classes.primaryLight, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.primary`} />
        </Button>

        <Button variant="contained" className={clsx(classes.secondaryLight, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.secondary`} />
        </Button>

        <Button variant="contained" className={clsx(classes.errorLight, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.error`} />
        </Button>

        <Button variant="contained" className={clsx(classes.warningLight, classes.margin)}>
          <Translate value={`${KEY_TRANSLATE}.warning`} />
        </Button>

        <Button variant="contained" className={clsx(classes.successLight, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.success`} />
        </Button>

        <Button variant="contained" className={clsx(classes.infoLight, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.info`} />
        </Button>
      </div>

      <div style={{display: 'flex', margin: 10, overflow: 'auto'}}>
        <Button variant="contained" color="primary" className={classes.margin} onClick={handleLogout}>
          <Translate value={`${KEY_TRANSLATE}.primary`} />
        </Button>

        <Button variant="contained" color="secondary" className={classes.margin} onClick={handleCallApiNormal}>
          <Translate value={`${KEY_TRANSLATE}.secondary`} />
        </Button>

        <Button variant="contained" className={clsx(classes.errorMain, classes.margin)} onClick={handleCallApiFile}>
          <Translate value={`${KEY_TRANSLATE}.error`} />
        </Button>

        <Button variant="contained" className={clsx(classes.warningMain, classes.margin)} onClick={handleCallApiFile2}>
          <Translate value={`${KEY_TRANSLATE}.warning`} />
        </Button>

        <Button variant="contained" className={clsx(classes.successMain, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.success`} />
        </Button>

        <Button variant="contained" className={clsx(classes.infoMain, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.info`} />
        </Button>
      </div>

      <div style={{display: 'flex', margin: 10, overflow: 'auto'}}>
        <Button variant="contained" className={clsx(classes.primaryDark, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.primary`} />
        </Button>

        <Button variant="contained" className={clsx(classes.secondaryDark, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.secondary`} />
        </Button>

        <Button variant="contained" className={clsx(classes.errorDark, classes.margin)}>
          <Translate value={`${KEY_TRANSLATE}.error`} />
        </Button>

        <Button variant="contained" className={clsx(classes.warningDark, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.warning`} />
        </Button>

        <Button variant="contained" className={clsx(classes.successDark, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.success`} />
        </Button>

        <Button variant="contained" className={clsx(classes.infoDark, classes.margin)} >
          <Translate value={`${KEY_TRANSLATE}.info`} />
        </Button>
      </div>
    </div>
  );
}
export default DashboardComponent;
export {DashboardComponent};

