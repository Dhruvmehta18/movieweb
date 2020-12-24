import { Collapse, Grid, makeStyles } from "@material-ui/core";
import React, { memo } from "react";
import { connectHits } from "react-instantsearch-dom";
import { TransitionGroup } from "react-transition-group";

const useStyles = makeStyles(()=>({
  wrapperCust: {
    width: '100%'
  }
}))

const SearchHits = connectHits(
  memo((props) => {
    const { hits, hitComponent: HitComponent, dark } = props;
    const classes = useStyles();
    return (
      <TransitionGroup component={Grid} container spacing={2}>
          {hits.map((hit) => {
            return (
              <Collapse key={hit.objectID} component={Grid} item container xs={12} sm={12} md={6} lg={4} xl={3} spacing={2} classes={{wrapper: classes.wrapperCust}}>
                <HitComponent hit={hit} dark={dark} />
              </Collapse>
            );
          })}
      </TransitionGroup>
    );
  })
);

export default memo(SearchHits);
