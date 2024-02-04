import React, {useEffect, useMemo, useState} from "react";
import {Link as RouterLink, useHistory, useLocation} from "react-router-dom";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Box, Menu, MenuItem, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HideOnScroll from "../HideOnScroll";
import LogoTitle from "../LogoTitle";
import useAuth from "../../hooks/useAuth";
import StyledTabs from "../StyleTab/StyleTabs";
import StyledTab from "../StyleTab/StyleTab";
import AccountImage from "./AccountImage";
import Drawer from "./Drawer";

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
const useStyles = makeStyles((theme) => ({
  appBar:{
    transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  },
  tabs: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline-flex",
      alignItems: "center"
    },
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
  centerItems: {
    alignItems: "center"
  }
}));
const anchor = "left";

const NavBar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  const index = items.findIndex((value) => value.link === location.pathname);
  const [active, updateActiveItems] = useState(index === -1 ? 0 : index);
  const [elevationAppBar, updateElevationAppBar] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset === 0) {
        updateElevationAppBar(0);
      } else {
        updateElevationAppBar(4);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [active, elevationAppBar, index, auth.user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    auth.signOut(() => {
      handleMenuClose();
      history.replace({pathname: "/login"});
    });
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
  if (elevationAppBar !== 0) {
    appBarClassName.push(classes.offsetBackground);
  }

  const accountTitle = useMemo(() => {
    let title = "";
    if (auth.user) {
      const name = auth.user.displayName
      const email = auth.user.email;
      if (name) {
        title = title.concat(name, "\n");
      }
      if (email) {
        title = title.concat(email);
      }
    }
    return `${title}`
  }, [auth.user])
  return (
      <Box>
        <HideOnScroll>
          <AppBar
              color="transparent"
              ref={props.forwardRef}
              className={appBarClassName.join(" ")}
              elevation={elevationAppBar}
          >
            <Toolbar>
              {auth.user && (
                  <Drawer items={items} anchor={anchor} drawerWidth={240}/>
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
                            label={<Typography variant="subtitle1" className={classes.tabs}
                                               component="span">{item.name}</Typography>}
                        />
                      );
                    })}
                  </StyledTabs>
                </Box>

                <Box className={[classes.sectionAll, classes.centerItems].join(" ")}>

                  <Tooltip title="search" aria-label="open search">
                    <IconButton className={[classes.searchContainer].join(" ")} onClick={onSearchIconClicked}>
                      <SearchIcon/>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box className={classes.sectionAll}>
                  <Tooltip title={accountTitle} aria-label={accountTitle}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                      <AccountImage photoURL={auth.user.photoURL} displayName={auth.user.displayName}
                                    email={auth.user.email}/>
                    </IconButton>
                  </Tooltip>

                </Box>
              </Box>
            )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {!auth.user && <Box className={classes.offset}></Box>}
        {renderMenu}
      </Box>
  );
};

export default NavBar;
