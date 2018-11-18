import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IDocsState } from '../modules/docs';
import { IDocsDispatchProps } from 'src/containers/docsContainer';
import Header from './header';
import { Link } from 'react-router-dom';

type DocsProps = IDocsState & IDocsDispatchProps;

export class DocsComponent extends React.Component<DocsProps> {
  public componentDidMount() {
    this.props.fetchDocs();
  }
  public render() {
    return (
      <div className="docs">
        <Header/>
        <List>
          {this.props.docs.map((doc, index) => {
            return  (
              <ListItem key={index} button={true} divider={true}>
                <ListItemText primary={<Link to={"/docs/"+doc.uuid}>doc.title</Link>} secondary={doc.author + ' ' + doc.posted_at} />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
    }
};

