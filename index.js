import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
import Stats from './three.js-master/examples/jsm/libs/stats.module.js';

	const statsEnabled = true;

	let container, stats, loader, clock;

	let camera, scene, renderer, mousemove, autoRotate;

	let spotLight;

	let mouseX = 0;
	let mouseY = 0;

	let targetX = 0;
	let targetY = 0;

	// let autoRotate = null;
	// let mousemove = null;

	const windowHalfX = window.innerWidth / 2;
	const windowHalfY = window.innerHeight / 2;

	init();
	animate();

	function init() {

		container = document.getElementById('container');
		// document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera( 75,  window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(1, 1, 4);
		camera.lookAt( 0, 3, 0 );
        
    // clock = new THREE.Clock();
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x060708 );
		clock = new THREE.Clock();

				                  // ADD O ARQUIVO GLB 
    loader = new GLTFLoader()
    loader.load('assets/my--avatar.glb', function(glb) {
				mousemove = glb.scene;
				autoRotate = glb.scene;
        mousemove.scale.set(0.2, 0.2, 0.2)
				autoRotate.scale.set(0.2, 0.2, 0.2)
        scene.add(mousemove);
				scene.add(autoRotate);
      
			});
				// LIGHTS

		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

		spotLight = new THREE.SpotLight( 0xffffbb, 2 );
		spotLight.position.set( 5,5,5);
		spotLight.position.multiplyScalar( 700 );
		scene.add( spotLight );
				

		spotLight.castShadow = true;

		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;

		spotLight.shadow.camera.near = 200;
		spotLight.shadow.camera.far = 1500;

		spotLight.shadow.camera.fov = 40;

		spotLight.shadow.bias = - 0.005;
		
		//

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		renderer.shadowMap.enabled = true;
		renderer.outputEncoding = THREE.sRGBEncoding;

		//
					
		stats = new Stats();
		container.appendChild( stats.dom );
				
		//

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = false
		controls.enableZoom= true
		controls.enablePan= true
		controls.dampingFactor= false
		controls.minDistance= 4
		controls.maxDistance= 5
		// controls.autoRotate
		// 		controls.zoomSpeed= 10
		// 		controls.autoRotateSpeed= 0.5
		// 		controls.rotateSpeed= -1.4

				// if ( statsEnabled ) {

						
}

							// EVENTS
				// resize = redimensionar  
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
				
		renderer.setSize( window.innerWidth, window.innerHeight );
}

		autoRotate = true;
		mousemove = true;

		// const autoRotate = autoRotate;
		// const mousemove = mousemove;

		window.addEventListener( 'resize', onWindowResize );
		window.addEventListener( 'mousemove', onWindowMouseMove);
		window.addEventListener( 'autoRotate', onWindowAutoRotate);


	function onWindowAutoRotate (event) {

		autoRotate = true;
		mousemove = false;
		console.log("Auto Rotate");

		mouseX = ( event.clientX - windowHalfX );
		mouseY = ( event.clientY - windowHalfY );

	}

	function onWindowMouseMove(event) {
		autoRotate = false;
		mousemove = true;
		console.log("Mouse Move");

		mouseX = ( event.clientX - windowHalfX );
		mouseY = ( event.clientY - windowHalfY );
		
	}
			//
	function animate() {
		
		requestAnimationFrame( animate );
		render();
		// stats.update();
		
	}

	function render() {

		const delta = clock.getDelta();

		targetX = mouseX * .001;
		targetY = mouseY * .001;

		if ( autoRotate ) {	
				autoRotate.rotation.y += delta * 0.5;
}
		if (mousemove ) {
				mousemove.rotation.y += delta * 0.0;
}
//
		if ( mousemove ) {
				mousemove.rotation.y += 0.25 *  ( targetX - mousemove.rotation.y );
				mousemove.rotation.x += 0.25 *  ( targetY - mousemove.rotation.x );
		} else {
				mousemove.rotation.y += 0.0;
}
		//
		renderer.render( scene, camera );
};
