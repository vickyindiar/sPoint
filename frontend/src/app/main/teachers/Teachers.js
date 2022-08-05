import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import TeachersHeader from './TeachersHeader';
import TeachersTable from './TeachersTable';
import TeacherDialog from './TeachersDialog';

function Teachers() {
  return (
    <>
    <FusePageCarded
      teachers={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<TeachersHeader />}
      content={<TeachersTable />}
      innerScroll
      />
        <TeacherDialog />
    </>
  );
}

export default withReducer('Teachers', reducer)(Teachers);
