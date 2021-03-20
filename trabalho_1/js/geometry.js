class Geometry {
  constructor() {
    this.scene;
    this.camera;
    this.renderer;
    this.elements = [];
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 600);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 50;
    this.camera.position.x = 0;
    this.camera.position.y = 5;

    this.criaCubo();

    this.animation();

  };

  cylinder() {
    const cylinder = new THREE.CylinderGeometry(1.25, 1.25, 5, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x2845ff });

    return new THREE.Mesh(cylinder, material);
  }

  tetrahedron() {
    const tetrahedron = new THREE.TetrahedronGeometry(1.7);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

    return new THREE.Mesh(tetrahedron, material);
  }

  criaCubo() {
    const cylinder = this.cylinder();
    cylinder.position.x = -3;
    cylinder.numberY = Math.random() * -1;
    cylinder.numberX = Math.random();

    const tetrahedron = this.tetrahedron();
    tetrahedron.position.x = 0;
    tetrahedron.numberY = Math.random() * -1;
    tetrahedron.numberX = Math.random();

    this.elements["cylinder"] = cylinder;
    this.elements["tetrahedron"] = tetrahedron;

    this.scene.add(tetrahedron);
    this.scene.add(cylinder);

  };

  animation() {
    requestAnimationFrame(this.animation.bind(this));

    this.direction(this.elements.tetrahedron, true);
    this.direction(this.elements.cylinder);
    this.renderer.render(this.scene, this.camera);
  }


  direction(element, isTetrahedron) {
    let height = window.innerHeight;


    if (element.position.x < -34.4)
      element.numberX = Math.random();

    else if (element.position.x > 34.4)
      element.numberX = Math.random() * -1;



    let flag = element.position.y;

    let flagPositive = flag + (isTetrahedron ? 1.5 : 0);
    let flagNegative = flag + (isTetrahedron ? -1.5 : 0);

    if (flagNegative < -9.8)
      element.numberY = Math.random();

    else if (flagPositive > 20)
      element.numberY = Math.random() * -1;


    element.position.x += element.numberX;
    element.position.y += element.numberY;
  }
}

const geometry = new Geometry();
window.onload = geometry.init();