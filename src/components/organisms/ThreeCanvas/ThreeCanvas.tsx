import { useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { WebGLRenderer } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { EffectPass, SelectiveBloomEffect, EffectComposer, RenderPass } from "postprocessing";
import GUI from 'lil-gui'; 
import { render } from "react-dom";

// https://learnopengl.com/Getting-started/Coordinate-Systems
const vertexShader = `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
`;

const fragmentShader = `
            uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {
				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
			}
`;

export function ThreeCanvas () {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            30, 
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );
        camera.position.z = 30;
        const canvas = document.getElementById('myThreeJsCanvas') as HTMLCanvasElement;
        const renderer = new WebGLRenderer({
            canvas, 
            // antialias: false,
            // powerPreference: "high-performance",
	        // stencil: false,
	        //depth: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        
        // renderer.toneMapping = THREE.ReinhardToneMapping;
        
        /*
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;// 
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);
        */
        

        const sprite = new THREE.TextureLoader().load(
            // "https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/sky_blue-circle-512.png",
            "https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/circle-512.png"
            // 'https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/disc.png'
            // "https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/images/metal_ball.jpeg"
        );

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('https://le4onardo-website-assets.s3.us-east-1.amazonaws.com/3d_models/scene.gltf', (gltfScene) => {
            scene.add(gltfScene.scene);
            const pointsObj =  gltfScene.scene.getObjectByName("Object_2") as THREE.Points;
            
            
            const pointsGeometry = pointsObj!.geometry;
            const center = new THREE.Vector3(
                (pointsGeometry.boundingBox!.max.x + pointsGeometry.boundingBox!.min.x)/2, 
                (pointsGeometry.boundingBox!.max.y + pointsGeometry.boundingBox!.min.y)/2,
                (pointsGeometry.boundingBox!.max.z + pointsGeometry.boundingBox!.min.z)/2
            );
            

            const colors = [
                //white:
                 new THREE.Color(255,254,250).toArray(),
                //softSkyBlue: 
                new THREE.Color(238,239,255).toArray(),
                //skyBlue:
                 new THREE.Color(196,214,255).toArray(),
                //softOrange:
                 // new THREE.Color(251,201,158).toArray(),
                //orange:
                  new THREE.Color(248,139,20).toArray(),
                //heavyOrange:
                 // new THREE.Color(246,96,1).toArray()
            ]
            const positionAttr = pointsGeometry.getAttribute('position');
            const colorAttr = pointsGeometry.getAttribute('color');
            const distances = [];
            let maxDistance = 0;
            
            
            for (let i=0; i < positionAttr.count; i++) {
                const distanceFromCenter = center.distanceTo(
                    new THREE.Vector3(positionAttr.array[i*3], positionAttr.array[i*3 + 1], positionAttr.array[i*3 + 2])
                );

                distances.push(distanceFromCenter);
                maxDistance = Math.max(maxDistance, distanceFromCenter + 1);
            }
            distances.forEach((distance, i) => {
                const normDistance = 1 - (distance/maxDistance);
                const pivot = Math.floor(normDistance * colors.length);
                const random = 1 - Math.pow(Math.random(), 1.5);

                const selectedColor = colors[Math.ceil(pivot*random)];
                
                colorAttr.array[i*4] = selectedColor[0] / 255;
                colorAttr.array[i*4 + 1] = selectedColor[1] / 255;
                colorAttr.array[i*4 + 2] = selectedColor[2] / 255;
                colorAttr.array[i*4 + 3] = 1;
            });
            colorAttr.needsUpdate=true;

            const pointMaterial = pointsObj!.material as THREE.PointsMaterial;
            console.log(pointsObj, positionAttr.count);
            
            pointMaterial.size = 0.002
            pointMaterial.sizeAttenuation = true;
            pointMaterial.transparent = true;
            pointMaterial.depthWrite = false;
            pointMaterial.map = sprite;
            // pointMaterial.vertexColors = true;
            pointMaterial.opacity = 1;
            

            const glthtBox = new THREE.Box3().setFromObject(gltfScene.scene);
            const xSize = glthtBox.max.x - glthtBox.min.x;
            const ySize = glthtBox.max.y - glthtBox.min.y;
            const zSize = glthtBox.max.z - glthtBox.min.z;
        
            console.log('GLTF position', scene.getWorldPosition(gltfScene.scene.position), xSize, ySize, zSize);
            animate();        
        });
        const light = new THREE.PointLight(0xffffff, 50, 0, 0.5);
        light.position.set(10, 10, 10);
        light.castShadow=true
        scene.add(light);
        const lightBox = new THREE.Box3().setFromObject(light);
        const xSize = lightBox.max.x - lightBox.min.x
        const ySize = lightBox.max.y - lightBox.min.y
        const zSize = lightBox.max.z - lightBox.min.z
        console.log('Point light position', scene.getWorldPosition(light.position), xSize, ySize, zSize);

        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        const material = new THREE.MeshStandardMaterial( {
            color: 0x554488, alphaTest: 0, visible: true, transparent: false,
            roughness:1, metalness:0
        } ); 
        const cube = new THREE.Mesh( geometry, material ); 
        cube.position.set(5,5,5)
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add( cube );

        const stats = new Stats();
        document.body.appendChild(stats.dom);


        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        const selectiveBloom = new SelectiveBloomEffect(scene, camera, {   
            intensity: 2,
            luminanceThreshold: 0.5,
            // luminanceSmoothing: 1,
            levels: 10,
            // mipmapBlur: true
            // luminanceMaterial: new THREE.MeshBasicMaterial({ color: 0x000000 }),
            // lights: [] 
        });
        const bloomPass = new EffectPass(camera, selectiveBloom);
        
        composer.addPass(renderPass);
        composer.addPass(bloomPass);



        /*
        requestAnimationFrame(function render() {
	        requestAnimationFrame(render);
	        composer.render();    
        });
        */

        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.target.set(0.5, 0.5, 0);
        // controls.maxPolarAngle = 1;
        // controls.minPolarAngle = 1;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;

        const animate = () => {
            // boxMesh.rotation.x += 0.01;
            // boxMesh.rotation.y += 0.01;
            controls.update();
            requestAnimationFrame(animate)
            composer.render();
        }
        animate();
        
        // gui for bloom
        const gui = new GUI();
        
        // selectiveBloom.luminanceThreshold
        gui.add(selectiveBloom, 'intensity', 0, 100, 2).name('Bloom Intensity');
        // gui.add(selectiveBloom, 'radius', 0, 1, 0.01).name('radius');
        // gui.add(selectiveBloom, 'luminanceSmoothing', 0, 1, 0.01).name('Luminance Smoothing');   
        

        gui.add(light.position, 'x', -100, 100, 1).name('Light X');
        gui.add(light.position, 'y', -100, 100, 1).name('Light Y');
        gui.add(light.position, 'z', -100, 100, 1).name('Light Z');
        gui.add(light, 'visible', 1).name('Visible');
        
        


    }, []);


    return <canvas id="myThreeJsCanvas" />
}