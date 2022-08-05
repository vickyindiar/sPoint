import React from 'react'
import FusePageCarded from '@fuse/core/FusePageCarded';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import ClassesDetailHeader from './ClassesDetailHeader';
import ClassesStudentsTable from './ClassesStudentsTable';

const ClassesDetail = () => {
  return (
    <>
    <FusePageCarded
      classes={{ content: 'flex', contentCard: 'overflow-hidden', header: 'min-h-72 h-72 sm:h-136 sm:min-h-136', }}
     
      header={ <ClassesDetailHeader /> }
      // content={<ClassesStudentsTable />}
      innerScroll
      />
        {/* <ClassDialog /> */}
    </>
  )
}

export default ClassesDetail