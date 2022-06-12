import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader'

const scene = new THREE.Scene(); //Creating 3d scene

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 5000); //camera to show obj on scene
camera.rotation.y = 45 / 180 * Math.PI; //rot rate
camera.position.x = 800;
camera.position.y = 80;
camera.position.z = 800;

//light section (directional method)

const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
const light = new THREE.PointLight(0xc4c4c4, 10);
light.position.set(0, 300, 500);
scene.add(light);
const light2 = new THREE.PointLight(0xc4c4c4, 10);
light2.position.set(500, 100, 0);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4, 10);
light3.position.set(0, 100, -500);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4, 10);
light4.position.set(-500, 300, 500);
scene.add(light4);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //where to render our obj
renderer.setSize(window.innerWidth / 2.5, window.innerHeight / 2.5);
renderer.outputEncoding = THREE.sRGBEncoding;
$('.model-hub').append(renderer.domElement);

//texturing if possible:

let meshLoader = new GLTFLoader();

let meshScene;

meshLoader.load('/javascripts/test/stylized-graveyard/stylized-graveyard.gltf', function (gltf) {
    meshScene = gltf.scene.children[0];
    meshScene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
    animate();
});

function animate() {
    renderer.render(scene, camera);
    meshScene.rotation.z += 0.01;
    requestAnimationFrame(animate);
}