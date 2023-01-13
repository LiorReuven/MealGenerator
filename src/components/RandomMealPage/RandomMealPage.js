import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealSectionDesign from '../MealSectionDesign/MealSectionDesign';

import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';

export default function RandomMealPage() {
  const [showMeal, setShowMeal] = useState(false);
  const [seed, setSeed] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 15 }}
        >
          <Heading
            fontWeight={700}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Get a random recipe <br />
            <Text as={'span'} color={'orange.400'}>
              From a huge collection
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Struggle to choose what to eat? want to practice cooking different
            meals from different cultures? click the button to get a full
            overview, recipe and instructions of a random meal from anywhere in
            the world!
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              isLoading={isLoadingData ? true : false}
              onClick={() => {
                !showMeal ? setShowMeal(true) : setSeed(Math.random());
              }}
              colorScheme={'orange'}
              bg={'orange.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'orange.500',
              }}
            >
              Get meal
            </Button>
          </Stack>
        </Stack>
        {showMeal && (
          <MealSection
            seed={seed}
            isLoadingData={isLoadingData}
            setIsLoadingData={setIsLoadingData}
          />
        )}
      </Container>
    </>
  );
}

const MealSection = ({ seed, isLoadingData, setIsLoadingData }) => {
  const [ingredients, setIngredients] = useState();
  const [meal, setMeal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/1/random.php`
        );
        setMeal({ ...response.data.meals[0] });
        collectIngredients(response.data.meals[0]);
        console.log(response.data.meals[0]);
      } catch (error) {
        console.log('error', error);
      }
    };

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

    fetchData();
  }, [seed, setIsLoadingData]);

  return (
    <>
      {!isLoadingData && meal && (
        <MealSectionDesign
          mealTitle={meal.strMeal}
          mealImage={meal.strMealThumb}
          ingredients={ingredients}
          origin={meal.strArea}
          category={meal.strCategory}
          tags={meal.strTags}
          instructions={meal.strInstructions}
          video={meal.strYoutube}
        />
      )}
    </>
  );
};
