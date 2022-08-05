import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
// import { selectClasses, getClasses } from '../../store/main/classesSlice';
import ClassesStudentsTableHead from './ClassesStudentsTableHead';
import { useGetClassesQuery } from 'app/services/mainService';
import  isEmpty  from '../../../helpers/isEmpty';

function ClassesStudentsTable(props) {
  const dispatch = useDispatch();
  // const classes = useSelector(selectClasses);
  const searchText = useSelector(({ main }) => main.classes.searchText);
  const { data, isLoading, error } = useGetClassesQuery();

  // const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [dataStudentsClass, setDataStudentsClass] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState({ direction: 'asc', id: null, });

  // useEffect(() => {
  //   dispatch(getClasses()).then(() => setLoading(false));
  // }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setDataStudentsClass(FuseUtils.filterArrayByString(data, searchText));
      setPage(0);
    } else {
      setDataStudentsClass(data);
    }
  }, [data, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (sortDirection.id === property && sortDirection.direction === 'desc') {
      direction = 'asc';
    }

    setSortDirection({ direction, id });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(dataStudentsClass.map((n) => n._id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/apps/e-commerce/classes/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (!isEmpty(dataStudentsClass) && dataStudentsClass.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no classes!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ClassesStudentsTableHead
            selectedClassIds={selected}
            order={sortDirection}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={!isEmpty(dataStudentsClass) ? dataStudentsClass.length : 0}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {
            _.orderBy(
              dataStudentsClass,
              [
                (o) => {
                  switch (sortDirection.id) {
                    case '_id': {
                      return o._id;
                    }
                    case 'name': {
                      return o.name;
                    }
                    case 'teacher': {
                      return o.teachers
                    }
                    case 'total': {
                      return o.total
                    }
                    default: {
                      return o[sortDirection.id];
                    }
                  }
                },
              ],
              [sortDirection.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n._id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n._id}
                    selected={isSelected}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n._id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n._id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.homeroom_teachers.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.total}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 bclass-t-1"
        component="div"
        count={!isEmpty(dataStudentsClass) ? dataStudentsClass.length : 0 }
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ClassesStudentsTable);
