import { contantsTable } from '@dtap/ui-scl';
import { useWindowSize } from '@dtap/ui-utils';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import React from 'react';
import { I18n } from 'react-redux-i18n';
import { useHistory } from 'react-router-dom';
import { ISideBar, KEY_TRANSLATE } from '../../constants';

const useStyle: any = makeStyles((theme: Theme): any =>
    createStyles({
        rootTable: {
            height: (props: any) => `${props.heightRoot - 16}px`,
            width: 'calc(100% - 16px)',
            margin: '8px',
            '$stickyHeader > &': {
                backgroundColor: theme.palette.common.white,
            },
        },
        containerTable: {
            maxHeight: (props: any) => `${props.maxHeightTable - 16}px`,
        },
        rowEmpty: {
            height: (props: any) => `${props.heightBody - 16}px`,
        },
        cellHeader: {
            maxHeight: '24px',
            display: 'flex',
        }
    })
)

const ID_DIV_ROOT = 'table-projects-root';

function TableProjectsComponent(props: any) {
    const {
        rows = [],
        columns = [],
        page = 0,
        height = 0,
        rowsPerPage = contantsTable.ROWS_PER_PAGE_OPTIONS[0],
        setSort = () => null,
        setPage = () => null,
        setRowsPerPage = () => null,
        setClick = () => null,
    } = props;
    const [heightRoot, setHeightRoot] = React.useState(0);
    const [maxHeightTable, setMaxHeightTable] = React.useState(0);
    const [heightBody, setHeightBody] = React.useState(0);
    const history = useHistory();
    const size: any = useWindowSize();
    const classes = useStyle({heightRoot, maxHeightTable, heightBody});

    React.useEffect(() => {
        if (height > 0) {
            const root: any = size.height - 90;
            const table: any = root - 52;
            const body: any = table - 57;
            setHeightRoot(root);
            setMaxHeightTable(table);
            setHeightBody(body);
        }
    }, [height])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = (column: unknown) => () => {
        setSort(column);
    };
    const handleClickItem = (row: any) => () => {
        setClick({...row}, history)
    }


    return (
        <Paper elevation={5} className={classes.rootTable} id={ID_DIV_ROOT}>
            <TableContainer className={classes.containerTable}>
                <Table stickyHeader aria-label="project table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column: any) => (
                                <TableCell
                                    key={column.id}
                                    style={{minWidth: column.minWidth, cursor: "pointer", background: '#f5f5f5'}}
                                    onClick={handleSort(column)}
                                >
                                    <div className={classes.cellHeader}>
                                        <div>
                                            {
                                                column.sortColumn === true && (column.sortDirection === 'asc' ?
                                                    <KeyboardArrowDown fontSize="small" /> : <KeyboardArrowUp fontSize="small" />)
                                            }
                                        </div>
                                        <div>
                                            {I18n.t(`${KEY_TRANSLATE}.${column.label}`).toUpperCase()}
                                        </div>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.length > 0 && rows.map((row: ISideBar) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                                        onClick={handleClickItem(row)} style={{cursor: 'pointer'}}>
                                        {columns.map((column: any, index: any) => {
                                            let value: any = row.display_name;
                                            if (index !== 0) {
                                                value = row.display_root_app;
                                            }
                                            return (
                                                <TableCell key={index} >
                                                    {/* <a href={getHref(`/projects/${row.id}`)} style={{width: '100%', color: 'inherit', textDecoration: 'none'}}> */}
                                                    {value}
                                                    {/* </a> */}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow >
                                );
                            })
                        }
                        <TableRow style={{height: `${rows.length === 0 ? heightBody - 16 : heightBody - (53 * rows.length) - 16}px`}}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={contantsTable.ROWS_PER_PAGE_OPTIONS}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export { TableProjectsComponent };
export default (TableProjectsComponent);
