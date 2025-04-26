import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Text } from 'ink';

export interface LoadingBarHandle {
  /**
   * Update the progress percentage (0-100)
   */
  setProgress: (percent: number) => void;
}

export interface LoadingBarProps {
  /**
   * Width of the progress bar in characters
   * @default 20
   */
  width?: number;
}

/**
 * A stateful Ink progress bar component.
 * Use the imperative handle to update its progress.
 * 
 * ```tsx
 * const barRef = useRef<LoadingBarHandle>(null);
 * 
 * // Later, trigger updates:
 * barRef.current?.setProgress(50);
 * ```
 */
const LoadingBar = forwardRef<LoadingBarHandle, LoadingBarProps>(
  ({ width = 20 }, ref) => {
    const [progress, setProgress] = useState(0);

    // Expose the setProgress method to parent via ref
    useImperativeHandle(ref, () => ({
      setProgress: (percent: number) => {
        // Clamp to [0,100]
        const clamped = Math.max(0, Math.min(100, percent));
        setProgress(clamped);
      },
    }), []);

    // Build the bar display
    const fillCount = Math.round((progress / 100) * width);
    const emptyCount = width - fillCount;
    const fill = '█'.repeat(fillCount);
    const empty = ' '.repeat(emptyCount);

    return (
      <Box>
        <Text>[</Text>
        <Text>{fill}{empty}</Text>
        <Text>]</Text>
        <Text> {progress.toFixed(0)}%</Text>
      </Box>
    );
  }
);

export default LoadingBar;
