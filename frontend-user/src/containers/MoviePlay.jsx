import React, {useCallback, useMemo, useRef, useState} from "react";
import ReactPlayer from "react-player/lazy";
import Box from "@material-ui/core/Box";
import {Grid, IconButton, LinearProgress, makeStyles, Tooltip, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import usePreviousState from "../hooks/usePreviousState";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import Forward10RoundedIcon from "@material-ui/icons/Forward10Rounded";
import Replay10RoundedIcon from "@material-ui/icons/Replay10Rounded";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitRoundedIcon from "@material-ui/icons/FullscreenExitRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import PauseIcon from "@material-ui/icons/Pause";
import screenfull from "screenfull";

import "./MoviePlay.css";

const useStyles = makeStyles((theme) => ({
  matchParent: {
    width: "inherit",
    height: "inherit",
  },
  controllerContainer: {
    left: 0,
    bottom: 0,
    zIndex: theme.zIndex.mobileStepper,
  },
  topBox: {
    left: 0,
    top: 0,
    zIndex: theme.zIndex.mobileStepper,
  },
}));
const MoviePlay = () => {
  const classes = useStyles();
  const playerRef = useRef(null);
  const history = useHistory();

  const [url, setUrl] = useState(
    "https://fragmenttranscodedmovieoutput.s3.ap-south-1.amazonaws.com/movie/trailer_1080p.mpd"
  );
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const prevPlayed = usePreviousState(played);

  const load = (url) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
    setPip(false);
  };

  const handlePlayPause = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const handleStop = useCallback(() => {
    setUrl(null);
    setPlaying(false);
  }, []);

  const handleToggleControls = useCallback(() => {
    setUrl(null);
    load(url);
  }, [url]);

  const handleVolumeChange = useCallback((e) => {
    setVolume(parseFloat(e.target.value));
  }, []);

  const handleToggleMuted = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  const handleTogglePIP = useCallback(() => {
    setPip(!pip);
  }, [pip]);

  const handlePlay = useCallback(() => {
    console.log("onPlay");
    setPlaying(true);
  }, []);

  const handleEnablePIP = useCallback(() => {
    console.log("onEnablePIP");
    setPip(true);
  }, []);

  const handleDisablePIP = useCallback(() => {
    console.log("onDisablePIP");
    setPip(false);
  }, []);

  const handlePause = useCallback(() => {
    console.log("onPause");
    setPlaying(false);
  }, []);

  const onForwardButtonClicked = useCallback(() => {
      playerRef.current.seekTo(Math.min(playedSeconds + 10, duration));
      setPlayedSeconds(Math.min(playedSeconds + 10, duration));
      setPlayed(Math.min(prevPlayed + 10 / duration, 1));
  }, [playedSeconds, duration, prevPlayed]);

  const onReplayButtonClicked = useCallback(() => {
      playerRef.current.seekTo(Math.max(playedSeconds - 10, 0));
      setPlayedSeconds(Math.max(playedSeconds - 10, 0));
      setPlayed(Math.max(prevPlayed - 10 / duration, 0));
  }, [prevPlayed, duration, playedSeconds]);

  const handleSeekMouseDown = useCallback((e) => {
    setSeeking(true);
  }, []);

  const handleSeekChange = useCallback((e) => {
    setPlayed(parseFloat(e.target.value));
  }, []);

  const handleSeekMouseUp = useCallback((e) => {
    setPlayed(0);
    playerRef.current.seekTo(parseFloat(e.target.value));
  }, []);

  const handleProgress = useCallback(
    (state) => {
      console.log("onProgress", state);
      // We only want to update time slider if we are not currently seeking
      if (!seeking) {
        setPlayed(state.played);
        setLoaded(state.loaded);
        setPlayedSeconds(state.playedSeconds);
      }
    },
    [seeking]
  );

  const handleEnded = useCallback(() => {
    console.log("onEnded");
    setPlaying(false);
  }, []);

  const handleDuration = useCallback((duration) => {
    console.log("onDuration", duration);
    setDuration(duration);
  }, []);

  const handleClickFullscreen = useCallback(() => {
    screenfull.request();
    setIsFullscreen(true);
  }, []);

  const handleClickExitScreen = useCallback(() => {
    screenfull.exit();
    setIsFullscreen(false);
  }, []);
  // console.log(played);

  const onBackButtonClicked = () => {
    history.goBack();
  }

  const getVideoFormattedTime = useMemo(() => {
    const stageSeconds = Math.floor(duration);
    const hours = `${Math.floor((stageSeconds / 3600))}`;
    const minutes = `${Math.floor((stageSeconds % 3600) / 60)}`;
    const seconds = `${Math.floor(stageSeconds % (3600 * 60))}`;
    // console.log(hours, minutes, seconds);
    if (hours > 0) {
      return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    } else {
      return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    }
  }, [duration]);

  return (
      <Box width="100%" height="100vh" position="relative">
        <Grid container className={classes.matchParent}>
          <Grid item className="mw-gradient-top" component={Box}></Grid>
          <Grid
              item
              className={classes.topBox}
              component={Box}
              position="absolute"
        >
          <Tooltip title="back" aria-label="back">
            <IconButton onClick={onBackButtonClicked}>
              <ArrowBackRoundedIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          direction="row"
          component={Box}
          className={classes.matchParent}
        >
          <Grid item xs={12} component={Box} className={classes.matchParent}>
            <ReactPlayer
              ref={playerRef}
              url={url}
              playbackRate={1.0}
              loop={false}
              light={false}
              width="100%"
              height="100%"
              pip={pip}
              playing={playing}
              controls={false}
              volume={volume}
              muted={muted}
              progressInterval={
                duration < 100 ? duration.toFixed(1) * 10 : 1000
              }
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={handlePlay}
              onEnablePIP={handleEnablePIP}
              onDisablePIP={handleDisablePIP}
              onPause={handlePause}
              onBuffer={() => console.log("onBuffer")}
              onSeek={(e) => console.log("onSeek", e)}
              onEnded={handleEnded}
              onError={(e) => console.log("onError", e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          component={Box}
          position="absolute"
          className={classes.controllerContainer}
          paddingX={4}
          paddingY={2}
        >
          <Grid item xs={12}>
          <Box display="flex" alignItems="center" flexWrap="nowrap" >
            <Box width="100%">
              <LinearProgress
                  variant="buffer"
                  value={played * 100}
                  valueBuffer={loaded * 100}
              />
            </Box>
            <Box display="inline">
              <Typography component="span">{getVideoFormattedTime}</Typography>{}
            </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="left-controls">
              <Tooltip
                title={playing ? "pause" : "play"}
                aria-label={playing ? "pause" : "play"}
              >
                <IconButton onClick={handlePlayPause}>
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowRoundedIcon fontSize="large" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="forward 10s" aria-label="forward 10 seconds">
                <IconButton onClick={onForwardButtonClicked}>
                  <Forward10RoundedIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              <Tooltip title="replay 10s" aria-label="replay 10 seconds">
                <IconButton onClick={onReplayButtonClicked}>
                  <Replay10RoundedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box className="right-controls">
              {screenfull.isEnabled ? (
                <Tooltip
                  title={isFullscreen ? "close fullscreen" : "fullscreen"}
                  aria-label={isFullscreen ? "close fullscreen" : "fullscreen"}
                >
                  <IconButton
                    onClick={
                      isFullscreen
                        ? handleClickExitScreen
                        : handleClickFullscreen
                    }
                  >
                    {isFullscreen ? (
                      <FullscreenExitRoundedIcon fontSize="large" />
                    ) : (
                      <FullscreenRoundedIcon fontSize="large" />
                    )}
                  </IconButton>
                </Tooltip>
              ) : null}
            </Box>
          </Grid>
        </Grid>
        <Grid item className="mw-gradient-bottom" component={Box}></Grid>
      </Grid>
    </Box>
  );
};

export default MoviePlay;
