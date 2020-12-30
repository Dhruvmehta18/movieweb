import {Grid, Paper} from "@material-ui/core";
import React, {memo} from "react";
import {Link} from "react-router-dom";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import "./carousels_shelf_item.css";

const CarouselsShelfItem = memo((props) => {
  const {item, dark, width, height} = props;
  const srcset = `${item.card_photo.small.download_url} 0.5x, ${item.card_photo.medium.download_url} 1x, ${item.card_photo.large.download_url} 2x`;
  const src = `${item.card_photo.medium.download_url}`;
  const linkTo = `/movie/${item.id}`;
  return (
      <Grid item component={Paper} className="movie-card" elevation={4} datafirst={props.isFirst.toString()}
            datalast={props.isLast.toString()} ref={props.reference}>
        <Link to={linkTo} className="text-reset">
          <DynamicImage
              imgClassName="card-img-top"
              alt={item.title}
              dataSrc={src}
              dataSrcset={srcset}
              fallbackImageUrl={item.card_photo.small.download_url}
              isFallbackBlur
              dark={dark}
              width={width}
          height={height}
          draggable={false}
        />
      </Link>
    </Grid>
  );
});

export default CarouselsShelfItem;
