import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

function make3DBurger() {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 12, 0);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let burger;
    let controls;
    let objToRender = 'burger';

    const loader = new GLTFLoader();

    loader.load(
        './src/3D/scene.gltf',
        function (gltf) {
            burger = gltf.scene;
            scene.add(burger);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function () {
            console.log("An error happened");
        }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha true to make the background transparent
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("container3D").appendChild(renderer.domElement);

    camera.position.z = objToRender === 'burger' ? 25 : 500;

    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(0, 200, 0);
    light.castShadow = true;
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    if (objToRender === 'burger') {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
    }

    function animate() {
        requestAnimationFrame(animate);
        if (burger) {
            burger.rotation.y += 0.0025;
        }
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    animate();
}

export { make3DBurger };