import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
import Stats from './three.js-master/examples/jsm/libs/stats.module.js';

const statsEnabled = true;

			let container, stats, loader, clock;

			let camera, scene, renderer, elf;

			let mesh;

			let spotLight;

			let mouseX = 0;
			let mouseY = 0;

			let targetX = 0;
			let targetY = 0;

			const windowHalfX = window.innerWidth / 2;
			const windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement('container');
				document.body.appendChild(container);

			  camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 1, 10000)
        camera.position.set(0,1,3)
        
        clock = new THREE.Clock();
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x060708 );


				// loading manager
				const loadingManager = new THREE.LoadingManager( function () {

					scene.add( elf );

				} );

				// LIGHTS

				scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

				spotLight = new THREE.SpotLight( 0xffffbb, 2 );
				spotLight.position.set( 0.5, 0, 1 );
				spotLight.position.multiplyScalar( 700 );
				scene.add( spotLight );

				spotLight.castShadow = true;

				spotLight.shadow.mapSize.width = 2048;
				spotLight.shadow.mapSize.height = 2048;

				spotLight.shadow.camera.near = 200;
				spotLight.shadow.camera.far = 1500;

				spotLight.shadow.camera.fov = 40;

				spotLight.shadow.bias = - 0.005;

        const mapHeight = new THREE.TextureLoader().load( "assets/texture01.png" );
        // const mapHeight2 = new THREE.TextureLoader().load( "assets/texture02.png" );

				const material = new THREE.MeshPhongMaterial( {
					color: 0x552811,
					specular: 0x222222,
					shininess: 25,
					bumpMap: mapHeight,
					bumpScale: 12
				} );

                  // ADD O ARQUIVO GLB 
          loader = new GLTFLoader()
          loader.load('assets/my--avatar.glb', function(glb){
              createScene(glb.scene.children[ 0 ].geometry, 100, material );
              
              const children = glb.scene;
              children.scale.set(0.2, 0.2, 0.2)
              scene.add(children);
              elf = glb.scene;
          })


				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.shadowMap.enabled = true;
				renderer.outputEncoding = THREE.sRGBEncoding;

				//

				if ( statsEnabled ) {

					stats = new Stats();
					container.appendChild( stats.dom );

				}

				// EVENTS

				document.addEventListener( 'mousemove', onDocumentMouseMove );
				window.addEventListener( 'resize', onWindowResize );

			}

			function createScene( geometry, scale, material) {

				mesh = new THREE.Mesh( geometry, material );

				mesh.position.y = - 50;
				mesh.scale.set( scale, scale, scale );

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				scene.add( mesh );

			}

			//

			function onWindowResize() {

				renderer.setSize( window.innerWidth, window.innerHeight );
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}
 
			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				if ( statsEnabled ) 
        stats.update();

			}

			function render() {

				targetX = mouseX * .001;
				targetY = mouseY * .001;

				if ( mesh ) {

					mesh.rotation.y += 0.05 * ( targetX - mesh.rotation.y );
					mesh.rotation.x += 0.05 * ( targetY - mesh.rotation.x );

				}

        const delta = clock.getDelta();

				if ( elf !== undefined ) {

					elf.rotation.z += delta * 0.5;

				}

				renderer.render( scene, camera );

			}
// init();
// animate();

// function init () {
//   container = document.createElement( 'div' );
// 	document.body.appendChild( container );
// }

// // CRIANDO A CENA
// const canvas = document.querySelector('.webgl')
// const scene = new THREE.Scene()


// // CRIAR LUZ NA CENA
// const light = new THREE.SpotLight()
// light.position.set(5, 5, 5)
// // scene.add(light)

// // COR DO FUNDO
// scene.background = new THREE.Scene();

// // ILUMINAÇÃO AVATAR
// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
// hemiLight.color.setHSL( 0.6, 1, 0.6 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
// hemiLight.position.set( 0, 50, 0 );
// scene.add( light );

// const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
// scene.add( hemiLightHelper );
// // FIM ILUMINAÇÃO AVATAR


// const dirLight = new THREE.DirectionalLight();
// dirLight.color.setHSL( 0.1, 1, 0.95 );
// dirLight.position.set( - 1, 1.75, 1 );
// dirLight.position.multiplyScalar( 30 );
// scene.add(dirLight);

// dirLight.castShadow = true;

// dirLight.shadow.mapSize.width = 2048;
// dirLight.shadow.mapSize.height = 2048;

// const d = 50;

// dirLight.shadow.camera.left = - d;
// dirLight.shadow.camera.right = d;
// dirLight.shadow.camera.top = d;
// dirLight.shadow.camera.bottom = - d;

// dirLight.shadow.camera.far = 3500;
// dirLight.shadow.bias = - 0.0001;

// const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
// scene.add( dirLightHelper );


// //Boiler Plate Code 
// const sizes = {
//   width: window.innerWidth, 
//   height: window.innerHeight
// }

// const camera = new THREE.PerspectiveCamera( 75, sizes.width/sizes.height, 0.1, 100)
// camera.position.set(0,1,3)
// scene.add(camera)

// // RENDER
// const renderer = new THREE.WebGL1Renderer ({
//   canvas : canvas,
//   alpha: true
// })

// renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.shadowMap.enabled = true 
// renderer.gammaOutput = true 
// renderer.render(scene, camera)


// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true


// //código que irá redimensionar a tela para corresponder o tamanho de exibição
// function resizeCanvasToDisplaySize() {
//   const canvas = renderer.domElement;
//   const width = canvas.clientWidth;
//   const height = canvas.clientHeight;
//   if (canvas.width !== width ||canvas.height !== height) {
//     // you must pass false here or three.js sadly fights the browser
//     renderer.setSize(width, height, true);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//     // set render target sizes here
//   }
// }
// // ADD O ARQUIVO GLB 
// const loader = new GLTFLoader()
// loader.load('assets/my--avatar.glb', function(glb){
//     console.log(glb)
//     const root = glb.scene;
//     root.scale.set(0.2, 0.2, 0.2)

//     scene.add(root);
// }, function(xhr){
//     console.log((xhr.loaded/xhr.total * 100) + "% loaded")
// }, function(error){
//     console.log('An error occurred')
// })


// function animate (){
//   requestAnimationFrame(animate)
//   renderer.render(scene, camera)
// }
// animate()