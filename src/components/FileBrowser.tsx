import * as React from "react";
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { RouteComponentProps } from 'react-router-dom';
import PaperList from './PaperList';
import * as connection from '../connection';
import { Ls } from '../apitypes';

const styles = createStyles({
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
    console.log(this.props);
    let data = await connection.get('/api/ls' + path) as Ls;
    this.setState({data: data});
  }

  render() {
    if (this.state.data === null) {
      return null;
    }
    const data = this.state.data;
    return (
      <PaperList>
        {data.content.map((item, index) =>
          <ListItem button key={index}>
            <Checkbox disableRipple tabIndex={-1}/>
            <ListItemIcon><FolderIcon/></ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </ListItem>
        )}
      </PaperList>
    )
  }
}

export default withStyles(styles)(FileBrowser);