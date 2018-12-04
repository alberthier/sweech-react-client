import * as React from "react";
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

const styles = () => createStyles({
  paper: {
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: '100%',
  }
});

const PaperList: React.FC<WithStyles<typeof styles>> = (props) => {
  return (
    <Paper classes={{ root: props.classes.paper }} elevation={2} square>
      <List>
        { props.children }
      </List>
    </Paper>
  )
}


export default withStyles(styles)(PaperList);