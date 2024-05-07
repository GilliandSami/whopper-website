import { make3DBurger } from "./3d-viewport.js";
import { countBurgers, setupCounterAnimation, setupCaloriesAnimation, setupHandWhopperAnimation } from './burgers-count.js';
import { GenerateLoadFood, extractFoodPairings } from './best-seller-viewport.js';
// import { generateIngredientsList } from "./ingredients-viewport.js";
import { generateIngredientsBubbleChart } from "./ingredients-viewport.js";
import { initializeDashboard } from "./dashboard-viewport.js";
import { drawPoints } from "./countries-viewport.js";

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
document.addEventListener('DOMContentLoaded', setupCounterAnimation);
document.addEventListener('DOMContentLoaded', setupCaloriesAnimation);
document.addEventListener('DOMContentLoaded', setupHandWhopperAnimation);

// Second Viewport - Best Seller Section -----------------------------------------------------------------------------------------------------------

GenerateLoadFood();

// Troisième ViewPort - Ingrédients ------------------------------------------------------------------------------------------------------------------------------------------------------------

// generateIngredientsList();
generateIngredientsBubbleChart();

// Quatrième ViewPort - Pays ------------------------------------------------------------------------------------------------------------------------------------------------------------

drawPoints();

// Cinquième ViewPort - Dashboard ------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

// Jukebox tutututu------------------------------------------------------------------------------------------------------------------------------------------------------------

// var stream_url_mp3 = "";
// var stream_url_ogg = "";
// var stream_total_time = 100;
// var stream_start_time = Math.floor(Math.random() * stream_total_time);
// var daJukebox = document.createElement('audio');

// if (daJukebox.canPlayType) {

//     if ("" != daJukebox.canPlayType('audio/mpeg')) {
//         daJukebox.src = stream_url_mp3;
//     } else if ("" != myAudio.canPlayType('audio/ogg; codecs="vorbis"')) {
//         daJukebox.src = stream_url_ogg;
//     }

//     daJukebox.preload = true;
//     daJukebox.autobuffer = true;
//     daJukebox.pause();
//     daJukebox.currentTime = stream_start_time;
//     daJukebox.play();
// }