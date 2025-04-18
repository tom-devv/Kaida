import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';

type LoaderProps = {
  pretext: string;
}

const Loader: React.FC<LoaderProps> = ({pretext}) => {
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
  
    return (
        <Text>{pretext} {wheel}</Text>
  )
  };
  

export default Loader;
