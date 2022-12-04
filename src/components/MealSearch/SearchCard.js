import { Box, Container, Flex, Image, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';

const SearchCard = ({image, mealName}) => {
  return (
    <Container cursor='pointer' _hover={{bg: 'orange.400'}} bg={useColorModeValue('gray.600', 'gray.300')} rounded='md' boxShadow='dark lg' my='10px' maxW='500px' maxH='150px'>
    <Box
      display='flex'
      height='150px'
      textAlign={'center'}
      spacing={{ base: 8, md: 14 }}
      borderRadius='20px'
      p={{ base: 10, md: 15 }}
    >
      <Image src={image} alt={mealName}></Image>
      <Text fontSize='20px' ml='10px' width='100%' justifySelf='center' alignSelf='center' color={useColorModeValue('white', 'black')}>
        {mealName}
      </Text>
    </Box>
    </Container>
  );
};

export default SearchCard;
