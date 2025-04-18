#!/usr/bin/env node

import React, { useEffect, useState } from 'react';
import UserInput from './components/UserInput';
import { Box, render, Text } from 'ink';
import scrape, { Torrent } from './scraper/torrent-scraper';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Results from './components/Results';
import Download from './download';

const Search = () => {
      const [query, setQuery] = useState<string>('');
      const [torrents, setTorrents] = useState<Torrent[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(false);
    
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
              <Text color={'blue'}>{query}</Text>
              <Loader pretext='' />
            </Box>
          )}
          {query && !isLoading && torrents.length == 0 && (
            <Box borderStyle={'round'} borderColor={'red'}>
              <Text>No results found</Text>
            </Box>
          )}
          {/* Queried finished with results */}
          {query && !isLoading && torrents.length > 0 && (
              <Results torrents={torrents} onSelect={(torrent) => {
                return <Download torrent={torrent}/>
              }}/>
          )}
        </Box>
        )
}

export default Search;