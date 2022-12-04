import React, {  useState } from 'react';
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
} from '@chakra-ui/react';

import SearchCard from './SearchCard';
import MealSectionDesign from '../MealSectionDesign/MealSectionDesign';

const MealSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [meals, setMeals] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [chosenMeal, setChosenMeal] = useState({})
  const [ingredients, setIngredients] = useState([]);


  const collectIngredients = (fetchedMeal) => {
    const array = [];
    for (let i = 1; i <= 30; i++) {
      if (fetchedMeal[`strIngredient${i}`]) {
        array.push(
          `${fetchedMeal[`strIngredient${i}`]} - ${
            fetchedMeal[`strMeasure${i}`]
          }`
        );
      } else {
        break;
      }
      setIngredients([...array]);
      setIsLoadingData(false);
    }
  };




  const onClickHandler = (meal) => {
    setShowSearch(false)
    setIsLoadingData(true)
    setChosenMeal({...meal})
    collectIngredients(meal)
  }


  const submitHandler = async(e) => {
    e.preventDefault();
    if (!searchValue.match(/^[A-Za-z]+$/)) {
      setError('You may only type letters!(no numbers/special symbols allowed)')
      return
    } 
    setMeals([])
    setShowSearch(true)
    setIsLoadingData(true)
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      if (!response.data.meals) {
        setError('No matches found')
      } else {
        setError(false)
        setMeals([...response.data.meals])
      }
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
                  required
                   type='text'
                    variant={'solid'}
                    borderWidth={1}
                    color={'gray.800'}
                    _placeholder={{
                      color: 'gray.400',
                    }}
                    borderColor={useColorModeValue('gray.300', 'gray.700')}
                    bg={useColorModeValue('gray.200', 'white')}
                    onChange={(e) => {
                      setSearchValue(e.target.value)
                    }}
                  />
                </FormControl>
                <Button
                isLoading={isLoadingData ? true : false}
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
            ? error
            : "enter the meal's name or a portion of it"}
        </Text>
            </Container>
          </Flex>
        </Stack>
        {!isLoadingData && meals && showSearch ? meals.map((meal, index) => {
          return (
            <SearchCard onClickFunc={onClickHandler} key={index} meal={meal} ></SearchCard>
          )
        }) : !isLoadingData && chosenMeal &&
        <MealSectionDesign
          mealTitle={chosenMeal.strMeal}
          mealImage={chosenMeal.strMealThumb}
          ingredients={ingredients}
          origin={chosenMeal.strArea}
          category={chosenMeal.strCategory}
          tags={chosenMeal.strTags}
          instructions={chosenMeal.strInstructions}
          video={chosenMeal.strYoutube}
        />
        }
      </Container>
    </>
  );
};

export default MealSearch;
