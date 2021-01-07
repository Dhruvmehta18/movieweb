import React, {memo, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Box, makeStyles} from "@material-ui/core";
import fallBackImageLight from "../../img/fallbackImage.svg";
import fallBackImageDark from "../../img/fallbackImageDark.svg";
import transitions from "@material-ui/core/styles/transitions";

const useStyles = makeStyles(() => ({
  canvasImage: ({ width, height }) => ({
    width: width,
    height: height,
    position: "absolute",
    transition: transitions.create("opacity", {
      duration: transitions.duration.shorter,
      easing: transitions.easing.easeInOut,
    }),
  }),
  imageSize: {
    width: "auto",
    height: "100%",
    transition: transitions.create("opacity", {
      duration: transitions.duration.shorter,
      easing: transitions.easing.easeInOut,
    }),
  },
  zeroOpacity: {
    opacity: 0,
  },
}));
const DynamicImage = memo((props) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    alt = "",
    dataSrc = "",
    fallbackImageUrl = "",
    isFallbackBlur = false,
    dark = false,
    width,
    height,
    imgClassName,
    dataSrcset,
    ...extraProps
  } = props;
  const [errorImgMain, setErrorImgMain] = useState(true);
  const [errorFallbackImage, setErrorFallbackImage] = useState(true);
  const [imageSrc, setImageSrc] = useState(
    dark ? fallBackImageDark : fallBackImageLight
  );
  useEffect(() => {
    const loadCanvasImage = (imageUrl, isFallbackBlur = false) => {
      var context = canvasRef.current.getContext("2d");

      // load image from data url
      var imageObj = document.createElement("img");
      imageObj.width = width;
      imageObj.height = height;
      imageObj.src = imageUrl;
      imageObj.onload = () => {
        if (isFallbackBlur) {
          context.filter = "blur(2px)";
        }
        context.drawImage(imageObj, 0, 0, width, height);
        imageObj.remove();
        setErrorFallbackImage(false);
      };
      imageObj.onerror = () => {
        setErrorFallbackImage(true);
      };
    };
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.0) {
          const img = entry.target;
          if (!img.hasAttribute("srcset") && img.dataset.srcset) {
            img.setAttribute("srcset", img.dataset.srcset);
          }
          if (errorImgMain) {
            img.onload = () => {
              observer.unobserve(img);
              setErrorImgMain(false);
            };
            img.onerror = () => {
              setErrorImgMain(true);
            };
            setImageSrc(img.dataset.src);
            if (fallbackImageUrl && errorFallbackImage) {
              loadCanvasImage(fallbackImageUrl, isFallbackBlur);
            }
          }
        }
      });
      return () => {
        imageObserver.disconnect();
      }
    }, {});

    canvasRef.current && errorImgMain && imageObserver.observe(imageRef.current);
  }, [
    errorImgMain,
    errorFallbackImage,
    isFallbackBlur,
    fallbackImageUrl,
    width,
    height,
    dark,
    canvasRef
  ]);
  const classes = useStyles({ width: width, height: height });

  let imageClassName = [classes.imageSize, imgClassName || ""];
  if (errorImgMain) {
    imageClassName = [...imageClassName, classes.zeroOpacity];
  } else {
    imageClassName = imageClassName.filter(
      (value) => value !== classes.zeroOpacity
    );
  }
  let canvasClassName = [classes.canvasImage];
  if (errorFallbackImage || !errorImgMain) {
    canvasClassName = [...canvasClassName, classes.zeroOpacity];
  } else {
    canvasClassName = canvasClassName.filter(
      (value) => value !== classes.zeroOpacity
    );
  }

  return (
    <Box
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      position="relative"
      className={props.containerClassName}
    >
      <img
        alt={alt}
        src={imageSrc}
        className={imageClassName.join(" ")}
        data-src={dataSrc}
        data-srcset={dataSrcset}
        ref={imageRef}
        {...extraProps}
      />
      <canvas
        className={canvasClassName.join(" ")}
        ref={canvasRef}
        width={width}
        height={height}
      >
        Your Browser not supported yet
      </canvas>
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
