import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Box mr={30} {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Lior Reuven's recipe generator
      </Text>
    </Box>
  );
}
