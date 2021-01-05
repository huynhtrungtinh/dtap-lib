import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import LocalPhone from '@material-ui/icons/LocalPhone';
import MailOutline from '@material-ui/icons/MailOutline';
import {isArray, isEmpty} from 'lodash';
import React from 'react';
import {CONTACT_MENU_ID, IContacts} from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            padding: 0
        },
        info: {
            padding: '0px',
        },
        listItemText1: {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            backgroundColor: theme.palette.primary.main,
        },
        listItemText2: {
            width: '100%',
            textAlign: 'center',
            color: 'black'
        },
        title: {
            padding: 0,
            marginTop: '-8px',
            color: theme.palette.primary.contrastText,
        },
        titleText: {
            fontWeight: 'bold',
            fontSize: 'large'
        },
        divider: {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
        item: {
            color: 'black',
            marginLeft: -10
            // ...defaultFont
        },
        formControlLabel: {
            margin: '0px 10px 0px 0px'
        }
    })
);

const ICONS: any = {
    "mail": <IconButton
        aria-label="mail"
        color="default"
    >
        <MailOutline />
    </IconButton>,
    "hotline": <IconButton
        aria-label="hotline"
        color="default"
    >
        <LocalPhone />
    </IconButton>
}
function ContactMenuComponent(props: any) {
    const classes: any = useStyles();
    const {isOpen = false, setOpen = () => null, anchorEl = null, datas = []} = props;
    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event);
    };
    return (
        <Menu
            id={CONTACT_MENU_ID}
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
            {
                datas.map((items: IContacts | any, indexDatas: any) => {
                    return Object.keys(items).map((key: string, indexItems: any) => {
                        const item = items[key];
                        if (key === "title" && !isEmpty(item)) {
                            return (
                                <MenuItem key={`${indexDatas}${indexItems}-${key}`} className={classes.title}>
                                    <div className={classes.listItemText1}><span className={classes.titleText}>{item}</span></div>
                                </MenuItem>
                            )
                        } else if (!isEmpty(item) && isArray(item)) {
                            const icon = ICONS[key];
                            return item.map((i: any, indexItem: any) => {
                                return (
                                    <MenuItem key={`${indexDatas}${indexItems}${indexItem}-${key}`} className={classes.info}>
                                        <div className={classes.listItemText2}>
                                            <FormControlLabel
                                                className={classes.formControlLabel}
                                                control={icon}
                                                label={<span className={classes.item}>{i}</span>}
                                            />
                                        </div>
                                    </MenuItem>
                                )
                            })
                        }
                        return null;
                    })
                })
            }
        </Menu>
    )

}
export {ContactMenuComponent};
export default ContactMenuComponent;
