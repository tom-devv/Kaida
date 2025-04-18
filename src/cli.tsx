#!/usr/bin/env node
import React from 'react';
import { Box, render } from 'ink';
import Hero from './components/Hero';
import Search from './search';

const App = () => {
  return (
    <Box flexDirection='column'>
      <Hero />
      <Search />
    </Box>

    )
};
render(<App />);
