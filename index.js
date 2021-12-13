import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// CRIANDO A CENA
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()


// CRIAR LUZ NA CENA
const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
// scene.add(light)

// COR DO FUNDO
scene.background = new THREE.Scene();

// ILUMINAÇÃO AVATAR
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( light );

const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );
// FIM ILUMINAÇÃO AVATAR


const dirLight = new THREE.DirectionalLight();
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
scene.add( dirLightHelper );


//Boiler Plate Code 
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,3)
scene.add(camera)

// RENDER
const renderer = new THREE.WebGL1Renderer ({
  canvas : canvas,
  alpha: true
})

renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true 
renderer.gammaOutput = true 
renderer.render(scene, camera)





//código que irá redimensionar a tela para corresponder o tamanho de exibição
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, true);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // set render target sizes here
  }
}
// ADD O ARQUIVO GLB 
const loader = new GLTFLoader()
loader.load('assets/my--avatar.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.2, 0.2, 0.2)

    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('An error occurred')
})


function animate (){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()