var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

var parametrosGUI = {};
var animationFolder;

var elementos = [];

var ground;
var geometriaA;

var lights = [];

var wolfVelocity = 0.05;

//variaveis para animação
var mixer;
var modelReady = false;
var animationActions = Array();
var activeAction;
var lastAction;
var loadFinished;
var clock = new THREE.Clock();


//Var para add a camera com o lobo
var char;

var charBounding;
var charHelper;

var staticBounding = [];

var objLoading = function () {
	loader = new THREE.OBJLoader();
	let objLoader = new THREE.OBJLoader();
	let loaderFBX = new THREE.FBXLoader();

	let textureLoad = new THREE.TextureLoader();
	let ferrariTexture = textureLoad.load("assets/ferrari-f1/fe0_main.png");
	let wheelTexture = textureLoad.load("assets/ferrari-f1/pneu.jpg");
	let genericTexture = textureLoad.load("assets/ferrari-f1/generic_main.png");

	loaderFBX.load(
		'assets/pikachu/pika.fbx',
		function (obj) {
			elementos['pika'] = obj;

			let animation;

			mixer = new THREE.AnimationMixer(obj);

			animation = mixer.clipAction(obj.animations[0]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[1]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[2]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[3]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[4]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[5]);
			animationActions.push(animation);

			activeAction = animation;

			//adiciona as animações a GUI
			animationFolder.add(parametrosGUI, "Tchauzinho");
			animationFolder.add(parametrosGUI, "Feliz");
			animationFolder.add(parametrosGUI, "Correndo");
			animationFolder.add(parametrosGUI, "Parado");
			animationFolder.add(parametrosGUI, "Comemorando");
			animationFolder.add(parametrosGUI, "Fazendo Gracinha");


			obj.scale.y = 0.009;
			obj.scale.z = 0.009;
			obj.scale.x = 0.009;

			obj.position.y = -4.8;
			obj.position.x = 0;
			obj.position.z = -12;

			scene.add(obj);

			let objBox = new THREE.Box3().setFromObject(obj.children[0]);
			staticBounding.push(objBox);
			loadFinished = true;
		},
	);

	objLoader.load(
		'assets/ferrari-f1/ferrari-f1.obj',
		function (obj) {
			let car = obj;

			car.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.castShadow = true;
					if (child.name == 'Plane') {
						child.visible = false;
					} else if (child.name == 'Wheel_Plates' || child.name == 'Treads') {
						child.material.map = wheelTexture;
					} else if (child.name == 'Generic') {
						child.material.map = genericTexture;
					} else {
						child.material.map = ferrariTexture;
					}

					child.material.shininess = 0;
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			obj.scale.y = 8;
			obj.scale.z = 8;
			obj.scale.x = 8;

			obj.position.y = -7.7;
			obj.position.x = 0;
			obj.position.z = -20;

			scene.add(obj);
		},
	);

};

var sound

const inicializeSound = function () {
	// create an AudioListener and add it to the camera
	const listener = new THREE.AudioListener();
	camera.add(listener);

	// create a global audio source
	sound = new THREE.Audio(listener);

	// load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('assets/music.mp3', function (buffer) {
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.3);
		loadedSound = true
	});
}


//troca a ação do nosso modelo
const setAction = function (toAction) {
	console.log(lastAction);
	lastAction = activeAction;
	activeAction = toAction;
	lastAction.stop();
	activeAction.reset();
	activeAction.play();
}

var ambientLightOn = function () {
	lights['ambient'] = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(lights['ambient']);
}

var hemisphereLightOn = function () {
	lights['hemisphere'] = new THREE.HemisphereLight(0xcce0ff, 0xffffff, 1);
	scene.add(lights['hemisphere']);
}

var directionalLightOn = function () {
	let light = new THREE.DirectionalLight(0xffffff, 1);
	light.castShadow = true;
	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;
	light.shadow.camera.left = 1000;
	light.shadow.camera.bottom = 1000;
	light.shadow.camera.right = -1000
	light.shadow.camera.top = -1000;

	light.position.y = 200;
	light.position.x = 100;
	light.target = ground;


	scene.add(light);
	scene.add(light.target)

	lights['directional'] = light;
}

var spotLightOn = function () {
	let spot = new THREE.SpotLight(0xffffff, 0);
	spot.angle = 0.3;
	spot.castShadow = true;

	spot.position.z = 40;
	spot.position.y = 15;

	spot.shadow.distance = 20;
	spot.shadow.penumbra = 30;
	spot.shadow.angle = 25;

	spot.target.position.set(0, 5, 0);

	lights['spot'] = spot;
	scene.add(spot);
}

var pointLightOn = function () {
	let point = new THREE.PointLight(0xffffff, 3, 200);
	lights['point'] = point;
	point.castShadow = true;
	point.position.y = 10;
	point.position.z = 10;

	scene.add(point);
}

var godSaysLightsOn = function () {
	directionalLightOn();
	ambientLightOn();
}


var createGui = function () {
	const gui = new dat.GUI();


	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		ambientLight: 1,
		sunLight: 1,

		skyColor: "#000000",
		groundColor: "#006400",

		geometrias: "",
		modelGui: "",

		"Tchauzinho": function () {
			console.log(sound);
			sound.isPlaying && sound.stop()
			setAction(animationActions[4]);
			wolfVelocity = 0.05;
		},
		"Feliz": function () {
			sound.isPlaying && sound.stop()
			setAction(animationActions[2]);
			wolfVelocity = 0.2;
		},
		"Correndo": function () {
			sound.isPlaying && sound.stop()
			setAction(animationActions[0])
		},
		"Parado": function () {
			sound.isPlaying && sound.stop()
			setAction(animationActions[1])
		},
		"Comemorando": function () {
			sound.setVolume(50 / 100)
			sound.play()
			setAction(animationActions[3])
		},
		"Fazendo Gracinha": function () {
			sound.isPlaying && sound.stop()
			setAction(animationActions[5])
		},
	};

	let intensidadeLuz = gui.add(parametrosGUI, 'ambientLight').min(0).max(2).step(0.1).name("Ambient Light");
	intensidadeLuz.onChange(function (parametro) {
		lights['ambient'].intensity = parametro;
	}
	);

	let sunLight = gui.add(parametrosGUI, 'sunLight').min(0).max(2).step(0.1).name("Sun Light");
	sunLight.onChange(function (parametro) {
		lights['directional'].intensity = parametro;
	}
	);
	let folderPosition = gui.addFolder("Position");

	let positionX = folderPosition.add(parametrosGUI, 'positionX').min(0).max(600).step(15).name("Position X");
	positionX.onChange(function (parametro) {
		lights['directional'].position.x = parametro;
	}
	);
	let positionY = folderPosition.add(parametrosGUI, 'positionY').min(0).max(600).step(15).name("Position Y");
	positionY.onChange(function (parametro) {
		lights['directional'].position.y = parametro;
	}
	);
	let positionZ = folderPosition.add(parametrosGUI, 'positionZ').min(0).max(600).step(15).name("Position Z");
	positionZ.onChange(function (parametro) {
		lights['directional'].position.z = parametro;
	}
	);


	animationFolder = gui.addFolder('Animations');
	gui.open();

}

var init = function () {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);


	//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
		50, // view angle
		window.innerWidth / window.innerHeight, //aspect ratio
		1, //near
		500 //far
	);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 5.7;

	createGui();

	objLoading();

	animation();


	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/road.png"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(25, 25); //número de vezes que ela vai se repetir dentro do nosso chão

	let materialGround = new THREE.MeshLambertMaterial({ map: groundTexture });
	materialGround.normalMap = textureLoad.load("assets/texturas/road.png"); //busca a normal, que da noção básica de profundidade


	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000, 1000),
		materialGround
	);

	ground.receiveShadow = true;//chao recebe as sombras.
	ground.rotation.x = - Math.PI / 2;
	ground.position.y -= 7.5;
	scene.add(ground);
	godSaysLightsOn();

	//camera.add(lights["spot"]);
	let skyTexture = textureLoad.load('assets/texturas/sky.jpg');
	skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
	skyTexture.repeat.set(1, 1);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.background = skyTexture

	inicializeSound()

};

var animation = function () {
	requestAnimationFrame(animation);

	let delta = clock.getDelta();

	if (loadFinished) {
		mixer.update(delta);
	}
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo) {
	return angulo * (Math.PI / 180);
}

window.onload = this.init