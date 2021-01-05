import { setAuthLogout } from '@dtap/ui-core';
import { get } from 'lodash';
import { PATH_TO_STORE_REDUX, SET_OPEN_CONTACT_MENU, SET_OPEN_MENU_PROFILE, SET_OPEN_MOBILE_MENU } from '../../constants';
import { callAPIGetContactInfo } from '../call-api';
import { executeActionReducer } from '../common-actions';

export const setOpenMenuProfile = (event: React.MouseEvent<HTMLElement> | null, isOpen?: Boolean) => async (dispatch: any, getState: any) => {
    let isMenuProfileOpen = false;
    let profileAnchorEl = null;
    if (isOpen && event) {
        profileAnchorEl = event.currentTarget;
        isMenuProfileOpen = true;
    }
    dispatch(executeActionReducer(SET_OPEN_MENU_PROFILE, {isMenuProfileOpen, profileAnchorEl}));
};

export const setOpenMobileMenu = (event: React.MouseEvent<HTMLElement>, isOpen?: Boolean) => async (dispatch: any, getState: any) => {
    let isMobileMenuOpen = false;
    let mobileMoreAnchorEl = null;
    if (isOpen && event) {
        mobileMoreAnchorEl = event.currentTarget;
        isMobileMenuOpen = true;
    }
    dispatch(executeActionReducer(SET_OPEN_MOBILE_MENU, {isMobileMenuOpen, mobileMoreAnchorEl}));
};

export const setOpenContactMenu = (event: React.MouseEvent<HTMLElement>, isOpen?: Boolean) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    const contactsData = state.contactsData || [];
    let payload: any = {
        isContactMenuOpen: false,
        contactAnchorEl: event && event.currentTarget || null,
    };
    if (contactsData.length === 0 && isOpen) {
        const dataAPI: any = await dispatch(callAPIGetContactInfo());
        if (dataAPI.error) {
            console.log('get contacts data is error.');
        } else {
            payload.contactsData = dataAPI.data.contact;
            payload.isContactMenuOpen = true;
        }
    } else if (isOpen) {
        payload.isContactMenuOpen = true;
    }
    dispatch(executeActionReducer(SET_OPEN_CONTACT_MENU, payload));
};

export const setSignOut = () => async (dispatch: any, getState: any) => {
    dispatch(setOpenMenuProfile(null, false));
    await dispatch(setAuthLogout())
}
