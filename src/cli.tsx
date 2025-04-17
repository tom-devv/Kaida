#!/usr/bin/env node
import React, { useEffect, useState } from 'react';
import { Box, render, Text } from 'ink';
import meow from 'meow';
import Results from './components/Results';
import scrape from './scraper/torrent-scraper';
import type { Torrent } from './scraper/torrent-scraper';
import Loader from './components/Loader';
const cli = meow(`
  Usage
    $ kaida <query>

  Example
    $ kaida "Dune"
`, {
  importMeta: import.meta,
  flags: {}
});


const App = () => {
  const [torrents, setTorrents] = useState<Torrent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!cli.input.length) {
        setError('❌ Please provide a search query.');
        return;
      }

      try {
        const results = await scrape(cli.input.join(' '));
        setTorrents(results);
      } catch (err) {
        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    run();
  }, []);

  if (error) return <Text color="red">{error}</Text>;
  if (!torrents) return (
    <Box>
        <Text>🔍 Searching </Text>
        <Loader></Loader>
    </Box>
);

  return <Results torrents={torrents} />;
};

render(<App />);
