import React from 'react';
import PropTypes from 'prop-types';
import {CAROUSEL_ITEM_VARIANT} from '../constants/constants';
import {Box} from '@material-ui/core';
import CarouselsShelfItem from './CarouselShelf/CarouselsShelfItems/CarouselsShelfItem/CarouselsShelfItem';
import TrailerShelfItem from './CarouselShelf/CarouselsShelfItems/CarouselsShelfItem/TrailerShelfItem';
import CoverPhotoShelfItem from "./CarouselShelf/CarouselsShelfItems/CarouselsShelfItem/CoverPhotoShelfItem";

const CarouselShelfItemFactory = props => {
    const {itemVariant, item, ...extraProps} = props;
    switch (itemVariant) {
        case CAROUSEL_ITEM_VARIANT.MOVIE:
            return <CarouselsShelfItem item={item} {...extraProps}/>
        case CAROUSEL_ITEM_VARIANT.TRAILER:
            return <TrailerShelfItem item={item} {...extraProps}/>;
        case CAROUSEL_ITEM_VARIANT.COVER_PHOTO:
            return <CoverPhotoShelfItem item={item} {...extraProps}/>;
        default:
            console.error(`Error no element found with name ${itemVariant}. Possible options are MOVIE, TRAILER, COVER_PHOTO`)
            return <Box>Error no element found</Box>;
    }
};

CarouselShelfItemFactory.propTypes = {
    itemVariant: PropTypes.oneOf([CAROUSEL_ITEM_VARIANT.MOVIE, CAROUSEL_ITEM_VARIANT.TRAILER, CAROUSEL_ITEM_VARIANT.COVER_PHOTO]).isRequired,
    item: PropTypes.any.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool
};

export default CarouselShelfItemFactory;
