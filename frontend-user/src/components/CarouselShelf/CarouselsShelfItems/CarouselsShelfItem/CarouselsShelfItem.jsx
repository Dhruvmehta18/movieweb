import { Grid, Paper } from "@material-ui/core";
import React, { memo } from "react";
import "./carousels_shelf_item.css";

const CarouselsShelfItem = memo((props) => {
  const { movie } = props;
  const srcset = `${movie.card_photo.small.download_url} 0.5x, ${movie.card_photo.medium.download_url} 1x, ${movie.card_photo.large.download_url} 2x`;
  const src = `${movie.card_photo.medium.download_url}`;
  const linkTo = `/movie/${movie.id}`;
  return (
    <Grid item component={Paper} className="movie-card">
      <a href={linkTo} className="text-reset">
        <img
          className="card-img-top card-image"
          alt={movie.title}
          srcSet={srcset}
          src={src}
        />
      </a>
    </Grid>
  );
});

export default CarouselsShelfItem;
