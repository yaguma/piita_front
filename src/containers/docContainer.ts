import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { actions } from '../modules/doc';
import DocComponent from '../components/docComponent';

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    fetchDoc:(uuid:string)=>dispatch(actions.fetchDoc.started(uuid))
  };
}

function mapStateToProps(appState: any) {
  return Object.assign({}, appState.doc);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocComponent);
