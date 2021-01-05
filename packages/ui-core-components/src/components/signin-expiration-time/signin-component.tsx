import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {TransitionProps} from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKey from '@material-ui/icons/VpnKey';
import clsx from 'clsx';
import React from 'react';
import {Translate} from 'react-redux-i18n';
import {DEFAULT_ITEM, KEY_TRANSLATE} from './signin-constants';

const useStyles = makeStyles((theme) => ({
  loginForm: {
    // background: "linear-gradient(45deg, #e6e6e6 30%, #f2f2f2 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
    padding: '24px 24px 0px 24px',
    borderRadius: '10px'
  },
  itemActions: {
    textAlign: 'center'
  },
  button: {
    background: 'linear-gradient(45deg, #21CBF3 30%, #9ed1fa 90%)',
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    margin: '16px 0px 16px 0px',
    minWidth: 200
  },
  buttonLogout: {
    background: 'linear-gradient(45deg, #e6e6e6 30%, #f2f2f2 90%)',
    border: 0,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgb(0 0 0 / 11%)',
    margin: '16px 0px 16px 0px',
    minWidth: 200
  },
  margin: {
    marginRight: '16px',
    marginLeft: '16px',
  }
}));


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SigninComponent(props: any) {
  const {
    setUnmount = () => null,
    setSubmit = () => null,
    setClose = () => null,
    setMofify = () => null,
    setShowText = () => null,
    username = {...DEFAULT_ITEM},
    password = {...DEFAULT_ITEM, fieldType: 'password'},
    errorMessage = null,
    open = false,
    // match
  } = props;
  const classes = useStyles();
  React.useEffect(() => {
    try {
      window.addEventListener('keypress', handleKeyboard, true)
    } catch (e) {console.log('e: ', e)}
    return () => {
      window.removeEventListener("keypress", handleKeyboard, true);
      setUnmount();
    }
  }, []);

  const handleChange = (event: any) => {
    const {name, value} = event.target;
    setMofify(name, value);
  };

  const handleShowText = (fieldKey: any) => (event: any) => {
    setShowText(fieldKey)
  };

  const handleSubmit = () => {
    setSubmit();
  }
  const handleClose = () => {
    setClose();
  }

  const handleKeyboard = (event: any) => {
    // cancelEvent(event);
    // if (event.charCode == 13) {
    //   handleSubmit();
    // }
  }
  if (!open) {return <></>}
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Grid
        container
        spacing={0}
        className={classes.loginForm}
      >
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{fontWeight: 'bold', textAlign: 'center'}}>
            <Translate value={`${KEY_TRANSLATE}.title`} />
          </Typography>
          {
            errorMessage &&
            <Typography gutterBottom variant="h5"
              style={{color: 'red', height: '40px'}}
            >
              {errorMessage}
            </Typography>
          }
          <TextField
            fullWidth={true}
            margin="normal"
            autoComplete="new-username-222"
            autoFocus={true}
            id='username-222'
            name='username'
            type='text'
            label={<Translate value={`${KEY_TRANSLATE}.username`} />}
            value={username.value}
            onChange={handleChange}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><AccountCircleIcon /></InputAdornment>),
            }}
            helperText={username.errorMessage}
            error={username.errorMessage.length > 0 ? true : false}
            required
          />

          <TextField
            fullWidth={true}
            autoComplete="new-password-222"
            margin="normal"
            id='password-222'
            name='password'
            type={password.show_text ? 'text' : 'password'}
            label={<Translate value={`${KEY_TRANSLATE}.password`} />}
            value={password.value}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" >
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleShowText('password')}
                    tabIndex={-1}
                  >
                    {password.show_text ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (<InputAdornment position="start"><VpnKey /></InputAdornment>),
            }}
            helperText={password.errorMessage}
            error={password.errorMessage.length > 0 ? true : false}
            required
          />

          <div className={classes.itemActions}>
            <Button className={clsx(classes.buttonLogout, classes.margin)} onClick={handleClose}>
              <Translate value={`${KEY_TRANSLATE}.logout`} />
            </Button>

            <Button className={clsx(classes.button, classes.margin)} onClick={handleSubmit}>
              <Translate value={`${KEY_TRANSLATE}.login`} />
            </Button>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}
export default SigninComponent;
export {SigninComponent};

