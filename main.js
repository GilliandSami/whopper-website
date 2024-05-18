import { make3DBurger } from "./scripts/3d-viewport.js";
import { countBurgers, setupCounterAnimation, setupCaloriesAnimation, setupHandWhopperAnimation } from './scripts/burgers-count.js';
import { GenerateLoadFood, extractFoodPairings } from './scripts/best-seller-viewport.js';
import { generateIngredientsBubbleChart } from "./scripts/ingredients-viewport.js";
import { initializeDashboard } from "./scripts/dashboard-viewport.js";
import { drawPoints } from "./scripts/countries-viewport.js";

// 0.1 - Chargement des fichiers JSON & CSV - Au cas ou...

import nutritionData from './datas/bk_nutrition_menus.csv';
import categoriesData from './datas/bk_categories_menu.csv';
import locationsData from './datas/bk_locations_usa.csv';

import countriesData from './datas/countries_population.json';
import factsData from './datas/fun_facts_whoppers.json';
import historicData from './datas/historic_whopper_variations.json';


// LOADING SCREEN ----------------------------------------------------------------------------------------------------------------------------

let preloader = document.querySelector('#preloader');
window.addEventListener('load', function () {
    preloader.style.display = 'none';
});

// Premier Viewport - Burger 3D ----------------------------------------------------------------------------------------------------------------------------

make3DBurger();

// Autres Viewports - Animations internes simples ----------------------------------------------------------------------------------------------------------------------------

countBurgers();
document.addEventListener('DOMContentLoaded', setupCounterAnimation);
document.addEventListener('DOMContentLoaded', setupCaloriesAnimation);
document.addEventListener('DOMContentLoaded', setupHandWhopperAnimation);

// Second Viewport - Best Seller Section -----------------------------------------------------------------------------------------------------------

GenerateLoadFood();

// Troisième ViewPort - Ingrédients ------------------------------------------------------------------------------------------------------------------------------------------------------------

generateIngredientsBubbleChart();

// Quatrième ViewPort - Pays ------------------------------------------------------------------------------------------------------------------------------------------------------------

drawPoints();

// Cinquième ViewPort - Dashboard ------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});
