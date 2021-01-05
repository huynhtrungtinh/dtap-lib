import {BLACK_COLOR, ERROR_COLOR, hexToRgb, INFO_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, SUCCESS_COLOR, WARNING_COLOR} from "@dtap/ui-scl";
const primaryBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(PRIMARY_COLOR[1]) +
        ",.4)"
};
const infoBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(INFO_COLOR[1]) +
        ",.4)"
};
const successBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(SUCCESS_COLOR[1]) +
        ",.4)"
};
const warningBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(WARNING_COLOR[1]) +
        ",.4)"
};
const errorBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(ERROR_COLOR[1]) +
        ",.4)"
};
const secondaryBoxShadow: any = {
    boxShadow:
        "0 4px 20px 0 rgba(" +
        hexToRgb(BLACK_COLOR) +
        ",.14), 0 7px 10px -5px rgba(" +
        hexToRgb(SECONDARY_COLOR[1]) +
        ",.4)"
};

const warningCardHeader: any = {
    background:
        "linear-gradient(60deg, " + WARNING_COLOR[0] + ", " + WARNING_COLOR[2] + ")",
    ...warningBoxShadow
};
const successCardHeader: any = {
    background:
        "linear-gradient(60deg, " + SUCCESS_COLOR[0] + ", " + SUCCESS_COLOR[2] + ")",
    ...successBoxShadow
};
const errorCardHeader: any = {
    background:
        "linear-gradient(60deg, " + ERROR_COLOR[0] + ", " + ERROR_COLOR[2] + ")",
    ...errorBoxShadow
};
const infoCardHeader: any = {
    background:
        "linear-gradient(60deg, " + INFO_COLOR[0] + ", " + INFO_COLOR[2] + ")",
    ...infoBoxShadow
};
const primaryCardHeader: any = {
    background:
        "linear-gradient(60deg, " + PRIMARY_COLOR[0] + ", " + PRIMARY_COLOR[2] + ")",
    ...primaryBoxShadow
};
const secondaryCardHeader: any = {
    background:
        "linear-gradient(60deg, " + SECONDARY_COLOR[0] + ", " + SECONDARY_COLOR[2] + ")",
    ...secondaryBoxShadow
};
export {warningCardHeader, successCardHeader, errorCardHeader, infoCardHeader, primaryCardHeader, secondaryCardHeader, primaryBoxShadow, infoBoxShadow, successBoxShadow, warningBoxShadow, errorBoxShadow, secondaryBoxShadow};

