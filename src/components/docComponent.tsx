import * as React from 'react';
import { IDocState, IDocDispatchProps } from '../modules/doc';
import { RouteComponentProps } from 'react-router'
import Header from './header';

type DocsProps = IDocState & IDocDispatchProps & RouteComponentProps<any>;

export default class DocComponent extends React.Component<DocsProps> {
  public componentDidMount() {
    this.props.fetchDoc(this.props.match.params.uuid);
  }
  public render() {
    return (
      <div className="docs">
        <Header/>
        <div>{this.props.uuid}</div>
        <div>{this.props.doc && this.props.doc.title}</div>
        <div>{this.props.doc && this.props.doc.body}</div>
      </div>
    );
    }
};

