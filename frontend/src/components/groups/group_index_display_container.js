import { connect } from 'react-redux';
import GroupIndexDisplay from './group_index_display';
import { fetchAct, deleteActs } from '../../actions/act_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAct: (actId) => dispatch(fetchAct(actId)),
    deleteActs: () => dispatch(deleteActs())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GroupIndexDisplay);