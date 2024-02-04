import { Box, Chip, makeStyles, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { useCallback } from "react";
import { connectRefinementList } from "react-instantsearch-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    listStyle: "none",
    overflow: "auto",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
}));
const GenreRefinementList = ({ items, refine }) => {
  const classes = useStyles();
  const onChipItemClicked = useCallback(
    (itemValue) => {
      refine(itemValue);
    },
    [refine]
  );
  return (
    <Box component="ul" className={classes.root}>
      {items.map((item) => {
        const labelComponent = (
          <Box component="span">
            <Typography component="span" variant="body2">{item.label}</Typography>
            <Typography component="span" variant="caption">{`  ${item.count}`}</Typography>
          </Box>
        );
        return (
          <li key={item.label}>
            <Chip
              variant="outlined"
              label={labelComponent}
              color="primary"
              deleteIcon={item.isRefined ? <DoneIcon /> : null}
              onDelete={
                item.isRefined ? () => onChipItemClicked(item.value) : null
              }
              className={classes.chip}
              onClick={() => onChipItemClicked(item.value)}
            />
          </li>
        );
      })}
    </Box>
  );
};

export default connectRefinementList(GenreRefinementList);
