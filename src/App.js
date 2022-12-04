import React from "react";
import { Route, Routes} from 'react-router-dom';
import RandomMealPage from "./components/RandomMealPage/RandomMealPage";
import MealSearch from "./components/MealSearch/MealSearch";
import MainNavigation from "./components/Layout/MainNavigation";



function App() {
  return (
<>
<MainNavigation></MainNavigation>
<Routes>
<Route path="/" element={<RandomMealPage/>}/>
<Route path="mealSearch" element={<MealSearch/>}/>
</Routes>
</>
  );
}

export default App;
