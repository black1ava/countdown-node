import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';

class CountDown{
  constructor(){
    this._init();
  }
  
  _init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 3000);
    this.camera.position.set(0, 10, 40);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    
    window.addEventListener('resize', this._onWindowResize, false);
    
    this.delta = 0;
    this.gltfIsLoaded = false;
    
    // this._orbitControls();
    this._createPlane();
    this._gltfLoader();
    this._setUpLight();
    this._animate();
  }
  
  _createPlane = () => {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial();
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }
  
  _gltfLoader = () => {
    const loader = new GLTFLoader();
    loader.setPath('/resource/clock/');
    loader.load('scene.gltf', gltf => {
      this.scene.add(gltf.scene);
      this.clock = gltf.scene.children[0];
      this.clock.scale.setScalar(0.1);
      this.clock.traverse(g => g.castShadow = true);
      
      this.gltfIsLoaded = true;
    });
  }
  
  _setUpLight = () => {
    const light = new THREE.SpotLight(null, 1.2);
    light.position.set(0, 20, 20);
    light.castShadow = true;
    this.scene.add(light);
  }
  
  _orbitControls = () => {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.renderer);
  }
  
  _onWindowResize = () => {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  }
  
  _animate = () => {
    this.delta += 0.01;
    requestAnimationFrame(this._animate);
    
    if(this.gltfIsLoaded){
      this.camera.position.x = Math.sin(this.delta) * 20;
      this.camera.position.z = Math.cos(this.delta) * 20;
      this.camera.lookAt(this.clock.position);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}

const start = new CountDown();