import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

const Loader = () => {
    const [wheel, setWheel] = useState<string>('-');
    
    useEffect(() => {
      const interval = setInterval(() => {
        setWheel(prevWheel => {
          switch (prevWheel) {
            case '-':
              return '\\'
            case '\\':
              return '|';
            case '|':
              return '/';
            case '/':
              return '-';
            default:
              return '-';
          }
        });
      }, 200); // Update the spinner every 100ms
  
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    return <Text>{wheel}</Text>
  };
  

export default Loader;
