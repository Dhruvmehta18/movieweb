import { Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import DynamicImage from "../DynamicImage/DynamicImage";
import "./advCarouselStyle.css";
import { ReactComponent as LeftArrow } from "../../img/leftArrowAdvIcon.svg";
import { ReactComponent as RightArrow } from "../../img/rightArrowAdvIcon.svg";
import usePreviousState from "../usePreviousState";
import { Link as RouterLink } from "react-router-dom";

const AdvCarousel = (props) => {
  const { advCarouselList } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animCurrentSlide, setAnimCurrentSlide] = useState(0);
  const prevSlide = usePreviousState(currentSlide);
  const prevAnimSlide = usePreviousState(animCurrentSlide);
  const advRawCarouselList = React.useMemo(
    () => [
      {
        title: "Title 1",
        description: "Subtitle 1",
        imageLink:
          "https://www.alixbdanthenay.fr/wp-content/uploads/2015/07/Indispensable-1.jpg",
        link: "/movie/lsdisdfsdfsdf",
      },
      {
        title: "Title 2",
        description: "Subtitle 2",
        imageLink:
          "https://www.alixbdanthenay.fr/wp-content/uploads/2015/07/Indispensable-4-1.jpg",
        link: "/movie/lsdisdfsdfsds",
      },
      {
        title: "Title 3",
        description: "Subtitle 3",
        imageLink:
          "https://www.alixbdanthenay.fr/wp-content/uploads/2016/11/11.jpg",
        link: "/movie/lsdisdfssfsdf",
      },
      {
        title: "Title 4",
        description: "Subtitle 4",
        imageLink:
          "https://www.alixbdanthenay.fr/wp-content/uploads/2016/11/20mars17-sans-typo.jpg",
        link: "/movie/lsdisdfsdfsdf",
      },
    ],
    []
  );

  const slideRight = useCallback(() => {
    setAnimCurrentSlide((prevAnimSlide + 1) % advRawCarouselList.length);
  }, [prevAnimSlide, advRawCarouselList.length]);

  const slideLeft = useCallback(() => {
    setAnimCurrentSlide(
      (prevAnimSlide + advRawCarouselList.length - 1) %
        advRawCarouselList.length
    );
  }, [advRawCarouselList.length, prevAnimSlide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      slideRight();
    }, 8000);
    return ()=>{
      clearTimeout(timer);
    }
  }, [currentSlide, animCurrentSlide, advRawCarouselList, slideRight]);

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

  return (
    <main className="main-content">
      <section className="slideshow">
        <div className="slideshow-inner">
          <div className="slides">
            {advRawCarouselList &&
              advRawCarouselList.length > 0 &&
              advRawCarouselList.map((value, index) => {
                const { title, description, imageLink, link } = value;
                let slideClass = ["slide", "is-loaded"];
                let titleClass = ["advcarousel-title"];
                let slideOnAnimationEnd = null;
                if (index === currentSlide) {
                  slideClass.push("is-active");
                }
                if (
                  index === animCurrentSlide &&
                  currentSlide !== animCurrentSlide
                ) {
                  if (prevAnimSlide < animCurrentSlide) {
                    slideOnAnimationEnd = slideRightOnAnimationEnd;
                    slideClass.push("new-right-slide");
                  } else if (prevAnimSlide > animCurrentSlide) {
                    slideClass.push("new-left-slide");
                    slideOnAnimationEnd = slideLeftOnAnimationEnd;
                  } else {
                  }
                }
                return (
                  <div
                    className={slideClass.join(" ")}
                    key={index}
                    onAnimationEnd={slideOnAnimationEnd}
                  >
                    <div className="slide-content">
                      <div className="caption">
                        <Typography className={titleClass.join(" ")}>{title}</Typography>
                        <div className="advcarousel-text">
                          <Typography component="p">{description}</Typography>
                        </div>
                        <RouterLink to={link} className="advcarousel-btn">
                          <Typography component="span" className="btn-inner">
                            Watch now
                          </Typography>
                        </RouterLink>
                      </div>
                    </div>
                    <div className="image-container">
                      <img src={imageLink} alt="d" className="image" />
                    </div>
                  </div>
                );
              })}
            <div className="pagination">
              {advRawCarouselList &&
                advRawCarouselList.length > 0 &&
                Array.from({ length: advRawCarouselList.length }, (_, key) => {
                  let itemClass = ["item"];
                  if (key === currentSlide) {
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
            <div className="arrows">
              <div className="arrow prev" onClick={onLeftArrowClicked}>
                <span className="svg svg-arrow-left">
                  <LeftArrow />
                  <span className="alt sr-only"></span>
                </span>
              </div>
              <div className="arrow next" onClick={onRightArrowClicked}>
                <span className="svg svg-arrow-right">
                  <RightArrow />
                  <span className="alt sr-only"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdvCarousel;
