import {makeStyles, Theme} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    }
}));

interface IProps {
    children?: any;
    isRejectRoom?: any;
    socketIO?: any;
    getDataForReady?: Function;
    isReady?: Boolean;
    version?: string;
    match?: any;
    setBreakpoints?: Function;
    width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    heightRoot?: number;
    widthRoot?: number;
}


function WapperComponent(props: IProps) {
    const {
        getDataForReady = () => null,
        // isReady = false,
        // width,
        heightRoot = 0,
    } = props;
    // const size: any = useWindowSize();
    const classes = useStyles({heightRoot});
    React.useEffect(() => {
        getDataForReady()
    }, [])

    return (
        <React.Fragment>
            <div className={classes.root}></div>
            this is system assginment page.
        </React.Fragment>
    )
}

const WapperRootComponent: any = withWidth()(WapperComponent)
export default WapperRootComponent;
export {WapperRootComponent};

