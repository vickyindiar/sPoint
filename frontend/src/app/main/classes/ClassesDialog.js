// import { yupResolver } from '@hookform/resolvers/yup';
import { DateTimePicker } from '@material-ui/pickers';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { amber, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
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
// import * as yup from 'yup';
// import { selectLabels } from './store/labelsSlice';
import {
  closeNewClassDialog,
  closeEditClassDialog,
} from '../../store/main/classesSlice';
import { useGetTeachersQuery, useAddClassesMutation, useUpdateClassMutation} from 'app/services/mainService';
import isEmpty from 'app/helpers/isEmpty';

const defaultValues = {
  id: '',
  name: '',
  homeroom_teacher: ''
};


function ClassesDialog(props) {
  const dispatch = useDispatch();
  const classDialog = useSelector((s)  => s.main.classes.classDialog);
  const [name, setName] = useState(defaultValues.name)
  const [errorName, setErrorName] = useState(false)
  const [errorNameMsg, setErrorNameMsg] = useState('')
  const [teacher, setTeacher] = useState(defaultValues.homeroom_teacher)
  const { data: teachers, isLoading, error } = useGetTeachersQuery();
  const [addClasses, {isLoading: isLoadingAddClass }] = useAddClassesMutation();
  const [updateClass, {isLoading: isLoadingUpdateClass}]= useUpdateClassMutation()

   /*
   * On Dialog Open
   */
  useEffect(() => {
    if (classDialog.props.open) {
      if(classDialog.type === 'new'){
        setName('')
        setTeacher('')
      }
      else{
        setName(classDialog.data.name)
        setTeacher(classDialog.data.homeroom_teachers._id)
      }
    }
  }, [classDialog.props.open]);
  
  /**
   * Close Dialog
   */
  function closeClassDialog() {
    return classDialog.type === 'edit'
      ? dispatch(closeEditClassDialog())
      : dispatch(closeNewClassDialog());
  }

  const handleAddClass = () => {
    if(isEmpty(name)){ setErrorName(true); setErrorNameMsg('Name is mandatory !'); return;}
    if(classDialog.type === 'new'){
      addClasses({name, homeroom_teachers:teacher}).unwrap().then(f => {
          closeClassDialog()
      })
    }
    else{
      updateClass({id: classDialog.data._id, name, homeroom_teachers:teacher}).unwrap().then(f => {
        if(f.error) {  if(f.msg.includes('name')){ setErrorName(true); setErrorNameMsg(f.msg)} }
        else { closeClassDialog() }
      })
    }

  }
console.log(teachers)
  return (
    <Dialog {...classDialog.props} onClose={closeClassDialog} fullWidth maxWidth="sm">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {classDialog.type === 'new' ? 'New Class' : 'Edit Class'}
          </Typography>
        </Toolbar>
      </AppBar>
        <DialogContent classes={{ root: 'p-0' }}>
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

            <FormControl variant='outlined' className="mt-12" required fullWidth>
              <InputLabel id="teacher-class-label">Teacher</InputLabel>
              <Select
                labelId="teacher-class-label"
                id="teacher-class"
                value={teacher}
                label="Teacher"
                onChange={(e) => {
                  setTeacher(e.target.value)
                }}
              >
              {
                 teachers && teachers.filter(f => !f.hasOwnProperty('classes')).map((e) => (
                    <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
                ))
              }
              </Select>
          </FormControl>
          </div>
        </DialogContent>

        {classDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button type="submit" variant="contained" color="secondary" onClick={ handleAddClass } >
               {isLoadingAddClass? 'Adding': 'Add' }
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button type="submit" variant="contained" color="secondary"  onClick={ handleAddClass } >
              {isLoadingUpdateClass? 'Saving': (errorName ? errorNameMsg : 'Save' )  }
              </Button>
            </div>
          </DialogActions>
        )}
    </Dialog>
  );
}

export default ClassesDialog;
