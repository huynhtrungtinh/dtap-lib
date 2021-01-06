import '@dtap/ui-scl/css/signin-css.css';
import {cancelEvent} from '@dtap/ui-utils';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKey from '@material-ui/icons/VpnKey';
import React from 'react';
import {I18n, Translate} from 'react-redux-i18n';
import {AlertComponent} from '../alert';
import {Backdrop as BackdropCustom} from '../backdrop';
import {DEFAULT_ITEM, KEY_TRANSLATE} from './signin-constants';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: 'url("./images/background-sign-in.jpg")',
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    // backgroundAttachment: "fixed",
    width: "auto",
    height: '100vh',
    position: 'relative',

    textAlign: 'center',
    fontSize: '100%',
    backgroundColor: '#ECEEF1'
  },
  copyRight: {
    position: 'absolute',
    bottom: '10px'
  },
  loginForm: {
    // boxShadow: "1px 1px 20px 7px rgb(255 255 255 / 91%)",
    padding: '24px 24px 0px 24px',
    borderRadius: '10px',
    background: '#FFF',
    border: '2px solid #00A6A6',
    marginTop: '-16px'
  },
  itemActions: {
    textAlign: 'center'
  },
  button: {
    background: 'linear-gradient(45deg, #00A6A6 30%, #35D3D3 90%)',
    opacity: '80%',
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgb(242 242 242)',
    margin: '16px 0px 16px 0px',
    minWidth: 200,
    fontWeight: 'bold',
    fontSize: '20px',
    zIndex: 200
  },
  textField: {
    background: "#e8f0fe",
    opacity: '80%',
    boxShadow: '0px 1px 14px 3px rgb(242 242 242)',
    color: 'white',
    padding: '0px 0px 0px 5px',
    width: 'calc(100% - 5px)',
    zIndex: 200
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{fontWeight: 'bold'}}>
      {'Copyright © '}
      <Link color="inherit" href="https://dtap.com/">
        DTAP
			</Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

function Signin(props: any) {
  const {
    setUnmount = () => null,
    setSubmit = () => null,
    setMofify = () => null,
    setShowText = () => null,
    username = {...DEFAULT_ITEM},
    password = {...DEFAULT_ITEM, fieldType: 'password'},
    errorMessage = null,
    // width = 'lg'
  } = props;
  const classes = useStyles();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    try {
      window.addEventListener('keypress', handleKeyboard, true)
    } catch (e) {console.log('e: ', e)}
    return () => {
      window.removeEventListener("keypress", handleKeyboard, true);
      setUnmount();
    }
  }, []);


  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, [isReady]);

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

  const handleKeyboard = (event: any) => {
    if (event.charCode == 13) {
      cancelEvent(event);
      handleSubmit();
    }
  }

  if (!isReady) {
    return (
      <>
        <Backdrop open={true} style={{color: "red", backgroundColor: '#f2f2f2'}}>
          <CircularProgress size={100} />
        </Backdrop>
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        {/* {
          (width === 'xs') ?
            <>
              <span className='l-sgmd-sgm'>D</span>
              <span className='l-sgmt-sgm'>T</span>
              <span className='l-sgma-sgm'>A</span>
              <span className='l-sgmp-sgm'>P</span>
            </>
            :
            <>
              <span className='l-sgd-sg'>D</span>
              <span className='l-sgt-sg'>T</span>
              <span className='l-sga-sg'>A</span>
              <span className='l-sgp-sg'>P</span>
            </>
        } */}

        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="flex-end"
        // className={classes.root}
        >
          <Grid item xs={10} sm={6} md={4} lg={3} xl={3} className={classes.loginForm}>
            {
              errorMessage &&
              <Typography gutterBottom variant="h5"
                style={{color: 'red', height: '40px'}}
              >
                {errorMessage}
              </Typography>
            }
            <TextField
              className={classes.textField}
              fullWidth={true}
              margin="normal"
              autoComplete="new-username-111"
              autoFocus={true}
              id='username-111'
              name='username'
              type='text'
              placeholder={I18n.t(`${KEY_TRANSLATE}.username`)}
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
              className={classes.textField}
              fullWidth={true}
              autoComplete="new-password-111"
              margin="normal"
              id='password-111'
              name='password'
              type={password.show_text ? 'text' : 'password'}
              placeholder={I18n.t(`${KEY_TRANSLATE}.password`)}
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
              <Button className={classes.button} onClick={handleSubmit}>
                <Translate value={`${KEY_TRANSLATE}.login`} />
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} className={classes.copyRight}>
            <Copyright />
          </Grid>
        </Grid>
        <BackdropCustom />
        <AlertComponent />
      </div>

    </>
  );
}

const SigninComponent: any = withWidth()(Signin);
export default SigninComponent;
export {SigninComponent};

