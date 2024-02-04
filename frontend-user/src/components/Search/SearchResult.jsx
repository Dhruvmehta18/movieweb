import {Box} from '@material-ui/core';
import React, {memo} from 'react';
import SearchHit from './SearchHit';

const SearchResult = (props) => {
    const {Hits, dark} = props;
    return (
        <Box margin={2}>
            <Hits hitComponent={SearchHit} dark={dark}/>
        </Box>
    );
};

export default memo(SearchResult);
