import * as React from "react";
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FolderLockIcon from 'mdi-material-ui/FolderLock';
import FileLockIcon from 'mdi-material-ui/FileLock';
import { grey } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import { Link, RouteComponentProps } from 'react-router-dom';
import PaperList from './PaperList';
import * as connection from '../connection';
import { Ls, Info } from '../apitypes';
import { getFileIcon, getPrettySize, getPrettySizeUnit } from '../tools';

const styles = createStyles({
  line: {
    paddingLeft: 0,
  },
  checkbox: {
    color: grey[300]
  }
});

type State = {
  data: Ls|null,
};

interface Props extends RouteComponentProps, WithStyles<typeof styles> {
  info: Info
};

class FileBrowser extends React.PureComponent<Props, State> {
  state: State = {
    data: null
  };

  async componentDidMount() {
    await this.fetch();
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    const path = this.getPath(this.props);
    const prevPath = this.getPath(prevProps);
    if (path !== prevPath) {
      await this.fetch();
    }
  }

  private getPath(props: Props) {
    const path = props.location.pathname.substr(this.props.match.path.length);
    return path === '/' ? '' : path;
  }

  private async fetch() {
    const path = this.getPath(this.props);
    this.setState({ data: await connection.get('/api/ls' + path) as Ls });
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    const data = this.state.data;
    const classes = this.props.classes;
    return (
      <PaperList>
        {data.content.map((item, index) => {
          let icon = null;
          if (item.isDir) {
            icon = item.isReadable ? FolderIcon : FolderLockIcon;
          } else {
            icon = item.isReadable ? getFileIcon(item.name) : FileLockIcon;
          }
          const path = this.getPath(this.props);

          let ui = (
            <ListItem key={index} button classes={{root: classes.line}} onClick={(e) => this.onClick(e, index)}>
              <Checkbox disableRipple tabIndex={-1} classes={{root: classes.checkbox}}/>
              <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
              <Typography variant='caption' color='textSecondary'>{getPrettySize(item.size)} {getPrettySizeUnit(item.size)}</Typography>
            </ListItem>
          );
          if (item.isDir && item.isReadable) {
            ui = (
              <Link key={index} style={{ textDecoration: 'none' }} to={`/fs${path}/${item.name}`}>
                {ui}
              </Link>
            );
          }
          return ui;
         })}
      </PaperList>
    )
  }
  onClick(event: React.SyntheticEvent, index: number) {
    if (this.state.data) {
      console.log(this.state.data.content[index]);
    }
  }
}

export default withStyles(styles)(FileBrowser);