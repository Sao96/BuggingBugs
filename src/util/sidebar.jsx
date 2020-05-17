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
import DashboardIcon from "svg/dashboard.svg";
import OpenTicketsIcon from "svg/opentickets.svg";
import PendingTicketsIcon from "svg/pendingtickets.svg";
import ClosedTicketsIcon from "svg/closedtickets.svg";

const drawerStyles = {
    width: 300,
    color: "rgb(73, 99, 114)",
    marginRight: "50px",
    boxShadow: "12px 10px 23px -6px rgba(0,0,0,0.75)",
};
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
        width: drawerStyles.width,
        flexShrink: 0,
        whiteSpace: "wrap",
    },
    drawerOpen: {
        width: drawerStyles.width,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: drawerStyles.color,
        color: "white",
        marginRight: drawerStyles.marginRight,
        boxShadow: drawerStyles.boxShadow,
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(5) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
        backgroundColor: drawerStyles.color,
        color: "white",
        marginRight: drawerStyles.marginRight,
        boxShadow: drawerStyles.boxShadow,
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
        open ? handleDrawerClose() : handleDrawerOpen();
    };

    const SizeSVG = (Comp) => {
        return (
            <Comp style={{ width: "45px", height: "45px", fill: "white" }} />
        );
    };

    const Icons = {
        ["Dashboard"]: DashboardIcon,
        ["Open"]: OpenTicketsIcon,
        ["Pending"]: PendingTicketsIcon,
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
                style={{
                    backgroundColor: "rgb(0,0,0,0)",
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawer}>
                        {!open ? (
                            <MenuIcon style={{ color: "white" }} />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {["Dashboard", "Open", "Pending"].map((name) => (
                        <ListItem
                            button
                            key={name}
                            style={{ marginBottom: "40px" }}
                        >
                            <ListItemIcon>{SizeSVG(Icons[name])}</ListItemIcon>
                            <ListItemText
                                style={{
                                    fontSize: "30px",
                                    paddingLeft: "10px",
                                }}
                                primary={name}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default MiniDrawer;
