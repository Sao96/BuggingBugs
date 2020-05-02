import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dashboard from "../../svg/dashboard.svg"
import AllTickets from "../../svg/alltickets.svg"
import ClosedTickets from "../../svg/closedtickets.svg"
import MyTickets from "../../svg/mytickets.svg"
import NewTicket from "../../svg/newticket.svg"
import OpenTickets from "../../svg/opentickets.svg"
import PendingTickets from "../../svg/pendingtickets.svg"
import Projects from "../../svg/projects.svg"

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer(props) {
  const SizeSVG = (Comp) => { return <Comp style={{width: "45px", height:"45px"}} />}
  const icons = [Dashboard, NewTicket, MyTickets, OpenTickets, ClosedTickets, AllTickets, ClosedTickets, PendingTickets, Projects]
  const classes = useStyles();
  const drawer = (
    <div >
      <div className={classes.toolbar} />
      <List>
        {['Dashboard', 'New Ticket', 'My Tickets', 'Open Tickets', 'Closed Tickets', 'All Tickets', 'Closed Tickets', 'Pending Approval', 'My Projects'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{SizeSVG(icons[index])}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;