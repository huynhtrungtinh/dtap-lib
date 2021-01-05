import '@dtap/ui-scl/css/signin-css.css';
import {cancelEvent} from '@dtap/ui-utils';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {DEFAULT_ITEM} from './signin-constants';

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

function SigninComponent(props: any) {
  const {
    setUnmount = () => null,
    setSubmit = () => null,
    setMofify = () => null,
    setShowText = () => null,
    username = {...DEFAULT_ITEM},
    password = {...DEFAULT_ITEM, fieldType: 'password'},
    errorMessage = null,
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
        <span className='l-sgd-sg'>D</span>
        <span className='l-sgt-sg'>T</span>
        <span className='l-sga-sg'>A</span>
        <span className='l-sgp-sg'>P</span>
      </div>
    </>
  );
}
export default SigninComponent;
export {SigninComponent};

