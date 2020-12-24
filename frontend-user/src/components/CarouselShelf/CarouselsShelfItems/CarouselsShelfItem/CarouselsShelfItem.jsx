import { Grid, Paper } from "@material-ui/core";
import React, { memo } from "react";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import "./carousels_shelf_item.css";

const CarouselsShelfItem = memo((props) => {
  const { movie, dark } = props;
  const srcset = `${movie.card_photo.small.download_url} 0.5x, ${movie.card_photo.medium.download_url} 1x, ${movie.card_photo.large.download_url} 2x`;
  const src = `${movie.card_photo.medium.download_url}`;
  const linkTo = `/movie/${movie.id}`;

  var style = getComputedStyle(document.body);
  const movieCardBaseWidth = parseInt(
    style.getPropertyValue("--movie-card-width")
  );
  const movieCardBaseHeight = parseInt(
    style.getPropertyValue("--movie-card-height")
  );

  return (
    <Grid item component={Paper} className="movie-card" elevation={4}>
      <a href={linkTo} className="text-reset">
        <DynamicImage
          imgClassName="card-img-top"
          alt={movie.title}
          dataSrc={src}
          dataSrcset={srcset}
          fallbackImageUrl={movie.card_photo.small.download_url}
          isFallbackBlur
          dark={dark}
          width={movieCardBaseWidth}
          height={movieCardBaseHeight}
          draggable={false}
        />
      </a>
    </Grid>
  );
});

export default CarouselsShelfItem;
