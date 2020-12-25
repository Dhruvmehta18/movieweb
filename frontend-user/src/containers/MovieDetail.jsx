import {
  Box,
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import ReadMoreReact from "read-more-react";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import "./MovieDetail.css";
import ImdbLogo from "../img/imdb_logo.svg";
import { CAROUSEL_ITEM_VARIANT, LOADED } from "../constants/constants";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
const useStyles = makeStyles((theme) => ({
  movieCardImage: {
    borderRadius: theme.shape.borderRadius,
  },
  captionMargin: {
    paddingTop: theme.mixins.toolbar.minHeight,
    [`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
      paddingTop: 48,
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: 64,
    },
  },
  mwSection: {
    background: theme.palette.background.default,
    maxWidth: 1600,
    margin: "0 auto",
    position: "relative",
    lineHeight: "1.4",
    overflow: "hidden",
  },
  sectionHeroContainer: {
    margin: "0 auto",
  },
  imdbLogo: {
    width: "32px",
    height: "auto",
  },
  readMore: {
    cursor: "pointer",
  },
  actionButton: {
    marginRight: theme.spacing(2),
    textTransform: "none",
  },
  coverShowImage: {
    maxWidth: "200px",
  },
  coverShowImageContainer: {
    overflow: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperTrailer: {
    boxShadow: theme.shadows[5],
    outline: 0
  },
}));

function mapStateToProps(state) {
  return {};
}

const ReadMoreText = () => {
  const classes = useStyles();
  return (
    <Typography
      variant="subtitle2"
      component="span"
      color="secondary"
      className={classes.readMore}
      gutterBottom
    >
      Read More
    </Typography>
  );
};

const MovieDetail = () => {
  const [currentTrailerId, setCurrentTrailerId] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (trailer_id) => {
    setCurrentTrailerId(trailer_id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentTrailerId(null);
    setOpen(false);
  };
  const classes = useStyles();

  var style = getComputedStyle(document.body);

  const movieCardBaseWidth = parseInt(
    style.getPropertyValue("--trailer-card-width")
  );

  const movieCardBaseHeight = parseInt(
    style.getPropertyValue("--trailer-card-height")
  );

  const movieCardMarginEnd = parseInt(
    style.getPropertyValue("--trailer-card-margin-end")
  );

  const getTrailerCardId = useCallback((value) => {
    return value;
  }, []);

  const onTrailerItemClick = useCallback((trailer_id) => {
    handleOpen(trailer_id);
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const trailerCarouselData = {
    requestState: LOADED,
    data: [
      {
        title: "Trailers",
        list: ["X-x7eZOdBFM", "kGM4uYZzfu0", "x3HbbzHK5Mc", "vUBmFqo0A_M"],
      },
    ],
    error: null,
  };
  const TrailerView = (
    <Paper className={classes.paperTrailer}>
      {currentTrailerId && (
        <YouTube videoId={currentTrailerId} opts={opts} />
      )}
    </Paper>
  );
  return (
    <Box>
      <Box
        className={[
          classes.captionMargin,
          classes.mwSection,
          "section-hero",
        ].join(" ")}
        component="section"
      >
        <Box
          display="flex"
          flexDirection="row"
          position="relative"
          width="100%"
          className="hero-container"
        >
          <Box className="info-container">
            <Grid direction="column" item container xs={12} sm={8} md={8}>
              <Grid item>
                <Typography variant="h4" component="h4" gutterBottom>
                  Harley Quinn: Birds of Prey
                </Typography>
              </Grid>
              <Grid container item>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Action • 2019 • 1 hour 49 minutes
                  </Typography>
                  <Grid item>
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      marginBottom={2}
                    >
                      <Box display="inherit" paddingRight={1}>
                        <img
                          src={ImdbLogo}
                          alt="imdb"
                          className={classes.imdbLogo}
                          draggable={false}
                        />
                      </Box>
                      <Typography variant="subtitle2" component="span">
                        6.1
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  <ReadMoreReact
                    min={100}
                    ideal={120}
                    max={140}
                    text="After being thrown out in the streets by Joker, Harley struggles
              to pick herself up. However, Harley teams up with Huntress, Black
              Canary and Renee Montoya to defeat a gangster and protect a girl."
                    readMoreText={<ReadMoreText />}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Box marginY={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowRoundedIcon />}
                    classes={{ root: classes.actionButton }}
                  >
                    Watch
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddBoxRoundedIcon />}
                    classes={{ root: classes.actionButton }}
                  >
                    Add to My List
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className="hero-image-container ">
            <Box className="hero-image"></Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="inline-flex"
        flexDirection="row"
        className={[classes.coverShowImageContainer, classes.mwSection].join(
          " "
        )}
        component="section"
      >
        <Box>
          {/* <img
            className={[classes.coverShowImage, classes.movieCardImage].join(
              " "
            )}
            alt="model"
            src="https://images.unsplash.com/photo-1605882008785-56f0cb47482c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          /> */}
        </Box>
      </Box>
      <Box component="section" className={classes.mwSection}>
        <CarouselsShelf
          carouselsData={trailerCarouselData}
          cardBaseWidth={movieCardBaseWidth}
          cardBaseHeight={movieCardBaseHeight}
          cardMarginEnd={movieCardMarginEnd}
          getCardID={getTrailerCardId}
          itemVariant={CAROUSEL_ITEM_VARIANT.TRAILER}
          onItemClick={onTrailerItemClick}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {TrailerView}
      </Modal>
    </Box>
  );
};

export default connect(mapStateToProps)(MovieDetail);
