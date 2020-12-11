import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  makeStyles,
  Tabs,
  Tab,
  List,
  ListItemText,
  ListItem,
  SwipeableDrawer,
  Box,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HideOnScroll from "../HideOnScroll";
import LogoTitle from "../LogoTitle";
import useAuth from "../useAuth";

const items = [
  {
    link: "/",
    name: "Home",
    exact: "true",
  },
  {
    link: "/recently-added",
    name: "Recently Added",
  },
  {
    link: "/my-list",
    name: "My List",
  },
];
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  tabs: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "initial",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  navItems: {
    display: "inline-flex",
  },
  navItem: {
    padding: "8px 12px",
  },
  navLink: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
    "&:active": {
      color: theme.palette.primary.main,
    },
  },
  active: {
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
  offset: theme.mixins.toolbar,
  offsetBackground: {
    background: theme.palette.background.default,
  },
}));
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
const anchor = "left";

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const index = items.findIndex((value) => value.link === location.pathname);
  const [active, updateActiveItems] = useState(index === -1 ? 0 : index);
  const [elevationAppBar, updateElevationAppbar] = useState(0);
  const [toogleDrawerState, updateToogleDrawerState] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset === 0) {
        updateElevationAppbar(0);
      } else {
        updateElevationAppbar(4);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [active, elevationAppBar, toogleDrawerState, index]);

  const signOut = () => {
    auth.signout(() => {
      history.replace({ pathname: "/login" });
    });
  };

  const toggleDrawer = (state = false) => {
    updateToogleDrawerState(state);
  };

  const navItemsClicked = (event, index = -1) => {
    updateActiveItems(index);
  };

  return (
    <div>
      <HideOnScroll>
        <AppBar
          color="transparent"
          ref={props.forwardRef}
          className={classes.offsetBackground}
          elevation={elevationAppBar}
        >
          <Toolbar>
            <React.Fragment key={anchor}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                className={classes.drawer}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor={anchor}
                open={toogleDrawerState}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                PaperProps={{
                  className: classes.drawer,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <Box paddingX={2} paddingBottom={1} paddingTop={2}>
                  <LogoTitle />
                </Box>
                <List>
                  {items.map((item) => (
                    <ListItemLink
                      key={item.name}
                      to={item.link}
                      primary={item.name}
                    />
                  ))}
                </List>
              </SwipeableDrawer>
            </React.Fragment>
            <LogoTitle />
            <Typography variant="h6" className={classes.tabs}>
              <Tabs
                value={active}
                onChange={navItemsClicked}
                indicatorColor="primary"
              >
                {items.map((item, index) => {
                  return (
                    <Tab
                      key={index}
                      component={RouterLink}
                      to={item.link}
                      exact={item.exact}
                      underline="none"
                      color="textPrimary"
                      value={index}
                      label={item.name}
                    />
                  );
                })}
              </Tabs>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset}>x</div>
    </div>
  );
};

function ListItemLink(props) {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} alignItems="center">
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default Navbar;
