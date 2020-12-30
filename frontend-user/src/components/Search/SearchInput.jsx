import React, {useCallback, useEffect, useRef} from "react";
import {Box, fade, IconButton, InputBase, makeStyles, Tooltip,} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {connectSearchBox} from "react-instantsearch-dom";
import {useHistory} from "react-router-dom";
import useQuery from "../../hooks/useQuery";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "inherit",
    padding: theme.spacing(1),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "inherit",
    fontSize: theme.typography.pxToRem(24),
  },
}));
const SearchInput = connectSearchBox(({ currentRefinement, refine }) => {
  const classes = useStyles();
  const searchInputRef = useRef(null);
  const history = useHistory();
  const queryHooks = useQuery();
  const queryString = queryHooks.get("q");

  const onBackButtonClick = useCallback(() => {
    history.goBack();
  }, [history]);

  const onClearButtonClicked = useCallback(() => {
    searchInputRef.current.value = "";
    searchInputRef.current.focus();
    refine(searchInputRef.current.value);
  }, [refine]);

  const onSearchButtonClicked = useCallback(() => {
    history.push({
      pathname: "/search",
      search: `?q=${currentRefinement}`,
    });
  }, [currentRefinement, history]);

  const onSearchInputChange = useCallback(
    (e) => {
      refine(e.target.value);
    },
    [refine]
  );

  useEffect(() => {
    if (searchInputRef) {
      searchInputRef.current.focus();
      searchInputRef.current.value = queryString;
      refine(queryString);
    }
  }, [queryString, refine]);

  return (
    <Box className={[classes.search].join(" ")}>
      <Tooltip title="Back">
        <IconButton aria-label="back" onClick={onBackButtonClick}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Box flex={1} width="100%">
        <InputBase
          placeholder="Search Movies…"
          value={currentRefinement}
          onChange={onSearchInputChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          ref={searchInputRef}
        />
      </Box>
      <Tooltip title="Search">
        <IconButton aria-label="search movies" onClick={onSearchButtonClicked}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear">
        <IconButton
          aria-label="clear search field"
          onClick={onClearButtonClicked}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
});

export default SearchInput;
