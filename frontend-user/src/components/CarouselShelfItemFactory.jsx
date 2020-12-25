import React from 'react';
import PropTypes from 'prop-types';
import { CAROUSEL_ITEM_VARIANT } from '../constants/constants';
import { Box } from '@material-ui/core';
import CarouselsShelfItem from './CarouselShelf/CarouselsShelfItems/CarouselsShelfItem/CarouselsShelfItem';
import TrailerShelfItem from './CarouselShelf/CarouselsShelfItems/CarouselsShelfItem/TrailerShelfItem';

const CarouselShelfItemFactory = props => {
    const {itemVariant, item, ...extraProps} = props;
    switch (itemVariant) {
        case CAROUSEL_ITEM_VARIANT.MOVIE: 
            return <CarouselsShelfItem item={item} {...extraProps}/>
        case CAROUSEL_ITEM_VARIANT.TRAILER:
            return <TrailerShelfItem item={item} {...extraProps}/>;
        default: 
            return <Box>Error no element found</Box>;
    }
};

CarouselShelfItemFactory.propTypes = {
    itemVariant: PropTypes.oneOf([CAROUSEL_ITEM_VARIANT.MOVIE, CAROUSEL_ITEM_VARIANT.TRAILER]).isRequired,
    item: PropTypes.any.isRequired
};

export default CarouselShelfItemFactory;