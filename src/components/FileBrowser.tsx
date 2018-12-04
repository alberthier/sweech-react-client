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
import { RouteComponentProps } from 'react-router-dom';
import PaperList from './PaperList';
import * as connection from '../connection';
import { Ls } from '../apitypes';
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

interface Props extends RouteComponentProps {
};

class FileBrowser extends React.Component<Props & WithStyles<typeof styles>, State> {
  state: State = {
    data: null
  };

  async componentWillMount() {
    const path = this.props.location.pathname.substr(this.props.match.path.length);
    let data = await connection.get('/api/ls' + path) as Ls;
    this.setState({data: data});
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    const data = this.state.data;
    const classes = this.props.classes;
    let icontype = getFileIcon("blabla");
    if (icontype !== null) {
      React.createElement(icontype);
    }
    return (
      <PaperList>
        {data.content.map((item, index) => {
          let icon = null;
          if (item.isDir) {
            icon = item.isReadable ? FolderIcon : FolderLockIcon;
          } else {
            icon = item.isReadable ? getFileIcon(item.name) : FileLockIcon;
          }
          return (
          <ListItem key={index} button classes={{root: classes.line}} onClick={(e) => this.onClick(e, index)}>
            <Checkbox disableRipple tabIndex={-1} classes={{root: classes.checkbox}}/>
            <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
            <Typography variant='caption' color='textSecondary'>{getPrettySize(item.size)} {getPrettySizeUnit(item.size)}</Typography>
          </ListItem>
        )})}
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