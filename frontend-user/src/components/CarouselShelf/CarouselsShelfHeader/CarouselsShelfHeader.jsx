import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const CarouselsShelfHeader = memo((props) => {
    const {title} = props;
    return (
        <Box>
            <Typography variant="h6" component="h6">{title}</Typography>
        </Box>
    );
});

CarouselsShelfHeader.propTypes = {
    title: PropTypes.string
};

export default CarouselsShelfHeader;