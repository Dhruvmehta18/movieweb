import {Box, Button, Grid, makeStyles, Modal, Paper, Typography,} from "@material-ui/core";
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import ReadMoreReact from "read-more-react";
import {useHistory, useParams} from "react-router-dom";
import YouTube from "react-youtube";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import "./MovieDetail.css";
import ImdbLogo from "../img/imdb_logo.svg";
import {CAROUSEL_ITEM_VARIANT, ERROR, LOADED, LOADING} from "../constants/constants";
import CarouselsShelf from "../components/CarouselShelf/CarouselsShelf";
import withHeader from "../hoc/withHeader";
import {addMovie} from "../redux/actions";
import {getMovieById} from "../redux/selectors";
import {convertMinutesToReadable} from "../utility/conversionUtility";

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

function mapStateToProps(state, ownProps) {
  return {
    movie: getMovieById(state, ownProps.movieId)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (movieId) => dispatch(addMovie(movieId))
  }
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

const MovieInner = (props) => {
  const {
    fetchMovie, movieId, movie = {
      requestState: LOADING,
      data: {},
      error: null
    }
  } = props;
  const history = useHistory();
  const [currentTrailerId, setCurrentTrailerId] = useState(null);
  const [open, setOpen] = React.useState(false);

  const {requestState, data, error} = movie;
  const {title = "", description = "", trailer_id = "", rating = 0, genre = [], duration = 0, year = 0, cover_photos} = data;

  const handleOpen = (trailer_id) => {
    setCurrentTrailerId(trailer_id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentTrailerId(null);
    setOpen(false);
  };
  const classes = useStyles();

  const style = getComputedStyle(document.body);

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

  const onPlayButtonClicked = useCallback(() => {
    history.push(`/play/${movieId}`);
  }, [movieId, history]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const trailerCarouselData = {
    requestState: requestState,
    data: [
      {
        title: "Trailers",
        list: trailer_id.split(','),
      }
    ],
    error: error,
  };

  const durationString = useMemo(() => {
    return convertMinutesToReadable(duration);
  }, [duration]);

  useEffect(() => {
    if (!data.id) {
      fetchMovie(movieId);
    }
  }, [data.id]);
  console.log(data);
  const TrailerView = (
      <Paper className={classes.paperTrailer}>
        {currentTrailerId && (
            <YouTube videoId={currentTrailerId} opts={opts}/>
        )}
      </Paper>
  );
  const heroImageStyle = useMemo(() => {
    switch (requestState) {
      case LOADING:
        return {};
      case LOADED:
        const cover_photo = cover_photos[0];
        const photoUrl = cover_photo ? cover_photo.large.download_url : "";
        return {
          backgroundImage: `url("${photoUrl}")`
        };
      case ERROR:
        return error;
    }
  }, [requestState, cover_photos, error]);

  return (
      <React.Fragment>
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
              {requestState === LOADED ? <Grid direction="column" item container xs={12} sm={8} md={8}>
                <Grid item>
                  <Typography variant="h4" component="h4" gutterBottom>
                    {title}
                  </Typography>
                </Grid>
                <Grid container item>
                  <Grid item>
                    <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                    >
                      {genre.join("/")} • {year} • {durationString}
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
                          {rating}
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
                    {description && description !== "" && <ReadMoreReact
                        min={100}
                        ideal={120}
                        max={140}
                        text={description}
                        readMoreText={<ReadMoreText/>}
                    />}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box marginY={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrowRoundedIcon/>}
                        classes={{root: classes.actionButton}}
                        onClick={onPlayButtonClicked}
                    >
                      Watch
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddBoxRoundedIcon/>}
                        classes={{root: classes.actionButton}}
                    >
                      Add to My List
                    </Button>
                  </Box>
                </Grid>
              </Grid> : null
              }
            </Box>
            <Box className="hero-image-container ">
              <Box className="hero-image" style={heroImageStyle}> </Box>
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
      </React.Fragment>
  );
}

const MovieInnerRedux = connect(mapStateToProps, mapDispatchToProps)(MovieInner);

const MovieDetail = memo((props) => {
  let {movie_id} = useParams();
  return (
      <Box>
        <MovieInnerRedux movieId={movie_id} {...props}/>
      </Box>
  );
});

export default withHeader(MovieDetail);
