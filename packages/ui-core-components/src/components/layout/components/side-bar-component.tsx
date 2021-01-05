import { config, redirect } from '@dtap/ui-utils';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import clsx from 'clsx';
import { get } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON, ISideBar, PATH_HOME_KEY } from '../constants';

function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}
function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{width: 14, height: 14}} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}
declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    LabelIcon?: any;
    labelInfo?: string;
    labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.grey[200],
                // color: `${theme.palette.primary.contrastText}`,
                fontWeight: 'bold'
            },
            '&:focus > $content, &$selected > $content': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.primary.main})`,
                color: `${theme.palette.primary.contrastText}`,
                fontWeight: 'bold'
            },
            '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
                backgroundColor: 'transparent',
            },
            overflow: 'hidden'
        },
        content: {
            color: theme.palette.text.secondary,
            // borderTopRightRadius: theme.spacing(2),
            // borderBottomRightRadius: theme.spacing(2),
            // paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },
            margin: '4px',
            width: 'calc(100% - 8px)',
            height: 'calc(100% - 8px)',
        },
        group: {
            marginLeft: 15,
            '& $content': {
                paddingLeft: theme.spacing(1),
            },
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),
            height: '45px'
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1,
        },
        labelInfo: {
            marginRight: '12px',
            fontWeight: 'bold'

        }
    }),
);

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const {labelText, LabelIcon, labelInfo, color, bgColor, ...other} = props;
    return (
        <TreeItem
            label={
                <div>
                    <div className={classes.labelRoot}>
                        {
                            LabelIcon ? <LabelIcon color="inherit" className={classes.labelIcon} />
                                :
                                <div style={{width: 30}}></div>
                        }
                        {
                            labelText && labelText.length > 35 ?
                                <Tooltip title={labelText} placement="top">
                                    <Typography variant="body2" className={classes.labelText}>
                                        {labelText.slice(0, 35) + "..."}
                                    </Typography>
                                </Tooltip>
                                :
                                <Typography variant="body2" className={classes.labelText}>
                                    {labelText || ""}
                                </Typography>
                        }
                        <Typography variant="caption" color="inherit" className={classes.labelInfo}>
                            {labelInfo}
                        </Typography>
                    </div>
                    <Divider />
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            border: "none",
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            zIndex: 1,
            // backgroundColor: theme.palette.background.default,
            // backgroundColor: 'transparent',
            // ...boxShadow,
            width: (props: any) => props.drawerWidth,
            overflow: 'auto',
            height: 'calc(100% - 44px)',
            marginTop: '44px'
        },
        logo: {
            position: "relative",
            padding: "15px 40px",
            zIndex: 4,
            textAlign: "center",
            "&:after": {
                content: '""',
                position: "absolute",
                bottom: "0",
                height: "1px",
                right: "15px",
                width: "calc(100% - 30px)",
            }
        },
        logoLink: {
            textTransform: "uppercase",
            zIndex: 5,
            padding: "5px",
            fontSize: "18px",
            textAlign: "left",
            lineHeight: "30px",
            textDecoration: "none",
            display: "inline-block",
            cursor: 'pointer',
        },
        version: {
            left: '25px',
            bottom: 0,
            position: 'absolute',
            fontSize: '11px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 'bold',
            letterSpacing: '0.03333em'
        },
        treeView: {
            overflow: 'auto',
            position: 'relative'
        },
        arrowDownward: {
            position: 'absolute',
            top: 110,
            left: (props: any) => props.drawerWidth - 55,
            color: theme.palette.secondary.main,
            '&:hover': {
                color: theme.palette.secondary.contrastText,
                backgroundColor: theme.palette.secondary.main,
                fontWeight: 'bold'
            },
        },
        arrowUpward: {
            position: 'absolute',
            bottom: 8,
            left: (props: any) => props.drawerWidth - 55,
            color: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: 'bold'
            },
        },
        searchTree: {
            position: 'relative',
            width: '100%',
            borderRadius: theme.shape.borderRadius,
            // backgroundColor: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.2),
            '&:hover': {
                backgroundColor: fade(theme.palette.secondary.main, 0.8),
            },
            marginLeft: 0,
            [theme.breakpoints.up('sm')]: {
                // marginLeft: theme.spacing(1),
                width: 'auto',
            },
            height: '50px',
            marginTop: '7px'
        },
        searchIconTree: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            height: '50px',
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            paddingRight: `calc(1em + ${theme.spacing(6)}px)`,
            // borderRadius: '5px'
        },
        closeIcon: {
            position: 'absolute',
            right: 0,
            top: 0,
            padding: '2px',
            // color: theme.palette.error.main,
            zIndex: 10,
            '&:hover': {
                backgroundColor: fade(theme.palette.grey[100], 0.2),
            },
        }
    }),
);
let timeoutIdSearch: any = 0;

function SideBarComponent(props: any) {
    const {
        isOpen = false,
        setOpen = () => null,
        version = 0,

        sideBarData = [],
        setClickItem = () => null,
        setSearch = () => null,
        sideBarSearchValue = "",
        breakpoint = "lg",
        sideBarSelectedItem = {}
    } = props;

    const refContainer: any = React.useRef();
    const [isViewScrollTop, setIsViewScrollTop] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(430);
    const [searchValue, setSearchValue] = React.useState(sideBarSearchValue);
    const classes = useStyles({drawerWidth});
    const history = useHistory();

    React.useEffect(() => {
    }, [refContainer])

    React.useEffect(() => {
        switch (breakpoint) {
            case 'xs':
            case 'sm': {
                setDrawerWidth(320);
                break;
            }
            default: {
                setDrawerWidth(430);
                break;
            }
        }
    }, [breakpoint])

    const handleScroll = (e: any) => {
        if (get(refContainer, 'current.scrollTop', 0) > 150 && !isViewScrollTop) {
            setIsViewScrollTop(true);
        } else if (get(refContainer, 'current.scrollTop', 0) <= 150 && isViewScrollTop) {
            setIsViewScrollTop(false);
        }
    }

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent, ) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {return;}
        setOpen();
    };

    const handleClickHome = () => {
        redirect(PATH_HOME_KEY)
    }

    const brand = (
        <div className={classes.logo}>
            <div className={classes.logoLink} >
                <img width={'250px'} height="50px" src={`${config.getAppURL()}/images/company_logo.png`} alt="logo" onClick={handleClickHome} />
            </div>
            <div className={classes.version}><i>{`v${version}`}</i></div>
        </div>
    );

    const handleSelectedTreeItem = (event: any, nodeIds: string) => {
        setClickItem(nodeIds, history);
    }

    const handleClickUp = (event: any) => {
        if (refContainer.current) {
            refContainer.current.scrollTo(0, 0)
        }
    }

    const handleClickDown = (event: any) => {
        if (refContainer.current) {
            refContainer.current.scrollTo(0, get(refContainer, 'current.scrollHeight', 0))
        }
    }

    const handleSearch = (event: any) => {
        clearTimeout(timeoutIdSearch);
        const {name, value} = event.target;
        setSearchValue(value);
        timeoutIdSearch = setTimeout(() => {
            setSearch(name, value);
        }, 200);
    }

    const renderTreeItem = (sideBarData: ISideBar[]) => {
        if (sideBarData && sideBarData[0]) {
            return sideBarData.map((data: ISideBar) => {
                if (data) {
                    return (
                        <StyledTreeItem key={data.id} nodeId={data.id} labelText={data.display_name} labelInfo={data.info} LabelIcon={ICON[data.name] || (data.children.length > 0 ? PlusSquare : MinusSquare)} >
                            {
                                data.children.length > 0 && renderTreeItem(data.children)
                            }
                        </StyledTreeItem>
                    )
                }
                return <></>;
            })
        }
        return <></>;
    }

    return (
        <div style={{position: "relative"}}>
            <Drawer
                variant="temporary"
                anchor={"left"}
                open={isOpen}
                classes={{
                    paper: clsx(classes.drawerPaper)
                }}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                {brand}
                <Divider variant="middle" />

                <div className={classes.searchTree}>
                    <div className={classes.searchIconTree}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        name="sideBarSearchValue"
                        id="tree-search"
                        type="search"
                        classes={{
                            root: classes.inputRoot,
                        }}
                        onChange={handleSearch}
                        value={searchValue}
                        fullWidth={true}
                        autoComplete="------------------"
                    />
                </div>

                {
                    isViewScrollTop &&
                    <IconButton className={classes.arrowDownward} onClick={handleClickDown}>
                        <ArrowDownward fontSize="small" />
                    </IconButton>
                }

                <TreeView
                    className={classes.treeView}
                    defaultExpanded={[`${sideBarData.length}`]}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{width: 24}} />}
                    onNodeSelect={handleSelectedTreeItem}
                    ref={refContainer}
                    onScroll={handleScroll}
                    expanded={sideBarSelectedItem.nodeIds || []}
                    selected={sideBarSelectedItem.id || null}
                >
                    {
                        renderTreeItem(sideBarData)
                    }
                </TreeView>

                {
                    isViewScrollTop &&
                    <IconButton className={classes.arrowUpward} onClick={handleClickUp}>
                        <ArrowUpward fontSize="small" />
                    </IconButton>
                }
            </Drawer>
        </div>
    )
}
export { SideBarComponent };
export default SideBarComponent;
