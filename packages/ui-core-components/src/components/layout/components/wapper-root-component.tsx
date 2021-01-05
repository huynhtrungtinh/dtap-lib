import { defaultThemes } from '@dtap/ui-scl';
import { useWindowSize } from '@dtap/ui-utils';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import React from 'react';
import { match, useHistory } from 'react-router-dom';
import { AlertComponent } from '../../alert';
import { Backdrop } from '../../backdrop';
import { SigninExpirationTime } from '../../signin-expiration-time';
import { HEIGHT_HEADER, ID_HEADER } from '../constants';
import { HeaderContainers } from '../containers';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    header: {
        height: `${HEIGHT_HEADER}px`,
        maxHeight: `${HEIGHT_HEADER}px`,
        minHeight: `${HEIGHT_HEADER}px`,
        width: '100%',
        zIndex: 10000,
        position: 'fixed'
    },
    content: {
        width: '100%',
        marginTop: '48px',
        // height: `calc(100% - ${HEIGHT_HEADER}px)`,
        height: (props: any) => `${props.heightContent - HEIGHT_HEADER}px`,
        maxHeight: (props: any) => `${props.heightContent - HEIGHT_HEADER}px`,
        minHeight: (props: any) => `${props.heightContent - HEIGHT_HEADER}px`,
        // backgroundColor: theme.palette.background.default,
        // color: theme.palette.background.default,
        // backgroundColor: commonCss.backgroundColorBody,
        overflow: 'auto'
    }
}));

interface IProps {
    children?: any;
    isRejectRoom?: any;
    socketIO?: any;
    getDataForReady?: Function;
    isReady?: boolean;
    version?: string;
    match?: match;
    setBreakpoints?: Function;
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    heightRoot?: number;
    widthRoot?: number;
    isAuthenticated?: boolean;
    isCheckToken?: boolean;
}

const theme: any = createMuiTheme(defaultThemes);

function WapperComponent(props: IProps) {
    const {
        children, version,
        getDataForReady = () => null,
        setBreakpoints = () => null,
        isReady = false,
        width,
        heightRoot = 0,
        match = {},
        isAuthenticated = false,
        isCheckToken = false
        // widthRoot = 0,
        // isRejectRoom, socketIO,
    } = props;
    const size: any = useWindowSize();
    const classes = useStyles({heightRoot});
    const history = useHistory();

    React.useEffect(() => {
        getDataForReady({version, match, history})
    }, [isAuthenticated, isCheckToken])

    React.useEffect(() => {
        setBreakpoints(width, size);
    }, [width, isAuthenticated, isCheckToken])

    if (!isAuthenticated) {
        return <></>
    }
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {
                    isReady && isCheckToken &&
                    <div className={classes.root}>
                        <div className={classes.header} id={ID_HEADER}>
                            <HeaderContainers match={match} />
                        </div>
                        <div className={classes.content}>
                            {(children && children)}
                        </div>
                    </div>
                }
                <AlertComponent />
                <Backdrop />
                <SigninExpirationTime />
            </MuiThemeProvider>
        </React.Fragment>
    )
}

const WapperRootComponent: any = withWidth()(WapperComponent);
export default WapperRootComponent;
export { WapperRootComponent };

