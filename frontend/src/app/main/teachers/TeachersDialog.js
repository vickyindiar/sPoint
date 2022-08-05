// import { yupResolver } from '@hookform/resolvers/yup';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeNewTeacherDialog,
  closeEditTeacherDialog,
} from '../../store/main/teachersSlice';
import { useGetClassesQuery, useAddTeachersMutation, useUpdateTeacherMutation } from 'app/services/mainService';
import isEmpty from 'app/helpers/isEmpty';

const defaultValues = {
  id: '',
  name: '',
  phone: '',
  classId: ''
};


function TeachersDialog(props) {
  const dispatch = useDispatch();
  const teacherDialog = useSelector((s)  => s.main.teachers.teacherDialog);
  const [errorName, setErrorName] = useState(false)
  const [errorNameMsg, setErrorNameMsg] = useState('')
  const [name, setName] = useState(defaultValues.name)
  const [phone, setPhone] = useState(defaultValues.phone)
  const [classId, setClassId] = useState(defaultValues.classId)
  const { data: classes, isLoading, error } = useGetClassesQuery()
  const [addTeachers, {isLoading: isLoadingAddTeacher }] = useAddTeachersMutation()
  const [updateTeacher, {isLoading: isLoadingUpdateTeacher}]= useUpdateTeacherMutation()

   /*
   * On Dialog Open
   */
  useEffect(() => {
    if (teacherDialog.props.open) {
      if(teacherDialog.type === 'new'){
        setName('')
        setPhone('')
        setClassId('')
      }
      else{
        debugger
        setName(teacherDialog.data.name)
        setPhone(teacherDialog.data.phone)
        setClassId(teacherDialog.data.classes? teacherDialog.data.classes._id:null)
      }
    }
  }, [teacherDialog.props.open]);
  
  /**
   * Close Dialog
   */
  function closeTeacherDialog() {
    return teacherDialog.type === 'edit'
      ? dispatch(closeEditTeacherDialog())
      : dispatch(closeNewTeacherDialog());
  }

  const handleAddTeacher = () => {
    if(isEmpty(name)){ setErrorName(true); setErrorNameMsg('Name is mandatory !'); return;}
    if(teacherDialog.type === 'new'){
      addTeachers({name, phone, classId:classId}).unwrap().then(f => {
          closeTeacherDialog()
      })
    }
    else{
      updateTeacher({id: teacherDialog.data._id, name, phone, classId:classId}).unwrap().then(f => {
        if(f.error) {  if(f.msg.includes('name')){ setErrorName(true); setErrorNameMsg(f.msg)} }
        else { closeTeacherDialog() }
      })
    }

  }

  return (
    <Dialog {...teacherDialog.props} onClose={closeTeacherDialog} fullWidth maxWidth="sm">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {teacherDialog.type === 'new' ? 'New Teacher' : 'Edit Teacher'}
          </Typography>
        </Toolbar>
      </AppBar>
        <DialogContent teachers={{ root: 'p-0' }}>
          <div className="flex flex-col py-24 px-24 sm:px-24 ">
            <FormControl className="mt-12" required fullWidth>
                  <TextField
                    label="Name"
                    autoFocus
                    value={name}
                    onChange = { 
                      (e) => {
                        if(errorName){ setErrorName(false); setErrorNameMsg(''); }
                        setName(e.target.value)
                      } 
                    }
                    required
                    error={errorName}
                    variant="outlined"
                  />
            </FormControl>
            <FormControl className="mt-12" required fullWidth>
                  <TextField
                    label="Phone"
                    value={phone}
                    onChange = { 
                      (e) => {
                        setPhone(e.target.value)
                      } 
                    }
                    variant="outlined"
                  />
            </FormControl>

            <FormControl variant='outlined' className="mt-12" required fullWidth>
              <InputLabel id="classId-class-label">Class</InputLabel>
              <Select
                labelId="classId-class-label"
                id="classId-class"
                value={classId}
                label="Class"
                onChange={(e) => {
                  setClassId(e.target.value)
                }}
              >
                    <MenuItem key={'nullitem_value'} value={null}>{ }</MenuItem>
              {
                 classes && classes.map((e) => (
                    <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
                ))
              }
              </Select>
          </FormControl>
          </div>
        </DialogContent>

        {teacherDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button type="submit" variant="contained" color="secondary" onClick={ handleAddTeacher } >
               {isLoadingAddTeacher? 'Adding': 'Add' }
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button type="submit" variant="contained" color="secondary"  onClick={ handleAddTeacher } >
              {isLoadingUpdateTeacher? 'Saving': (errorName ? errorNameMsg : 'Save' )  }
              </Button>
            </div>
          </DialogActions>
        )}
    </Dialog>
  );
}

export default TeachersDialog;
