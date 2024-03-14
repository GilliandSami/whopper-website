import * as d3 from 'd3';

// 0.1 - Chargement des fichiers JSON & CSV

import nutritionData from './datas/bk_nutrition_menus.csv';
import categoriesData from './datas/bk_categories_menu.csv';
import locationsData from './datas/bk_locations_usa.csv';

import statisticsData from './datas/burger_king_statistics.json';
import countriesData from './datas/countries_population.json';
import factsData from './datas/fun_facts_whoppers.json';
import historicData from './datas/historic_whopper_variations.json';

// 0.2 - Affichage des données dans la console 
console.log(nutritionData); // - Tableau - 172 éléments
console.log(categoriesData); // - Tableau - 77 éléments
console.log(locationsData); // - Tableau - 7085 éléments

console.log(statisticsData); // - Objet - 10 blocs
console.log(countriesData); // - Tableau - 4 éléments
console.log(factsData); // - Tableau - 10 éléments
console.log(historicData); // - Tableau - 13 éléments