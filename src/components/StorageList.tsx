import * as React from "react";
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaperList from './PaperList';
import { Info } from "../apitypes";

const styles = () => createStyles({
});

type Props = {
  info: Info
}

const StorageList: React.FC<Props & WithStyles<typeof styles>> = (props) => {
  const dirs = props.info.directories;
  const keys = Object.keys(dirs)
  return (
    <PaperList>
      {
        keys.map((key, index) =>
            <ListItem button key={index}>
              <ListItemText>{key} {dirs[key].path}</ListItemText>
            </ListItem>
        )
      }
    </PaperList>
  )
}

export default withStyles(styles)(StorageList);