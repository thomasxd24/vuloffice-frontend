import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Rapport from "./Rapport";
import Expedition from "./Expedition";
import Recherche from "./Recherche";
import Statistic from "./Statistic";
import Dashboard from "./Dashboard";
import Avatar from "@material-ui/core/Avatar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { withRouter } from "react-router";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalShipping from "@material-ui/icons/LocalShipping";
import Description from "@material-ui/icons/Description";
import Search from "@material-ui/icons/Search";
import ShowChart from "@material-ui/icons/ShowChart";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  },
  fill: {},
  toolbar: theme.mixins.toolbar
});

function Header({ classes }) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.grow}
          noWrap
        >
          Vulcaderm
        </Typography>
        <Avatar className={classes.avatar}>H</Avatar>
      </Toolbar>
    </AppBar>
  );
}

function SideBar({ classes }) {
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {[
          { name: "Tableau de bord", link: "/" ,icon: (<DashboardIcon />)},
          { name: "Expédition", link: "/expedition" ,icon:(<LocalShipping />) },
          { name: "Rapport", link: "/rapports" ,icon:(<Description />)},
          { name: "Recherche", link: "/search" ,icon:(<Search />) },
          { name: "Statistique", link: "/statistic" ,icon:(<ShowChart />)}
        ].map((item, index) => (
          <ListItem button key={item.name} component={Link} to={item.link}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

function Container({ classes,location }) {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={{ enter: 300, exit: 300 }}>
          <Switch location={location}>
            <Route exact path="/" exact component={Dashboard} />
            <Route exact path="/rapports/" component={Rapport} />
            <Route exact path="/expedition/" component={Expedition} />
            <Route exact path="/search/" component={Recherche} />
            <Route exact path="/statistic/" component={Statistic} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </main>
    
  );
}

class Mainpage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div className={classes.root}>
              <CssBaseline />
              <Header {...this.props} />
              <SideBar {...this.props} />
              <Container {...this.props} location={location} />
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(Mainpage);
