import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "../../svg/dashboard.svg";
import OpenTicketsIcon from "../../svg/opentickets.svg";
import PendingTicketsIcon from "../../svg/pendingtickets.svg";
import ClosedTicketsIcon from "../../svg/closedtickets.svg";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const navColor = "rgb(0, 196, 46)";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: navColor,
    color: "rgb(237, 237, 237)",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: navColor,
    color: "white",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MiniDrawer() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawer = () => {
    console.log("risitas-duran", open);
    open ? handleDrawerClose() : handleDrawerOpen();
  };

  const SizeSVG = (Comp) => {
    return <Comp style={{ width: "45px", height: "45px", fill: "black" }} />;
  };

  const Icons = {
    ["Dashboard"]: DashboardIcon,
    ["Open Tickets"]: OpenTicketsIcon,
    ["Pending Approval"]: PendingTicketsIcon,
    ["Closed Tickets"]: ClosedTicketsIcon,
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        PaperProps={{ backgroundColor: "red" }}
        style={{ backgroundColor: "rgb(0,0,0,0)" }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawer}>
            {!open ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            "Dashboard",
            "Open Tickets",
            "Pending Approval",
            "Closed Tickets",
          ].map((name) => (
            <ListItem button key={name} style={{ marginBottom: "20px" }}>
              <ListItemIcon>{SizeSVG(Icons[name])}</ListItemIcon>
              <ListItemText style={{ fontSize: "30px" }} primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default MiniDrawer;
