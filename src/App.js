import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.6,1200);
camera.position.z = 5;

// Loader
// const loader = new FBXLoader();


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
const boxGeometry = new THREE.BoxGeometry(2,2,2);
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
boxMesh.rotation.set(40,0,40);
scene.add(boxMesh);

//Load a model
// loader.load("models/fbx/akiko-sama-anime-character-model/source/LOD0.fbx", function(object){
//     scene.add(object.scene);
// }, undefined, function (error) {
//     console.error(error);

// });


//Light
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(5,5,5);
scene.add(light);


const rendering = function() {
    requestAnimationFrame(rendering);

    scene.rotation.z -=0.05;
    scene.rotation.x -=0.01;
    renderer.render(scene,camera);
}
rendering();



function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <scene/>
      <h1>Create React App + Go API</h1>
      <h2>
        Deployed with{' '}
        <a
          href="https://vercel.com/docs"
          target="_blank"
          rel="noreferrer noopener"
        >
          Vercel
        </a>
        !
      </h2>
      <p>
        <a
          href="https://github.com/vercel/vercel/tree/main/examples/create-react-app"
          target="_blank"
          rel="noreferrer noopener"
        >
          This project
        </a>{' '}
        was bootstrapped with{' '}
        <a href="https://facebook.github.io/create-react-app/">
          Create React App
        </a>{' '}
        and contains three directories, <code>/public</code> for static assets,{' '}
        <code>/src</code> for components and content, and <code>/api</code>{' '}
        which contains a serverless <a href="https://golang.org/">Go</a>{' '}
        function. See{' '}
        <a href="/api/date">
          <code>api/date</code> for the Date API with Go
        </a>
        .
      </p>
      <br />
      <h2>The date according to Go is:</h2>
      <p>{date ? date : 'Loading date...'}</p>
    </main>
  );
}

export default App;
