var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var elementos = [];

var velocidade = 0.07;

var criaMonstro = function () {
  let puppet = [];

  let red = new THREE.Color(1, 0, 0);
  let green = new THREE.Color(0, 1, 0);
  let blue = new THREE.Color(0, 0, 1);

  let cores = [red, green, blue];

  let materials = [
    new THREE.MeshBasicMaterial({ color: blue }),
    new THREE.MeshBasicMaterial({ color: blue }),
    new THREE.MeshBasicMaterial({ color: blue }),
    new THREE.MeshBasicMaterial({ color: blue }),
    new THREE.MeshBasicMaterial({ color: green }),
    new THREE.MeshBasicMaterial({ color: blue })
  ];

  let tronco = new THREE.Mesh(new THREE.BoxGeometry(4, 7, 2), materials);
  puppet["tronco"] = tronco;

  let cabeca = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["cabeca"] = cabeca;
  tronco.add(cabeca);
  cabeca.position.y = tronco.position.y + 6;

  //bracoDireito

  let ombroD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["ombroD"] = ombroD;
  tronco.add(ombroD);
  ombroD.position.y = tronco.position.y + 3;
  ombroD.position.x = tronco.position.y + 3;

  let ombroE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["ombroE"] = ombroE;
  tronco.add(ombroE);
  ombroE.position.y = tronco.position.y + 3;
  ombroE.position.x = tronco.position.y - 3;


  let pivotOmbroD = new THREE.Group();
  puppet["pivotOmbroD"] = pivotOmbroD;
  ombroD.add(pivotOmbroD);

  let pivotOmbroE = new THREE.Group();
  puppet["pivotOmbroE"] = pivotOmbroE;
  ombroE.add(pivotOmbroE);


  let bracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["bracoD"] = bracoD;
  pivotOmbroD.add(bracoD)
  bracoD.position.y -= 2.7;

  let bracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["bracoE"] = bracoE;
  pivotOmbroE.add(bracoE)
  bracoE.position.y -= 2.7;


  let cutuveloD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["cutuveloD"] = cutuveloD;
  bracoD.add(cutuveloD)
  cutuveloD.position.y = bracoD.position.y;

  let cutuveloE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["cutuveloE"] = cutuveloE;
  bracoE.add(cutuveloE)
  cutuveloE.position.y = bracoD.position.y;


  let anteBracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 3.7, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["anteBracoD"] = anteBracoD;
  cutuveloD.add(anteBracoD)
  anteBracoD.position.y -= 2.5;

  let anteBracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 3.7, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["anteBracoE"] = anteBracoE;
  cutuveloE.add(anteBracoE)
  anteBracoE.position.y -= 2.5;

  let baciaE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["baciaE"] = baciaE;
  tronco.add(baciaE);
  baciaE.position.y = tronco.position.y - 4;
  baciaE.position.x = -1;


  let pivotBaciaE = new THREE.Group();
  puppet["pivotBaciaE"] = pivotBaciaE;
  baciaE.add(pivotBaciaE);

  let pernaE = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["pernaE"] = pernaE;
  pivotBaciaE.add(pernaE)
  pernaE.position.y -= 2;


  let joelhoE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["joelhoE"] = joelhoE;
  pernaE.add(joelhoE);
  joelhoE.position.y = tronco.position.y - 2;

  let pivotJoelhoE = new THREE.Group();
  puppet["pivotJoelhoE"] = pivotJoelhoE;
  joelhoE.add(pivotJoelhoE);


  let coxaE = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["coxaE"] = coxaE;
  pivotJoelhoE.add(coxaE)
  coxaE.position.y -= 2.7;

  let baciaD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["baciaD"] = baciaD;
  tronco.add(baciaD);
  baciaD.position.y = tronco.position.y - 4;
  baciaD.position.x = 1;


  let pivotBaciaD = new THREE.Group();
  puppet["pivotBaciaD"] = pivotBaciaD;
  baciaD.add(pivotBaciaD);

  let pernaD = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["pernaD"] = pernaD;
  pivotBaciaD.add(pernaD)
  pernaD.position.y -= 2;



  let joelhoD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  puppet["joelhoD"] = joelhoD;
  pernaD.add(joelhoD);
  joelhoD.position.y = tronco.position.y - 2;

  let pivotJoelhoD = new THREE.Group();
  puppet["pivotJoelhoD"] = pivotJoelhoD;
  joelhoD.add(pivotJoelhoD);


  let coxaD = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 1), new THREE.MeshBasicMaterial({ color: blue }));
  puppet["coxaD"] = coxaD;
  pivotJoelhoD.add(coxaD)
  coxaD.position.y -= 2.7;


  elementos["puppet"] = puppet;
  scene.add(tronco);

};



var init = function () {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 150);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 80;
  camera.position.x = 0;
  camera.position.y = 2;

  criaMonstro();


  animation();


  document.addEventListener('keydown', apertouButao);
  document.addEventListener('keyup', soltouBotao);

  //metodos do mouser
  document.addEventListener('mousewheel', onMouseWheel);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseClick);
  document.addEventListener('mouseup', onMouseUp);


};

var clicando = false;
var mouserPosAnterior = {
  x: 0,
  y: 0
}

var onMouseMove = function (e) {
  let diferencaMovimento = {
    x: e.offsetX - mouserPosAnterior.x,
    y: e.offsetY - mouserPosAnterior.y
  }

  if (clicando) {

    let angulosQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(paraRadianos(diferencaMovimento.y) * 0.5,
        paraRadianos(diferencaMovimento.x) * 0.5,
        0,
        'XYZ')
    );
    elementos["puppet"]["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, elementos["puppet"]["tronco"].quaternion);
  }
  mouserPosAnterior = {
    x: e.offsetX,
    y: e.offsetY
  }
};

var onMouseClick = function (e) {
  clicando = true;
};

var onMouseUp = function (e) {
  clicando = false;
};

var onMouseWheel = function (e) {
  elementos["puppet"]["tronco"].scale.x += (e.deltaY > 0) ? -0.1 : 0.1;
  elementos["puppet"]["tronco"].scale.y += (e.deltaY > 0) ? -0.1 : 0.1;
  elementos["puppet"]["tronco"].scale.z += (e.deltaY > 0) ? -0.1 : 0.1;
}



var key_r = false;
var key_t = false;

var key_f = false;
var key_g = false;

var key_w = false;
var key_q = false;

var key_a = false;
var key_s = false;

var key_space = false;


var key_z = false;
var key_x = false;

var key_c = false;
var key_v = false;

var key_ctrl = false;
var key_alt = false;


var soltouBotao = function (e) {

  if (e.keyCode == 82) { //r
    key_r = false;
  }
  if (e.keyCode == 84) {
    key_t = false;
  }
  if (e.keyCode == 32) {
    key_space = false;
  }

  if (e.keyCode == 70) {
    key_f = false;
  }

  if (e.keyCode == 71) {
    key_g = false;
  }

  if (e.keyCode == 81) {
    key_q = false;
  }

  if (e.keyCode == 87) {
    key_w = false;
  }

  if (e.keyCode == 65) {
    key_a = false;
  }

  if (e.keyCode == 83) {
    key_s = false;
  }

  if (e.keyCode == 90) {
    key_z = false;
  }

  if (e.keyCode == 88) {
    key_x = false;
  }

  if (e.keyCode == 67) {
    key_c = false;
  }

  if (e.keyCode == 86) {
    key_v = false;
  }

  if (e.keyCode == 17) {
    key_ctrl = false;
  }

  if (e.keyCode == 18) {
    key_alt = false;
  }
}


var apertouButao = function (e) {
  console.log(e.keyCode);

  if (e.keyCode == 82) {
    key_r = true;
  }
  if (e.keyCode == 84) {
    key_t = true;
  }

  if (e.keyCode == 32) {
    key_space = true;
  }

  if (e.keyCode == 70) {
    key_f = true;
  }

  if (e.keyCode == 71) {
    key_g = true;
  }

  if (e.keyCode == 81) {
    key_q = true;
  }

  if (e.keyCode == 87) {
    key_w = true;
  }

  if (e.keyCode == 65) {
    key_a = true;
  }

  if (e.keyCode == 83) {
    key_s = true;
  }

  if (e.keyCode == 90) {
    key_z = true;
  }

  if (e.keyCode == 88) {
    key_x = true;
  }

  if (e.keyCode == 67) {
    key_c = true;
  }

  if (e.keyCode == 86) {
    key_v = true;
  }

  if (e.keyCode == 17) {
    key_ctrl = true;
  }

  if (e.keyCode == 18) {
    key_alt = true;
  }
}

var count = 0;
var velocidadeJoelhoE = -0.03;
var velocidadeJoelhoD = -0.03;
var velocidadeBaciaE = -0.03;
var velocidadeBaciaD = -0.03;
var velocidadePernaFrenteE = -0.03;
var velocidadePernaFrenteD = -0.03;
var velocidadeOmbroDireitoC = -0.03;
var velocidadeOmbroDireitoL = -0.03;
var velocidadeOmbroEsquerdoC = -0.03;
var velocidadeOmbroEsquerdoL = -0.03;

var animation = function () {
  requestAnimationFrame(animation); //adiciona o método na fila de renderização

  if (key_t) { //movimento frente
    if (elementos["puppet"]["pivotOmbroD"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroD"].rotation.x > 1.3)
      velocidadeOmbroDireitoC *= -1;

    elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeOmbroDireitoC;
  }

  if (key_r) {
    console.log(elementos["puppet"]["pivotOmbroD"].rotation.z);

    if (elementos["puppet"]["pivotOmbroD"].rotation.z < 0 || elementos["puppet"]["pivotOmbroD"].rotation.z > 1.4)
      velocidadeOmbroDireitoL *= -1;

    elementos["puppet"]["pivotOmbroD"].rotation.z += velocidadeOmbroDireitoL;
  }

  if (key_w) {
    if (elementos["puppet"]["pivotOmbroE"].rotation.z < -1.4 || elementos["puppet"]["pivotOmbroE"].rotation.z > 0)
      velocidadeOmbroEsquerdoL *= -1;

    elementos["puppet"]["pivotOmbroE"].rotation.z += velocidadeOmbroEsquerdoL;
  }

  if (key_q) { //movimento frente
    if (elementos["puppet"]["pivotOmbroE"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroE"].rotation.x > 1.3)
      velocidadeOmbroEsquerdoC *= -1;

    elementos["puppet"]["pivotOmbroE"].rotation.x += velocidadeOmbroEsquerdoC;
  }

  if (key_s) {
    if (elementos["puppet"]["cutuveloE"].rotation.z > 0 || elementos["puppet"]["cutuveloE"].rotation.z < -1.4)
      velocidadeOmbroEsquerdoL *= -1;

    elementos["puppet"]["cutuveloE"].rotation.z += velocidadeOmbroEsquerdoL;
  }

  if (key_a) { //movimento frente
    if (elementos["puppet"]["cutuveloE"].rotation.x < -2 || elementos["puppet"]["cutuveloE"].rotation.x > 0)
      velocidadeOmbroEsquerdoC *= -1;

    elementos["puppet"]["cutuveloE"].rotation.x += velocidadeOmbroEsquerdoC;
  }

  if (key_space) {
    elementos["puppet"]["tronco"].rotation.y += 0.03;
  }

  if (key_f) {
    if (elementos["puppet"]["cutuveloD"].rotation.z < 0 || elementos["puppet"]["cutuveloD"].rotation.z > 1.4)
      velocidadeOmbroDireitoL *= -1;

    elementos["puppet"]["cutuveloD"].rotation.z += velocidadeOmbroDireitoL;
  }

  if (key_g) { //movimento frente
    if (elementos["puppet"]["cutuveloD"].rotation.x < -2 || elementos["puppet"]["cutuveloD"].rotation.x > 0)
      velocidadeOmbroDireitoC *= -1;

    elementos["puppet"]["cutuveloD"].rotation.x += velocidadeOmbroDireitoC;
  }

  if (key_z) { //movimento frente
    console.log(elementos["puppet"]["pivotJoelhoE"].rotation.x);
    if (elementos["puppet"]["pivotJoelhoE"].rotation.x > 2 || elementos["puppet"]["pivotJoelhoE"].rotation.x < 0)
      velocidadeJoelhoE *= -1;

    elementos["puppet"]["pivotJoelhoE"].rotation.x += velocidadeJoelhoE;
  }

  if (key_v) {
    if (elementos["puppet"]["pivotJoelhoD"].rotation.x > 2 || elementos["puppet"]["pivotJoelhoD"].rotation.x < 0)
      velocidadeJoelhoD *= -1;

    elementos["puppet"]["pivotJoelhoD"].rotation.x += velocidadeJoelhoD;
  }

  if (key_x) {
    if (elementos["puppet"]["pivotBaciaE"].rotation.x > 1 || elementos["puppet"]["pivotBaciaE"].rotation.x < -1)
      velocidadeBaciaE *= -1;

    elementos["puppet"]["pivotBaciaE"].rotation.x += velocidadeBaciaE;
  }

  if (key_c) {
    if (elementos["puppet"]["pivotBaciaD"].rotation.x > 1 || elementos["puppet"]["pivotBaciaD"].rotation.x < -1)
      velocidadeBaciaD *= -1;

    elementos["puppet"]["pivotBaciaD"].rotation.x += velocidadeBaciaD;
  }

  if (key_ctrl) {
    if (elementos["puppet"]["pivotBaciaE"].rotation.z > 0.5 || elementos["puppet"]["pivotBaciaE"].rotation.z < -0.5)
      velocidadePernaFrenteE *= -1;

    elementos["puppet"]["pivotBaciaE"].rotation.z += velocidadePernaFrenteE;
  }

  if (key_alt) {
    if (elementos["puppet"]["pivotBaciaD"].rotation.z > 0.5 || elementos["puppet"]["pivotBaciaD"].rotation.z < -0.5)
      velocidadePernaFrenteD *= -1;

    elementos["puppet"]["pivotBaciaD"].rotation.z += velocidadePernaFrenteD;
  }

  renderer.render(scene, camera);
}

function paraRadianos(angulo) {
  return angulo * (Math.PI / 180);
}

window.onload = this.init