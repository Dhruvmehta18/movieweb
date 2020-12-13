import React, { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  canvasImage: {
    width: "var(--movie-card-width)",
    height: "var(--movie-card-height)",
    zIndex: 0,
    position: "absolute",
  },
}));
const DynamicImage = memo((props) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    alt,
    dataSrc,
    dataSrcset,
    className,
    fallbackImageUrl,
    isFallbackBlur = false,
  } = props;
  const [errorImgMain, setErrorImgMain] = useState(true);
  const [errorFallbackImage, setErrorFallbackImage] = useState(true);
  var style = getComputedStyle(document.body);
  const movieCardBaseWidth = parseInt(
    style.getPropertyValue("--movie-card-width")
  );
  const movieCardBaseHeight = parseInt(
    style.getPropertyValue("--movie-card-height")
  );
  useEffect(() => {
    const loadCanvasImage = (imageUrl, isFallbackBlur = false) => {
      var context = canvasRef.current.getContext("2d");

      // load image from data url
      var imageObj = document.createElement("img");
      imageObj.width = movieCardBaseWidth;
      imageObj.height = movieCardBaseHeight;
      imageObj.src = imageUrl;
      imageObj.onload = () => {
        if (isFallbackBlur) {
          context.filter = "blur(2px)";
        }
        context.drawImage(
          imageObj,
          0,
          0,
          movieCardBaseWidth,
          movieCardBaseHeight
        );
        imageObj.remove();
      };
      imageObj.onerror = () => {
        setErrorFallbackImage(true)
      }
    };
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.0) {
          const img = entry.target;
          if (!img.hasAttribute("srcset")) {
            img.setAttribute("srcset", img.dataset.srcset);
          }
          if (errorImgMain) {
            img.onload = () => {
              observer.unobserve(img);
              setErrorImgMain(false);
            }
            img.onerror = () => {
              setErrorImgMain(true);
            }
            img.setAttribute("src", img.dataset.src);
            if (errorFallbackImage) {
              loadCanvasImage(fallbackImageUrl, isFallbackBlur);
            }
          }
        }
      });
    }, {});

    imageObserver.observe(imageRef.current);
  }, [errorImgMain, errorFallbackImage, movieCardBaseWidth, movieCardBaseHeight, isFallbackBlur, fallbackImageUrl]);
  const classes = useStyles();
  return (
    <Box
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      position="relative"
    >
      <canvas
        className={classes.canvasImage}
        ref={canvasRef}
        width={movieCardBaseWidth}
        height={movieCardBaseHeight}
      >
        Your Browser not supported yet
      </canvas>
      <img
        alt={alt}
        className={className}
        src={""}
        data-src={dataSrc}
        data-srcset={dataSrcset}
        ref={imageRef}
      />
    </Box>
  );
});

DynamicImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  dataSrc: PropTypes.string,
  className: PropTypes.string,
};

export default DynamicImage;
