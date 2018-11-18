import * as React from 'react';
import { AppBar, Typography, Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';


interface IHeaderProps {
  title?: string;
};

const styles = (theme: Theme) => {
  return createStyles({
    grow: {
      flexGrow: 1
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        }
      }
    }
  });
};

type HeaderProps = IHeaderProps & WithStyles<typeof styles>;

class Header extends React.Component<HeaderProps> {
  public render() {
    return (
      <div className="docs">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap={true} >Piita</Typography>
            <div className={this.props.classes.grow} />
            <div className={this.props.classes.search}>
              <div className={this.props.classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput,
              }}/>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
    }
};

export default withStyles(styles)(Header);