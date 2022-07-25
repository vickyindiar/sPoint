import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import ClassesHeader from './ClassesHeader';
import ClassesTable from './ClassesTable';

function Classes() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<ClassesHeader />}
      content={<ClassesTable />}
      innerScroll
    />
  );
}

export default withReducer('Classes', reducer)(Classes);
