import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { removeClasses } from '../../store/main/classesSlice';

const rows = [
  {
    id: '_id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Kelas',
    sort: true,
  },
  {
    id: 'homeroom_teacher',
    align: 'left',
    disablePadding: false,
    label: 'Wali Kelas',
    sort: true,
  },
  {
    id: 'total_student',
    align: 'left',
    disablePadding: false,
    label: 'Total Student',
    sort: true,
  },
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function ClassesTableHead(props) {
  const classes = useStyles(props);
  const { selectedClassIds } = props;
  const numSelected = selectedClassIds.length;

  const [selectedClassesMenu, setSelectedClassesMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedClassesMenu(event) {
    setSelectedClassesMenu(event.currentTarget);
  }

  function closeSelectedClassesMenu() {
    setSelectedClassesMenu(null);
  }

  // const {onSelectAllClick, class, classBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <div
              className={clsx(
                'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 bclass-b-1',
                classes.actionsButtonWrapper
              )}
            >
              <IconButton
                aria-owns={selectedClassesMenu ? 'selectedClassesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedClassesMenu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedClassesMenu"
                anchorEl={selectedClassesMenu}
                open={Boolean(selectedClassesMenu)}
                onClose={closeSelectedClassesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      // dispatch(removeClasses(selectedClassIds));
                      // props.onMenuItemClick();
                      closeSelectedClassesMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ClassesTableHead;
