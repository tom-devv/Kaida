#!/usr/bin/env node

import React, { useEffect, useState } from 'react';
import UserInput from './components/UserInput';
import { Box, render, Text } from 'ink';
import {scrape, FetchedTorrent } from './scraper/torrent-scraper';
import Loader from './components/loading/Loader';
import Hero from './components/Hero';
import Results from './components/Results';
import Download from './download';

const Search = () => {
      const [query, setQuery] = useState<string>('');
      const [torrents, setTorrents] = useState<FetchedTorrent[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [selectedTorrent, setSelectedTorrent] = useState<FetchedTorrent>();
    
      const handleQuerySubmit = (userInput: string) => {
        setQuery(userInput);
        setIsLoading(true)
        scrape(userInput).then(torrents => {
          setTorrents(torrents)
          setIsLoading(false)
          if(torrents.length == 0) setQuery(' '); // Give the user another search
        })
      }

      return (
        <Box flexDirection='column'>
          {/* Conditionally show input box  */}
          {!query && !isLoading && torrents.length == 0 && <UserInput onSubmit={handleQuerySubmit}/>}
          {/* Show loading spinner */}
          {isLoading && (
            <Box borderStyle={'round'} width={50}>
              <Text>🔎 Searching </Text>
              <Text color={'blue'}>{query} </Text>
              <Loader pretext='' />
            </Box>
          )}
          {query && !isLoading && torrents.length == 0 && (
            <Box borderStyle={'round'} borderColor={'red'}>
              <Text>No results found</Text>
            </Box>
          )}
          {/* Queried finished with results */}
          {query && !isLoading && torrents.length > 0 && !selectedTorrent &&  (
              <Results torrents={torrents} onSelect={setSelectedTorrent}/>
          )}
          {selectedTorrent && (
            <Download torrent={selectedTorrent}/>
          )}
        </Box>
        )
}

export default Search;