import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
import Stats from './three.js-master/examples/jsm/libs/stats.module.js';

const statsEnabled = true;

		let container, stats, loader, clock;

		let camera, scene, renderer, elf, mesh;

		let spotLight;

		let mouseX = 0;
		let mouseY = 0;

		let targetX = 0;
		let targetY = 0;

		const windowHalfX = window.innerWidth;
		const windowHalfY = window.innerHeight;

			init();
			animate();

			function init() {

				container = document.getElementById('container');
				// document.body.appendChild(container);

			  camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 5;
				// camera.lookAt( 0, 0, 0);
        
        clock = new THREE.Clock();
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x060708 );


				// loading manager
				const loadingManager = new THREE.LoadingManager( function () {

					scene.add(elf);

				} );

				// LIGHTS

				scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

				spotLight = new THREE.SpotLight( 0xffffbb );
				spotLight.position.set(1,1,1);
				spotLight.position.multiplyScalar( 100 );
				scene.add( spotLight );
				

				spotLight.castShadow = true;
				
				spotLight.shadow.camera.near = 1000;
				spotLight.shadow.camera.far = 1000;

				spotLight.shadow.camera.fov = 40;

				spotLight.shadow.bias = - 0.005;

                  // ADD O ARQUIVO GLB 
          loader = new GLTFLoader(loadingManager)
          loader.load('assets/my--avatar.glb', function(glb){
              createScene(glb.scene.mesh );
              createScene(glb.scene.elf );
              mesh = glb.scene;
              elf = glb.scene;
              mesh.scale.set(0.2, 0.2, 0.2)
              scene.add(mesh);
							scene.add(elf);
          })


				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				renderer.shadowMap.enabled = true;
				renderer.outputEncoding = THREE.sRGBEncoding;

				//

				// if ( statsEnabled ) {

					stats = new Stats();
					container.appendChild( stats.dom );

			// }

				// EVENTS

				window.addEventListener( 'mousemove', onWindowMouseMove );
				window.addEventListener( 'resize', onWindowResize);

			}

      const controls = new OrbitControls(camera, renderer.domElement)
			controls.enableDamping = false
			controls.enableZoom= false
			controls.enablePan= false
			controls.dampingFactor= false
			controls.minDistance= 4
			controls.maxDistance= 5
			controls.autoRotate = false
			// 		controls.zoomSpeed= 10
			// 		controls.autoRotateSpeed= 0.5
			// 		controls.rotateSpeed= -1.4

			function createScene( geometry, scale ) {

				mesh = new THREE.Mesh( geometry );

				mesh.position.y = -50;
				mesh.scale.set( scale );

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
 
			function onWindowMouseMove( event ) {

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

				targetX = mouseX * 0.001;
				targetY = mouseY * 0.0001;

				if ( mesh ) {

					mesh.rotation.y += 0.08 * ( targetX - mesh.rotation.y );
					mesh.rotation.x += 0.08 * ( targetY - mesh.rotation.x );

				}

        const delta = clock.getDelta();

				if ( elf !== undefined ) {

					elf.rotation.y += delta * 0.1;

				}

				renderer.render( scene, camera );

			}