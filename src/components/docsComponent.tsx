import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IDocsState } from '../modules/docs';
import { IDocsActions } from 'src/containers/docsContainer';

type DocsProps = IDocsState & IDocsActions;

export class DocsComponent extends React.Component<DocsProps> {
  public componentDidMount() {
    this.props.fetchDocs();
  }
  public render() {
    return (
      <div className="docs">
        <List>
          {this.props.docs.map((doc, index) => {
            return  (
              <ListItem key={index} button={true} divider={true}>
                <ListItemText primary={doc.title} secondary={doc.author + ' ' + doc.posted_at} />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
    }
};

