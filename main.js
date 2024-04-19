import { make3DBurger } from "./3d-viewport.js";
import { countBurgers } from './burgers-count.js';
import { GenerateLoadFood, extractFoodPairings } from './best-seller-viewport.js';
import { generateIngredientsList } from "./ingredients-viewport.js";

// 0.1 - Chargement des fichiers JSON & CSV

import nutritionData from './datas/bk_nutrition_menus.csv';
import categoriesData from './datas/bk_categories_menu.csv';
import locationsData from './datas/bk_locations_usa.csv';

import countriesData from './datas/countries_population.json';
import factsData from './datas/fun_facts_whoppers.json';
import historicData from './datas/historic_whopper_variations.json';

// 0.2 - Affichage des données dans la console 
console.log(nutritionData); // - Tableau - 172 éléments
console.log(categoriesData); // - Tableau - 77 éléments
console.log(locationsData); // - Tableau - 7085 éléments

console.log(countriesData); // - Tableau - 4 éléments
console.log(factsData); // - Tableau - 10 éléments
console.log(historicData); // - Tableau - 13 éléments

// LOADING SCREEN ----------------------------------------------------------------------------------------------------------------------------

let preloader = document.querySelector('#preloader');
window.addEventListener('load', function () {
    preloader.style.display = 'none';
});

// Premier Viewport - Burger 3D ----------------------------------------------------------------------------------------------------------------------------

make3DBurger();

//COMPTEUR BURGER----------------------------------------------------------------------------------------------------------------------------

countBurgers();

// Second Viewport - Best Seller Section -----------------------------------------------------------------------------------------------------------

GenerateLoadFood();

// Troisième ViewPort - Ingrédients ------------------------------------------------------------------------------------------------------------------------------------------------------------

generateIngredientsList();

// Quatrième ViewPort - Pays ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ...

// Cinquième ViewPort - Dashboard ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ...