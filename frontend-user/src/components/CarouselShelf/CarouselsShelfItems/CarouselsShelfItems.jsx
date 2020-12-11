import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import CarouselsShelfItem from './CarouselsShelfItem/CarouselsShelfItem';
import "./carouselsitems.css"

const CarouselsShelfItems = props => {
    const {carousel} = props
    return (
        <Grid container wrap="nowrap" className="carousels-container">
            {carousel.list.map((movie, index)=>{
                return (
                    <CarouselsShelfItem key={movie.id} movie={movie}/>
                )
            })}
        </Grid>
    );
};

CarouselsShelfItems.propTypes = {
    
};

export default CarouselsShelfItems;