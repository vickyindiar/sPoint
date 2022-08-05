import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import clsx from 'clsx';
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
// import { selectStudents, getStudents } from '../../store/main/studentsSlice';
import StudentsTableHead from './StudentsTableHead';
import { useDeleteStudentMutation, useGetStudentsQuery } from 'app/services/mainService';
import  isEmpty  from '../../helpers/isEmpty';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { openEditStudentDialog } from 'app/store/main/studentsSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




function StudentsTable(props) {
  const dispatch = useDispatch();
  // const students = useSelector(selectStudents);
  const searchText = useSelector(({ main }) => main.students.searchText);
  const { data, isLoading, error } = useGetStudentsQuery()
  const [ deleteStudent, {isLoading: deleteLoading }] = useDeleteStudentMutation()
  // const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [dataStudent, setDataStudent] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState({ direction: 'asc', id: null, });

  // useEffect(() => {
  //   dispatch(getStudents()).then(() => setLoading(false));
  // }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setDataStudent(FuseUtils.filterArrayByString(data, searchText));
      setPage(0);
    } else {
      setDataStudent(data);
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
      setSelected(dataStudent.map((n) => n._id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/student/${item._id}`);
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
  console.log(dataStudent)
  function handleDeleteButton(id){
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this student?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               The students inside will no longer tied to this student
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())} color="primary">
                No
              </Button>
              <Button
               onClick={() => {
                 deleteStudent(id).then(f => {
                    dispatch(closeDialog())
                    dispatch(
                      showMessage({
                          message     : 'Student success deleted',//text or html
                          autoHideDuration: 2000,//ms
                          anchorOrigin: {
                              vertical  : 'top',//top bottom
                              horizontal: 'right'//left center right
                          },
                          variant: 'success'//success error info warning null
                      }))
                  }) 
                  
                  
                }
                }
                 color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </>
        ),
      })
    )
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (!isEmpty(dataStudent) && dataStudent.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no students!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <StudentsTableHead
            selectedStudentIds={selected}
            order={sortDirection}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={!isEmpty(dataStudent) ? dataStudent.length : 0}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {
            _.orderBy(
              dataStudent,
              [
                (o) => {
                  switch (sortDirection.id) {
                    case '_id': {
                      return o._id;
                    }
                    case 'name': {
                      return o.name;
                    }
                    case 'phone': {
                      return o.phone
                    }
                    case 'class': {
                      return o.class
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
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n._id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="center">
                      {n._id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="center">
                      {n.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="center">
                      {n.phone}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                      {n.class}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                        <div className="flex items-center">
                          <IconButton onClick={(ev) => { ev.stopPropagation(); dispatch(openEditStudentDialog(n))}} >
                              <Icon className='text-blue-400'>edit</Icon>
                          </IconButton>
                          <IconButton onClick={(ev) => { ev.stopPropagation();  handleDeleteButton(n._id) }} >
                            <Icon className='text-red-400'>delete</Icon>
                          </IconButton>
                        </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 bstudent-t-1"
        component="div"
        count={!isEmpty(dataStudent) ? dataStudent.length : 0 }
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

export default withRouter(StudentsTable);
