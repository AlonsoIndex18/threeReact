import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { Vector3 } from 'three';
const scene = new THREE.Scene();

function addObject(size,posX,posY,posZ,color,scene){
  const boxGeometry = new THREE.BoxGeometry(size,size,size);
  const boxMaterial = new THREE.MeshLambertMaterial({color: color});
  const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
  scene.add(boxMesh);
  boxMesh.position.x = posX;
  boxMesh.position.y = posY;
  boxMesh.position.z = posZ;

  return boxMesh;
}

//Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.6,1200);
camera.position.z = 5;

// Loader
const fbxloader = new FBXLoader();


//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#223143");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//Canvas responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//Create object
const cubeOne = addObject(2,5,0,0,0xFFFFFF,scene);
const cubeTwo = addObject(2,0,5,0,0x0000FF,scene);
const cubeThree = addObject(2,0,0,5,0xFFD700,scene);

//boxMesh.rotation.set(40,0,40);

cubeOne.lookAt(camera.position);
cubeTwo.rotateX(50);
//Trackball Controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 4;
controls. dynamicDampingFactor = 0.15;


//Load a model

fbxloader.load('./resources/models/fbx/akiko/source/LOD0.fbx' , (object) =>{
  scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

// loader.load("models/fbx/akiko-sama-anime-character-model/source/LOD0.fbx", function(object){
//     scene.add(object.scene);
// }, undefined, function (error) {
//     console.error(error);

// });


//Light
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(5,5,5);
scene.add(light);

const lights = [];

// const lightValues = [
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//   {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8}
// ];




const rendering = function() {
    requestAnimationFrame(rendering);

    // scene.rotation.z -=0.05;
    // scene.rotation.x -=0.01;
    renderer.render(scene,camera);
    controls.update();
}
rendering();

function moveCube(){
  handleKeyDown = (event) => {
    console.log("works")
    if (event.key === 'W'){
      cubeOne.posX += 1;
      console.log("W");
    }else if(event.key === 'A'){
      cubeOne.posZ += 1;
      console.log("A");
    }else if(event.key === 'S'){
      cubeOne.posX -= 1;
      console.log("S");
    }else if(event.key === 'D'){
      cubeOne.posZ -= 1;
      console.log("D");
    }
  }
}


function App() {

  return (
    <main>
      <input type="text"  onKeyDown={this.handleKeyDown} />
      <scene/>
      
    </main>
  );
}

export default App;
