import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { actions } from '../modules/docs';
import {DocsComponent} from '../components/docsComponent';


export interface IDocsDispatchProps {
  fetchDocs: () => Action<string>;
  selectDoc: (v: string) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    fetchDocs:()=>dispatch(actions.fetchDocs.started({})),
    selectDoc: (uuid: string) => dispatch(actions.selectDoc(uuid))
  };
}

function mapStateToProps(appState: any) {
  return Object.assign({}, appState.docs);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocsComponent);
