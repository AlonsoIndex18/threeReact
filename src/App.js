import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { AxesHelper, Vector3 } from 'three';

var statuss =false;
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

//showing axes
const axes = new THREE.AxesHelper(5);
scene.add(axes);

  
function movement(direction){
  if(direction=="up"){
    cubeOne.translateY(1);
  }else if(direction=="down"){
    cubeOne.position.y -= 1;
  }else if(direction=="left"){
  cubeOne.position.x -= 1;
  }else if(direction=="right"){
    cubeOne.position.x += 1;
  }
}

function rot(newStat){
  
  if(newStat == "on"){
    statuss = true;
  }else if(newStat == "off"){
    statuss = false;
  }
}

function size(act){
  if(act=="plus" && cubeThree.scale.x<3){
    cubeThree.scale.setX(cubeThree.scale.x + 0.1);
    cubeThree.scale.setY(cubeThree.scale.y + 0.1);
    cubeThree.scale.setZ(cubeThree.scale.z + 0.1);
  }else if(act=="minus" && cubeThree.scale.x>1){
    cubeThree.scale.setX(cubeThree.scale.x - 0.1);
    cubeThree.scale.setY(cubeThree.scale.y - 0.1);
    cubeThree.scale.setZ(cubeThree.scale.z - 0.1);
  }
}

function color(rgb){
  cubeOne.material = new THREE.MeshLambertMaterial({color: rgb});
  cubeTwo.material = new THREE.MeshLambertMaterial({color: rgb});
  cubeThree.material = new THREE.MeshLambertMaterial({color: rgb});
}

function App() {
  
  return (
    <main>
      <div>
      <scene/>  
      <button className="button" id="butUp" onClick={()=> movement("up")}>Up</button>
      <button className="button" id="butDown" onClick={()=>movement("down")}>Down</button>
      <button className="button" id="butLeft" onClick={()=>movement("left")}>Left</button>
      <button className="button" id="butRight" onClick={()=>movement("right")}>Right</button>
      <button className="button" id="butRotOn" onClick={()=>rot("on")}>Enable rotation</button>
      <button className="button" id="butRotOff" onClick={()=>rot("off")}>Disable rotation</button>
      <button className="button" id="butSizePlus" onClick={()=>size("plus")}>Size +</button>
      <button className="button" id="butSizeMinus" onClick={()=>size("minus")}>Size -</button>
      <button className="button" id="butColorRed" onClick={()=>color(0xFF0000)}>Red</button>
      <button className="button" id="butColorBlue" onClick={()=>color(0x0000FF)}>Blue</button>
      <button className="button" id="butColorGreen" onClick={()=>color(0x00FF00)}>Green</button>
      </div>
      
      
    </main>
  );
}

export default App;

const rendering = function() {
  requestAnimationFrame(rendering);
  if(statuss){
    cubeTwo.rotation.y += 0.05;
    console.log(cubeTwo.rotation.y);
  }

  // scene.rotation.z -=0.05;
  // scene.rotation.x -=0.01;
  renderer.render(scene,camera);
  controls.update();
}
rendering();
