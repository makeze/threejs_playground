const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( cubeGeometry, material );
cube.position.set(0, 0, 50);
cube.castShadow = true;

const mapGeometry = new THREE.BoxGeometry(150, 150, 5);
const mapMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );
const gameMap = new THREE.Mesh( mapGeometry, mapMaterial );
gameMap.position.set(0, 0, -50);
gameMap.receiveShadow = true;

const ambientLight = new THREE.AmbientLight(0xFF0000, 0.25);
const directionalLight = new THREE.DirectionalLight(0xaa0000, 1);
directionalLight.position.set(0, 150, 400);
directionalLight.castShadow = true;

const aspectRatio = window.innerWidth / window.innerHeight;

//const camera = new THREE.PerspectiveCamera(20, aspectRatio, 60, 100)

const cameraWidth = 600;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraHeight / 2,
    cameraHeight / -2,
    0,
    1000
);
camera.position.set(50, 50, 50);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(cube);
scene.add(gameMap);

const renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//renderMap(cameraWidth, cameraHeight);
document.body.appendChild(renderer.domElement);