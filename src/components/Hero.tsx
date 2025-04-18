import { Box, Text } from "ink";
import React from "react";

const Hero = () => {
    return (
        <Box borderStyle={"round"} width={40} height={3}>
            <Box>
                <Text> ● Kaida </Text>
                <Text color={'gray'}>(development-stage) </Text>
                <Text color={"blue"}>v1.0.0</Text>
            </Box>
        </Box>
    )
}

export default Hero;