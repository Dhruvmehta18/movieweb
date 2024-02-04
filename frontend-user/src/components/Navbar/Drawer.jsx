import {Box, List, SwipeableDrawer} from "@material-ui/core";
import LogoTitle from "../LogoTitle";
import ListItemLink from "./ListItemLink";
import React, {memo, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    drawer: ({drawerWidth}) => ({
        width: drawerWidth,
        flexShrink: 0,
    }),
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

const Drawer = memo(({items = [], anchor, drawerWidth}) => {
    const classes = useStyles({drawerWidth: drawerWidth});
    const [toggleDrawerState, updateToggleDrawerState] = useState(false);
    const iOS = process["browser"] && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const toggleDrawer = (state = false) => {
        updateToggleDrawerState(state);
    };
    return (
        <React.Fragment key={anchor}>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => toggleDrawer(true)}
            >
                <MenuIcon/>
            </IconButton>
            <SwipeableDrawer
                className={classes.drawer}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor={anchor}
                open={toggleDrawerState}
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
                    <LogoTitle/>
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
    )
});

export default Drawer;
