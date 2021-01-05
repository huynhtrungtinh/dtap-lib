import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import React from 'react';
import {BACKGROUND_DEFAULT, ICON_COLOR_PROGRESS} from './backdrop-constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            backgroundColor: (props: any) => props.background,
        },
        circularProgress: {
            color: (props: any) => props.iconColor
        }
    })
);
const BackdropCustom = withStyles(() => ({
    root: {
        zIndex: 1800
    }
}))(Backdrop);

function BackdropComponent(props: any) {
    const {isOpen = false, background = BACKGROUND_DEFAULT, iconColor = ICON_COLOR_PROGRESS} = props;
    const classes = useStyles({background, iconColor});
    return (
        <BackdropCustom className={classes.backdrop} open={isOpen}>
            <CircularProgress className={classes.circularProgress} />
        </BackdropCustom>
    );
}
export default BackdropComponent;
export {BackdropComponent};

