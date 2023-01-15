import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RandomMealPage from './components/RandomMealPage/RandomMealPage';
import MealSearch from './components/MealSearch/MealSearch';
import MainNavigation from './components/Layout/MainNavigation';

function App() {
  if (process.env.NODE_ENV === 'production')
    console.log = function no_console() {};

  return (
    <>
      <MainNavigation></MainNavigation>
      <Routes>
        <Route path="MealGenerator" element={<RandomMealPage />} />
        <Route path="mealSearch" element={<MealSearch />} />
      </Routes>
    </>
  );
}

export default App;
