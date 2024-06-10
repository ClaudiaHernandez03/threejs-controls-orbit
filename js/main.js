import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop

function init() {

    scene = new THREE.Scene();

    console.log(scene);
    scene.background = new THREE.Color(0xedadd4);
    scene.fog = new THREE.FogExp2(0xa5faf8, 0.002);


/* El antialias refina el dibujo 3D */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    /* El setPixelRatio Coloca el tamaño del pixel con respecto al pixel de la pantalla */
    renderer.setPixelRatio(window.devicePixelRatio);
    /* Define el tamaña de la pantalla con respecto al pixel */
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    /* Amortigua el movimiento de la camara */
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    /* Hace que el dezplazamiento sea mas lento */
    controls.dampingFactor = 0.05;
    /* Permite que se desplaze en el plano*/
    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xde1fb8, flatShading: true });

    for (let i = 0; i < 1000; i++) {

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);

    }

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}