import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SubjectIcon from "@material-ui/icons/Subject";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";

const drawerWidth = 240;

const listItem = [
  {
    title: "My Notes",
    link: "/",
    icon: <SubjectIcon color="secondary" />,
  },
  {
    title: "Add a New Note",
    link: "/create",
    icon: <AddCircleOutlineIcon color="secondary" />,
  },
];

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    title: {
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      backgroundColor: "#f4f4f4",
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Fathin</Typography>
          <Avatar className={classes.avatar}>F</Avatar>
        </Toolbar>
      </AppBar>

      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          // Biar width dari drawernya ke apply
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.title}>
          <Typography variant="h5">MyNotes</Typography>
        </div>
        {/* List  item*/}
        <List>
          {listItem.map((item) => {
            return (
              <ListItem
                key={item.title}
                button
                className={
                  location.pathname == item.link ? classes.active : null
                }
                onClick={() => history.push(item.link)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
