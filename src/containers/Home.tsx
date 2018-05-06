import { connect } from 'react-redux';

import Home from '../components/Home';
import { IReducers } from '../reducers/reducers';

function mapStateToProps(state: IReducers) {
  return state.home;
}

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
