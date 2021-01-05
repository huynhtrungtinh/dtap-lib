import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToAppOutlined';
import Person from '@material-ui/icons/Person';
import VpnKey from '@material-ui/icons/VpnKey';
import React from 'react';
import {Translate} from 'react-redux-i18n';
import {KEY_TRANSLATE, MENU_ID} from '../../constants';
// import { defaultFont } from '../../../assets/css/material-dashboard-react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            color: 'black',
            // ...defaultFont
        }
    })
);
function MenuComponent(props: any) {
    const {isOpen = false, setOpen = () => null, anchorEl = null, username = '',
        setOpenDialogChangePassword = () => null, setSignOut = () => null,
    } = props;
    const classes: any = useStyles();
    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };
    const handleClickChangePassword = () => {
        setOpenDialogChangePassword(true);
    }
    const handleSignOut = () => {
        setSignOut();
    }

    return (
        <Menu
            id={MENU_ID}
            keepMounted
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            style={{top: 4}}
        >
            <MenuItem style={{cursor: "inherit", height: '40px'}} tabIndex={-1}>
                <IconButton
                    aria-label="username"
                    color="inherit"
                    style={{cursor: "inherit"}}
                >
                    <Person />
                </IconButton>
                <p className={classes.textField}>{username}</p>
            </MenuItem>

            <MenuItem onClick={handleClickChangePassword} style={{height: '40px'}}>
                <IconButton
                    aria-label="changpassword"
                    color="inherit"
                >
                    <VpnKey />
                </IconButton>
                <p className={classes.textField}><Translate value={`${KEY_TRANSLATE}.header.change_password`} /></p>
            </MenuItem>

            <MenuItem onClick={handleSignOut} style={{height: '40px'}}>
                <IconButton
                    aria-label="logout"
                    color="inherit"
                >
                    <ExitToApp />
                </IconButton>
                <p className={classes.textField}><Translate value={`${KEY_TRANSLATE}.header.signout`} /></p>
            </MenuItem>
        </Menu>
    )
}
export {MenuComponent};
export default MenuComponent;
