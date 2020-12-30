import {Box, Divider, useMediaQuery} from '@material-ui/core';
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {Configure, InstantSearch} from 'react-instantsearch-dom';
import SearchInput from '../components/Search/SearchInput';
import SearchResult from '../components/Search/SearchResult';
import SearchHits from '../components/Search/SearchHits';
import {useWindowSize} from '../hooks/useWindowSize';
import GenreRefinementList from '../components/CustomRefinementList/GenreRefinementList/GenreRefinementList';

const searchClient = algoliasearch(
    'HL50PNGSZP',
    '39567cbb0cd3a639974aa51f914ec281'
  );

const SearchPage = () => {
  const {width} = useWindowSize();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let hitsPerPage = 0;
  if(width>=1900){
    hitsPerPage = 16;
  } else if(width>=1280){
    hitsPerPage = 12;
  } else if(width>=800){
    hitsPerPage = 10;
  } else if(width>=600){
    hitsPerPage = 8
  } else{
    hitsPerPage = 6;
  }
    return (
        <Box>
            <InstantSearch indexName="dev_MOVIES" searchClient={searchClient}>
                <Configure hitsPerPage={hitsPerPage}/>
                <SearchInput/>
            <Divider/>
            <GenreRefinementList attribute="genre"/>
            <SearchResult Hits={SearchHits} dark={prefersDarkMode}/>
            </InstantSearch>
        </Box>
    );
};

export default SearchPage;
