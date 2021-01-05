import { contantsTable, IAction } from '@dtap/ui-scl';
import { ADD_TREE_ITEM_BY_TREE_NODE, BREADCRUMB_HOME, COLUMNS_PROJECT, CREATE_BREADCRUMBS_BY_TREE_NODE, NAME_REDUCER, SET_BACK_PROJECT_TABLE, SET_BREAKPOINT, SET_CLICK_SIDE_BAR_ITEM, SET_DATA_OPERATION, SET_DATA_PROJECT_TABLE, SET_DATA_READY, SET_DATA_TRAINING, SET_OPEN_CONTACT_MENU, SET_OPEN_MENU_PROFILE, SET_OPEN_MOBILE_MENU, SET_OPEN_SIDE_BAR, SET_ROW_SELECTED_PROJECT_TABLE, SET_SEARCH_SIDE_BAR, SET_SUB_TAB_NAME_PROJECT_TABLE, SET_TAB_NAME_PROJECT_TABLE, UNMOUNT } from '../constants';

export const initialState: any = {
    isReady: false,
    width: 0,
    height: 0,
    breakpoint: 'lg',
    profileAnchorEl: null,
    isMenuProfileOpen: false,
    contactAnchorEl: null,
    isContactMenuOpen: false,
    contactsData: [],
    isMobileMenuOpen: false,
    mobileMoreAnchorEl: null,

    isSideBarOpen: false,
    sideBarData: [],
    sideBarDataClonelv1: [],
    sideBarDataSearch: [],
    sideBarSelectedItem: {},
    sideBarLastNodeId: 1,
    sideBarSearchValue: "",

    breadcrumbsData: [BREADCRUMB_HOME],

    projectId: null,
    projectName: null,

    columnProject: COLUMNS_PROJECT,
    rowsProjectTrainingParent: [],
    rowsProjectOperatorParent: [],
    rowsProjectParent: [],
    rowsProjectView: [],
    rowsProjectSelected: {},
    searchProjectKeyWords: "",
    isViewTable: 0,
    isSelectedTab: 0, // 0: training, 1: project
    pageProject: 0,
    rowsPerPageProject: contantsTable.ROWS_PER_PAGE_OPTIONS[0],
    tabsSelected: {},
    subTabsSelected: {},
    // routeFocus: {},
    // routers: {},
}

type ReducerState = Readonly<typeof initialState>;
export default {
    name: NAME_REDUCER,
    reducer: (state: ReducerState = {...initialState}, actions: IAction) => {
        if (actions && actions.type) {
            const {type, payload} = actions;
            switch (type) {
                case SET_BREAKPOINT:
                case SET_OPEN_MENU_PROFILE:
                case SET_OPEN_MOBILE_MENU:
                case SET_OPEN_CONTACT_MENU:
                case SET_OPEN_SIDE_BAR:
                case SET_DATA_READY:
                case SET_CLICK_SIDE_BAR_ITEM:
                case SET_SEARCH_SIDE_BAR:
                case ADD_TREE_ITEM_BY_TREE_NODE:
                case SET_DATA_TRAINING:
                case SET_DATA_OPERATION:
                case CREATE_BREADCRUMBS_BY_TREE_NODE:
                case SET_DATA_PROJECT_TABLE:
                case SET_TAB_NAME_PROJECT_TABLE:
                case SET_ROW_SELECTED_PROJECT_TABLE:
                case SET_BACK_PROJECT_TABLE:
                case SET_SUB_TAB_NAME_PROJECT_TABLE:
                    return {
                        ...state,
                        ...payload
                    }
                case UNMOUNT:
                    return {...initialState};
                default:
                    return state;
            }
        }
        return state;
    }
};
