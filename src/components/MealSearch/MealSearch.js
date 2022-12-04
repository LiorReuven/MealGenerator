import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Flex,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';
import SearchCard from './SearchCard';

const MealSearch = () => {
  const [searchValue, setSearchValu] = useState('');
  const [error, setError] = useState(false);
  const [meals, setMeals] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)


  const submitHandler = async(e) => {
    e.preventDefault();
    setIsLoadingData(true)
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      setMeals([...response.data.meals])
    } catch (error) {
      console.log('error', error);
    }

    setIsLoadingData(false)

  }

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 15 }}
        >
          <Flex align={'center'} justify={'center'}>
            <Container
              maxW={'lg'}
              bg={useColorModeValue('white', 'whiteAlpha.100')}
              boxShadow={'xl'}
              rounded={'lg'}
              p={6}
              direction={'column'}
              border="1px solid black"
            >
              <Heading
                as={'h2'}
                fontSize={{ base: 'xl', sm: '2xl' }}
                textAlign={'center'}
                mb={5}
              >
                Search a meal by name
              </Heading>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                as={'form'}
                spacing={'12px'}
                autoComplete="off"
                onSubmit={submitHandler}
              >
                <FormControl>
                  <Input
                    variant={'solid'}
                    borderWidth={1}
                    color={'gray.800'}
                    _placeholder={{
                      color: 'gray.400',
                    }}
                    borderColor={useColorModeValue('gray.300', 'gray.700')}
                    required
                    bg={useColorModeValue('gray.200', 'white')}
                    onChange={(e) => {
                      setSearchValu(e.target.value)
                    }}
                  />
                </FormControl>
                <Button
                  color={useColorModeValue('white', 'black')}
                  bg="orange.400"
                  type="submit"
                >
                  Search
                </Button>
              </Stack>
              <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Oh no an error occured! 😢 Please try again later.'
            : "enter the meal's name or a portion of it"}
        </Text>
            </Container>
          </Flex>
        </Stack>
        {!isLoadingData && meals && meals.map((meal, index) => {
          return (
            <SearchCard key={index} image={meal.strMealThumb} mealName={meal.strMeal} ></SearchCard>
          )
        }) }
      </Container>
    </>
  );
};

export default MealSearch;
