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

// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//create a Three.js scene
const scene = new THREE.Scene();

//create a camera with position and angles
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 0);


//Create a control to move arround the object
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//3D object in a global variable to access it later
let burger;

//Orbicontrolls to move arround the object
let controls;

//Object to render
let objToRender = 'burger';

//Create a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file 
loader.load(
    //path to the file
    './src/3D/scene.gltf',
    //callback function
    function (gltf) {
        //save the object in the global variable
        burger = gltf.scene;
        //add the object to the scene
        scene.add(burger);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function () {
        console.log("An error happened");
    }
);

//Instantiate the renderer and set his size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha true to make the background transparent
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//set how far the camera will be from the object
camera.position.z = objToRender === 'burger' ? 25 : 500;

// Add light to see the model
const light = new THREE.DirectionalLight(0xffffff, 1.1);
light.position.set(0, 200, 0); //Top
light.castShadow = true; //Enable shadow
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
scene.add(ambientLight);

//Create a control to move arround the object
if (objToRender === 'burger') {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zoom on scroll
}
 
//  // usage:
//  rotateObject(burger, 40, 30, 20);

//Render the scene
function animate() {
    requestAnimationFrame(animate);
    if (burger) {
        burger.rotation.y += 0.0025;
    }
    renderer.render(scene, camera);
}


//Add a listener to the window to resize the renderer when the window is resized
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//Add a listener to the window to move the camera with the mouse
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//Start 3D rendering
animate();


//COMPTEUR BURGER----------------------------------------------------------------------------------------------------------------------------
// Sélectionnez l'élément contenant le nombre à incrémenter
const numberElement = document.querySelector('.number-interaction');

// Initialisez la variable du nombre initial
let number = 0;

// Fonction pour mettre à jour le nombre toutes les secondes
function updateNumber() {
    // Incrémentez le nombre de 42
    number += 1;
    // Mettez à jour le contenu de l'élément HTML avec le nouveau nombre
    numberElement.textContent = number;
}

// Appelez la fonction updateNumber une fois au chargement de la page pour afficher le nombre initial
updateNumber();

// Appelez la fonction updateNumber toutes les secondes (1000 millisecondes)
setInterval(updateNumber, 23);


//LOADING SCREEN ----------------------------------------------------------------------------------------------------------------------------
// Déclarez votre élément de préchargement avec un nom de variable différent
let preloader = document.querySelector('#preloader');
window.addEventListener('load', function () {
    // Utilisez la variable preloader pour masquer l'élément de chargement
    preloader.style.display = 'none';
});

