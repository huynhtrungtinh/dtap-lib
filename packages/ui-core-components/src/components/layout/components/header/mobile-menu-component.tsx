import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToAppOutlined';
import MailIcon from '@material-ui/icons/Mail';
import Phone from '@material-ui/icons/Phone';
import VpnKey from '@material-ui/icons/VpnKey';
import React from 'react';
import {Translate} from 'react-redux-i18n';
// import { PushNotifications } from '../../../components/push_notifications';
import {CONTACT_MENU_ID, KEY_TRANSLATE, MOBILE_MENU_ID} from '../../constants';
import {ContactMenuContainers} from '../../containers';

function MobileMenuComponent(props: any) {
    const {
        mobileMoreAnchorEl,
        isMobileMenuOpen = false,
        setOpenMobileMenu = () => null,
        setOpenContactMenu = () => null,
        setOpenDialogChangePassword = () => null,
        setSignOut = () => null,
        username = '',
        isViewAnnouncement = false
    } = props;
    const handleMobileMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMobileMenu(event);
    };
    const handleContactMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpenContactMenu(event, true);
    };
    const handleChangePassword = () => {
        setOpenDialogChangePassword(true);
    }
    const handleLogOut = () => {
        setSignOut();
    }

    return (
        <>
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                id={MOBILE_MENU_ID}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
                style={{top: '35px'}}
            >
                <MenuItem>
                    <IconButton
                        aria-label="fullname"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>{username}</p>
                </MenuItem>

                {/* <MenuItem>
                <p><Translate value={`${KEY_TRANSLATE}.header.notifications`} /></p>
            </MenuItem> */}

                <MenuItem onClick={handleContactMenuOpen}>
                    <IconButton
                        aria-controls={CONTACT_MENU_ID}
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Phone />
                    </IconButton>
                    <p><Translate value={`${KEY_TRANSLATE}.header.contact`} /></p>
                </MenuItem>

                {
                    isViewAnnouncement &&
                    <MenuItem>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <p><Translate value={`${KEY_TRANSLATE}.header.announcement`} /></p>
                    </MenuItem>
                }

                <MenuItem onClick={handleChangePassword}>
                    <IconButton
                        aria-label="changpassword"
                        color="inherit"
                    >
                        <VpnKey />
                    </IconButton>
                    <p><Translate value={`${KEY_TRANSLATE}.header.change_password`} /></p>
                </MenuItem>

                <MenuItem onClick={handleLogOut}>
                    <IconButton
                        aria-label="logout"
                        color="inherit"
                    >
                        <ExitToApp />
                    </IconButton>
                    <p><Translate value={`${KEY_TRANSLATE}.header.signout`} /></p>
                </MenuItem>
            </Menu>
            <ContactMenuContainers />
        </>
    )
}
export {MobileMenuComponent};
export default MobileMenuComponent;
