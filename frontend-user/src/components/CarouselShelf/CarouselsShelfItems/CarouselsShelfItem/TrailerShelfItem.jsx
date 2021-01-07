import {Grid, Paper} from "@material-ui/core";
import React, {memo} from "react";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import "./TrailerShelfItem.css";

const TrailerShelfItem = memo((props) => {
    const {item, dark, width, height, onItemClick} = props;
    const src = `https://i.ytimg.com/vi/${item}/mqdefault.jpg`;
    const fallbackImageUrl = `https://i.ytimg.com/vi/${item}/default.jpg`

    return (
        <Grid item component={Paper} className="trailer-card" elevation={4} onClick={() => onItemClick(item)}
              datafirst={props.isFirst.toString()}
              datalast={props.isLast.toString()} ref={props.reference}>
            <DynamicImage
                imgClassName="card-img-top"
                alt={item}
                dataSrc={src}
                //   dataSrcset={srcset}
                fallbackImageUrl={fallbackImageUrl}
                isFallbackBlur
                dark={dark}
                width={width}
                height={height}
          draggable={false}
        />
    </Grid>
  );
});

export default TrailerShelfItem;
