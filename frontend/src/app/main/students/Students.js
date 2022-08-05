import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import StudentsHeader from './StudentsHeader';
import StudentsTable from './StudentsTable';
import StudentDialog from './StudentsDialog';

function Students() {
  return (
    <>
    <FusePageCarded
      students={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<StudentsHeader />}
      content={<StudentsTable />}
      innerScroll
      />
        <StudentDialog />
    </>
  );
}

export default withReducer('Students', reducer)(Students);
