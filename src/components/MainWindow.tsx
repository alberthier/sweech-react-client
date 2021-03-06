import * as React from "react";
import { MuiThemeProvider, createMuiTheme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { green, lightBlue } from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { INotifier } from '../INotifier';
import StorageList from './StorageList';
import FileBrowser from './FileBrowser';
import * as connection from '../connection';
import i18n from '../i18n';
import { Info } from '../apitypes';

const appTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
  },
  typography: {
    useNextVariants: true,
  },
});

const drawerWidth = 300;

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  appBar: {
    color: 'white',
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  progress: {
    position: 'absolute',
    top: '28px',
    marginLeft: '50%',
    left: '-24px',
    borderRadius:'50%',
    width: '52px',
    height: '52px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('sm')]: {
      top: '36px',
    }
  },
  scroller: {
    overflow: 'auto',
    flex: '1',
  }
});

type State = {
    mobileOpen: boolean,
    showSnackBar: boolean,
    snackBarMessage: string,
    showLoading: boolean,
    info: Info|null;
};

interface Props extends WithStyles<typeof styles, true> {
}

class MainWindow extends React.Component<Props, State> implements INotifier {
  state: State = {
    mobileOpen: false,
    showSnackBar: false,
    snackBarMessage: '',
    showLoading: false,
    info: null,
  };

  constructor(props: Props) {
    super(props);
    connection.init(this);
  }

  async componentDidMount() {
    let info = await connection.get('/api/info') as Info;
    this.setState({ info: info })
  }

  showLoadingIndicator() {
    this.setState({ showLoading: true });
  }

  hideLoadingIndicator() {
    this.setState({ showLoading: false });
  }

  snack(message: string) {
    this.setState({ showSnackBar: true, snackBarMessage: message });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <Toolbar><Typography variant="h6" color="textSecondary" noWrap>RefTel</Typography></Toolbar>
        <Divider />
        <List>
          {[i18n.fileBrowser, i18n.images, i18n.videos, i18n.music, i18n.documents, i18n.clipboard].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <MoveToInboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    let routing = null;
    if (this.state.info !== null) {
      const info: Info = this.state.info;
      routing = (
        <BrowserRouter>
          <div className={classes.scroller}>
            <Switch>
              <Route path="/storage" exact render={(props: RouteComponentProps) => <StorageList {...props} info={info}/> } />
              <Route path="/fs" render={(props: RouteComponentProps) => <FileBrowser {...props} info={info}/>} />
              <Route><Redirect to='/storage'></Redirect></Route>
            </Switch>
          </div>
        </BrowserRouter>
      )
    }

    return (
      <MuiThemeProvider theme={appTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown>
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
          <AppBar position='relative' className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Sweech
              </Typography>
            </Toolbar>
            {
              this.state.showLoading &&
                <Paper className={classes.progress}>
                  <CircularProgress/>
                </Paper>
            }
          </AppBar>
          {routing}
          </main>
          <Snackbar message={this.state.snackBarMessage}
                    open={this.state.showSnackBar}
                    onClose={() => this.setState({ showSnackBar: false, snackBarMessage: ''}) }
                    autoHideDuration={ 5000 }
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainWindow);