import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import date from 'date-and-time';
import {addAdvCarouselList} from "../../redux/actions";
import {getAdvCarouselList} from "../../redux/selectors";
import "./advCarouselStyle.css";
import {ReactComponent as LeftArrow} from "../../img/leftArrowAdvIcon.svg";
import {ReactComponent as RightArrow} from "../../img/rightArrowAdvIcon.svg";
import usePreviousState from "../../hooks/usePreviousState";
import {Link as RouterLink} from "react-router-dom";
import {LOADED} from "../../constants/constants";
import {connect} from "react-redux";
import {convertMinutesToReadable} from "../../utility/conversionUtility";

const useStyles = makeStyles((theme) => ({
  captionMargin: {
    marginTop: theme.mixins.toolbar.minHeight,
    [`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
    },
  },
  slideshowHeight: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
  }
}));

const Slide = React.memo((props) => {
  const {
    advCarousel,
    loaded = false,
    isCurrentSlide = false,
    isAnimSlide = false,
    left,
    right,
    slideRightOnAnimationEnd,
    slideLeftOnAnimationEnd
  } = props;
  const {
    title = "",
    imageLink = "",
    genre = [],
    link = "",
    duration,
    year = 0
  } = advCarousel;
  const [slideClass, slideOnAnimationEnd, titleClass] = useMemo(() => {
    const slideClass = ["slide"];
    let titleClass = ["advcarousel-title"];
    let slideOnAnimationEnd = null;
    if (loaded) {
      slideClass.push("is-loaded");
    }
    if (isCurrentSlide) {
      slideClass.push("is-active");
    }

    if (isAnimSlide) {
      if (right) {
        slideOnAnimationEnd = slideRightOnAnimationEnd;
        slideClass.push("new-right-slide");
      } else if (left) {
        slideClass.push("new-left-slide");
        slideOnAnimationEnd = slideLeftOnAnimationEnd;
      } else {
      }
    }
    return [slideClass, slideOnAnimationEnd, titleClass];
  }, [
    isAnimSlide,
    isCurrentSlide,
    left,
    loaded,
    right,
    slideLeftOnAnimationEnd,
    slideRightOnAnimationEnd,
  ]);

  useEffect(() => {
  }, [
    slideClass,
    imageLink,
    loaded,
    isCurrentSlide,
    isAnimSlide,
    left,
    right,
  ]);

  const secondaryText = useMemo(() => {
    const secondaryTextTemp = [];
    if (genre.length > 0) {
      secondaryTextTemp.push(genre.join("/"))
    }
    if (year !== 0) {
      secondaryTextTemp.push(year);
    }
    if (parseInt(duration) !== 0) {
      secondaryTextTemp.push(convertMinutesToReadable(duration));
    }
    return secondaryTextTemp.join(" • ")
  }, [genre, duration, year]);

  return (
      <Box className={slideClass.join(" ")} onAnimationEnd={slideOnAnimationEnd}>
        <Box className="slide-content">
          <Box className={["caption"].join(" ")}>
            <Box>
              <Typography variant="h3" component="h4" className={titleClass.join(" ")}>{title}</Typography>
              <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className="advcarousel-text"
                  component="p"
                  gutterBottom
              >
                {secondaryText}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography
                  variant="h5"
                  color="textSecondary"
                  component="span"
                  className="releasing-text"
              >
                Releasing on
              </Typography>
              <Typography
                  variant="h6"
                  component="span"
                  className="releasing-text"
              >
                {duration === "0" && advCarousel.release_date && date.transform(advCarousel.release_date, 'YYYY-MM-DD', ' D MMMM')}
              </Typography>

            </Box>
            <Box>
              <Button href={link} component={RouterLink} variant="contained" color="primary" to={link}>
                Watch now
              </Button>
            </Box>
          </Box>
      </Box>
      <Box className="image-container">
        <img
            src={advCarousel && advCarousel["cover_photos"] ? advCarousel["cover_photos"][1]["large"]["download_url"] : null}
            alt="d" className="image"/>
      </Box>
    </Box>
  );
});

const OptimizedSlide = React.memo(Slide);

const LoadedSlide = React.memo((props) => {
  const {
    advCarouselList,
    animCurrentSlide,
    currentSlide,
    prevAnimSlide,
    slideClasses,
    slideLeftOnAnimationEnd,
    slideRightOnAnimationEnd,
  } = props;
  useEffect(() => {}, [
    animCurrentSlide,
    currentSlide,
    prevAnimSlide,
    advCarouselList,
  ]);
  return (
    <React.Fragment>
      {JSON.parse(advCarouselList).map((value, index) => {
        const isAnimSlide =
          index === animCurrentSlide && currentSlide !== animCurrentSlide;
        return (
          <OptimizedSlide
            key={index}
            advCarousel={value}
            loaded={true}
            isCurrentSlide={index === currentSlide}
            left={isAnimSlide && prevAnimSlide > animCurrentSlide}
            right={isAnimSlide && prevAnimSlide < animCurrentSlide}
            isAnimSlide={isAnimSlide}
            slideRightOnAnimationEnd={slideRightOnAnimationEnd}
            slideLeftOnAnimationEnd={slideLeftOnAnimationEnd}
            slideClasses={slideClasses}
          />
        );
      })}
    </React.Fragment>
  );
});

const FallBackSlide = React.memo((props) => {
  const { slideClasses } = props;
  return (
    <OptimizedSlide
      key={0}
      advCarousel={[]}
      loaded={false}
      isCurrentSlide={true}
      left={false}
      right={false}
      isAnimSlide={false}
      slideRightOnAnimationEnd={null}
      slideLeftOnAnimationEnd={null}
      slideClasses={slideClasses}
    />
  );
});

const SlidesPagination = React.memo((props) => {
  const { length, current, onPageItemClicked } = props;
  useEffect(() => {}, [length, current, onPageItemClicked]);
  return (
    <div className="pagination">
      {Array.from({ length: length }, (_, key) => {
        let itemClass = ["item"];
        if (key === current) {
          itemClass.push("is-active");
        }
        return (
          <div
            className={itemClass.join(" ")}
            key={key}
            onClick={() => onPageItemClicked(key)}
          >
            <Typography component="span" className="icon">
              {key}
            </Typography>
          </div>
        );
      })}
    </div>
  );
});

const SlideArrows = memo((props) => {
  const { onLeftArrowClicked, onRightArrowClicked } = props;
  useEffect(() => {}, [onLeftArrowClicked, onRightArrowClicked]);
  return (
    <div className="arrows">
      <div className="arrow prev" onClick={onLeftArrowClicked}>
        <span className="svg svg-arrow-left">
          <LeftArrow/>
          <span className="alt sr-only"> </span>
        </span>
      </div>
      <div className="arrow next" onClick={onRightArrowClicked}>
        <span className="svg svg-arrow-right">
          <RightArrow/>
          <span className="alt sr-only"> </span>
        </span>
      </div>
    </div>
  );
});

const AdvCarousel = (props) => {
  const { advCarouselData } = props;
  const { requestState, data: advCarouselList, error } = advCarouselData;
  const classes = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animCurrentSlide, setAnimCurrentSlide] = useState(0);
  const prevAnimSlide = usePreviousState(animCurrentSlide);

  const slideRight = useCallback(() => {
    setAnimCurrentSlide((prevAnimSlide + 1) % advCarouselList.length);
  }, [prevAnimSlide, advCarouselList.length]);

  const slideLeft = useCallback(() => {
    setAnimCurrentSlide(
      (prevAnimSlide + advCarouselList.length - 1) % advCarouselList.length
    );
  }, [advCarouselList.length, prevAnimSlide]);

  useEffect(() => {
    let timer = 0;
    if (requestState === LOADED) {
      timer = setTimeout(() => {
        slideRight();
      }, 8000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [requestState, error, currentSlide, animCurrentSlide, slideRight]);

  const onLeftArrowClicked = useCallback(() => {
    slideLeft();
  }, [slideLeft]);

  const onRightArrowClicked = useCallback(() => {
    slideRight();
  }, [slideRight]);

  const onPageItemClicked = useCallback((item) => {
    setAnimCurrentSlide(item);
  }, []);

  const slideRightOnAnimationEnd = useCallback(() => {
    setCurrentSlide(animCurrentSlide);
  }, [animCurrentSlide]);

  const slideLeftOnAnimationEnd = useCallback(() => {
    setCurrentSlide(animCurrentSlide);
  }, [animCurrentSlide]);

  const slideClasses = React.useMemo(() => {
    const { captionMargin } = classes;
    const classNames = {
      captionMargin,
    };
    return {
      ...classNames,
    };
  }, [classes]);

  return (
    <React.Fragment>
      {requestState === LOADED ? (
        <LoadedSlide
          advCarouselList={JSON.stringify(advCarouselList)}
          animCurrentSlide={animCurrentSlide}
          currentSlide={currentSlide}
          prevAnimSlide={prevAnimSlide}
          slideClasses={slideClasses}
          slideLeftOnAnimationEnd={slideLeftOnAnimationEnd}
          slideRightOnAnimationEnd={slideRightOnAnimationEnd}
        />
      ) : (
        <FallBackSlide slideClasses={slideClasses} />
      )}
      {requestState === LOADED ? (
          advCarouselList.length > 1 && <SlidesPagination
              current={currentSlide}
              length={advCarouselList.length}
              onPageItemClicked={onPageItemClicked}
          />
      ) : (
          <SlidesPagination
              current={0}
              length={advCarouselList.length}
              onPageItemClicked={null}
          />
      )}
      {advCarouselList.length > 1 && (<SlideArrows
          onLeftArrowClicked={onLeftArrowClicked}
          onRightArrowClicked={onRightArrowClicked}
      />)}
    </React.Fragment>
  );
};

const AdvCarouselContainer = (props) => {
  const { advCarouselData, getUserAdvCarousel } = props;
  const classes = useStyles();
  useEffect(() => {
    getUserAdvCarousel();
  }, [getUserAdvCarousel]);
  return (
    <main className={["main-content", classes.captionMargin].join(" ")}>
      <section className={["slideshow", classes.slideshowHeight].join(" ")}>
        <div className="slideshow-inner">
          <div className="slides">
            <AdvCarousel advCarouselData={advCarouselData}/>
          </div>
        </div>
      </section>
    </main>
  );
};

function mapStateToProps(state) {
  return {
    advCarouselData: getAdvCarouselList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAdvCarousel: () => dispatch(addAdvCarouselList()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(AdvCarouselContainer));
