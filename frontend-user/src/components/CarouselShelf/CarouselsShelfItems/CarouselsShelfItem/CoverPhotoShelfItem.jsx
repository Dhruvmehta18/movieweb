import {Grid, Paper} from "@material-ui/core";
import React, {memo} from "react";
import DynamicImage from "../../../DynamicImage/DynamicImage";
import "./CoverPhotoShelfItem.css";

const CoverPhotoShelfItem = memo((props) => {
    const {item, dark, width, height} = props;
    const srcset = `${item.small.download_url} 1x, ${item.medium.download_url} 2x`;
    const src = `${item.medium.download_url}`;
    return (
        <Grid item component={Paper} className="cover-card-shelf-item" elevation={4}
              datafirst={props.isFirst.toString()}
              datalast={props.isLast.toString()} ref={props.reference}>
            <DynamicImage
                imgClassName="card-img-top"
                alt={item.download_url_path}
                dataSrc={src}
                dataSrcset={srcset}
                fallbackImageUrl={item.small.download_url}
                isFallbackBlur
                dark={dark}
                width={width}
                height={height}
                draggable={false}
            />
        </Grid>
    );
});

export default CoverPhotoShelfItem;
