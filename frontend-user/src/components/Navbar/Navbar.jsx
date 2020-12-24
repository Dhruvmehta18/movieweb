import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  List,
  ListItemText,
  ListItem,
  SwipeableDrawer,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HideOnScroll from "../HideOnScroll";
import LogoTitle from "../LogoTitle";
import useAuth from "../useAuth";
import StyledTabs from "../StyleTab/StyleTabs";
import StyledTab from "../StyleTab/StyleTab";

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
  appBar:{
    transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  },
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
    backgroundColor: theme.palette.background.paper
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionAll: {
    display: "flex",
  },
  searchContainer: {
    position: "relative",
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

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
  }, [active, elevationAppBar, toogleDrawerState, index, auth.user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    auth.signout(() => {
      handleMenuClose();
      history.replace({ pathname: "/login" });
    });
  };

  const toggleDrawer = (state = false) => {
    updateToogleDrawerState(state);
  };

  const navItemsClicked = (event, index = -1) => {
    updateActiveItems(index);
  };

  const onSearchIconClicked = () => {
    history.push({ pathname: "/search" });
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </Menu>
  );
  const appBarClassName = [classes.appBar];
  if(elevationAppBar !== 0){
    appBarClassName.push(classes.offsetBackground);
  }
  return (
    <div>
      <HideOnScroll>
        <AppBar
          color="transparent"
          ref={props.forwardRef}
          className={appBarClassName.join(" ")}
          elevation={elevationAppBar}
        >
          <Toolbar>
            {auth.user && (
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
            )}
            <LogoTitle />
            {auth.user && (
              <Box
                display="inline-flex"
                flexDirection="row"
                flexGrow={1}
                justifyContent="flex-end"
              >
                <Box className={classes.tabs} component="div">
                  <StyledTabs
                    value={active}
                    onChange={navItemsClicked}
                    indicatorColor="primary"
                  >
                    {items.map((item, index) => {
                      return (
                        <StyledTab
                          key={index}
                          component={RouterLink}
                          to={item.link}
                          exact={item.exact}
                          underline="none"
                          color="textPrimary"
                          value={index}
                          label={<Typography variant="subtitle1" className={classes.tabs} component="span">{item.name}</Typography>}
                        />
                      );
                    })}
                  </StyledTabs>
                </Box>
                
                <div className={classes.sectionAll}>
                  <IconButton className={[classes.searchContainer].join(" ")} onClick={onSearchIconClicked}>
                    <SearchIcon />
                  </IconButton>
                </div>
                <div className={classes.sectionAll}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    {auth.user.photoUrl?<Avatar url={auth.user.photoUrl}/>:<AccountCircle/>}
                  </IconButton>
                </div>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {!auth.user&&<div className={classes.offset}></div>}
      {renderMenu}
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
