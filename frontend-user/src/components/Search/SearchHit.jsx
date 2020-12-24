import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import React, { memo, useMemo } from "react";
import ImdbLogo from "../../img/imdb_logo.svg";
import DynamicImage from "../DynamicImage/DynamicImage";

const useStyles = makeStyles(() => ({
  image: {
    width: 110,
    height: 120,
    overflow: "hidden",
  },
  imdbLogo: {
    width: "32px",
    height: "auto",
  },
}));

const SearchHit = (props) => {
  const { hit, dark } = props;
  const classes = useStyles();
  const durationString = useMemo(() => {
    const duration = hit.duration;
    if (duration === 0) {
      return ``;
    }
    const hour = parseInt(duration / 60);
    const minutes = duration % 60;
    const hourString = `${hour} hour`;
    const minutesString = `${minutes} minutes`;
    if (hour === 0) {
      return minutesString;
    } else if (minutes === 0) {
      return hourString;
    } else {
      return `${hourString} ${minutesString}`;
    }
  }, [hit.duration]);
  const src = `https://storage.googleapis.com/movieweb-ec15f.appspot.com/${hit.image_path}/small.jpg`;
  const linkTo = `/movie/${hit.objectID}`;
  return (
        <ButtonBase component={Box} padding={2} width="inherit">
          <Grid item>
            <Box className={classes.image}>
              <DynamicImage
                alt={hit.title}
                dataSrc={src}
                fallbackImageUrl={src}
                isFallbackBlur
                dark={dark}
                draggable="false"
                width={80}
                height={120}
              />
            </Box>
          </Grid>
          <Grid item xs sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {hit.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Genre: {hit.genre.join(" • ")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {hit.year} • {durationString}
                </Typography>
                <Box display="inline-flex" alignItems="center">
                  <Box paddingRight={1}>
                    <img
                      src={ImdbLogo}
                      alt="imdb"
                      className={classes.imdbLogo}
                      draggable={false}
                    />
                  </Box>
                  <Typography variant="subtitle1">{hit.rating}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
    </ButtonBase>
  );
};

export default memo(SearchHit);
