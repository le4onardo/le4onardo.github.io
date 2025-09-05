import { useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';
import {
    atan,
    cos,
    float,
    max,
    min,
    mix,
    PI,
    PI2,
    sin,
    vec2,
    vec3,
    color,
    Fn,
    hash,
    hue,
    If,
    instanceIndex,
    Loop,
    mx_fractal_noise_float,
    mx_fractal_noise_vec3,
    pass,
    pcurve,
    storage,
    deltaTime,
    time,
    uv,
    uniform
} from 'three/tsl';
import BloomNode, { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import WebGPU from 'three/addons/capabilities/WebGPU.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Linear } from 'gsap';

/**
 *
 * Source from https://github.com/mrdoob/three.js/blob/master/examples/webgpu_tsl_vfx_linkedparticles.html
 *
 */
interface Props {
    className: string;
    // Particles
    colorOffset?: number;
    // Turbulence
    friction?: number;
    frequency?: number;
    amplitude?: number;
    octaves?: number;
    lacunarity?: number;
    gain?: number;
    // Bloom
    bloomRadius?: number;
    bloomStrength?: number;
    bloomThreshold?: number;
}

export function ThreeCanvas({
    className,
    colorOffset = 0,

    friction = 0.08,
    frequency = 0.5,
    amplitude = 5,
    octaves = 2,
    lacunarity = 2,
    gain = 0.5,

    bloomRadius = 0.1,
    bloomStrength = 0.25,
    bloomThreshold = 0.5
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fixedPointerRef = useRef<THREE.Vector2 | undefined>(undefined);
    const cameraTargetPercentage = useRef(0);
    const colorOffsetRef = useRef(colorOffset);
    colorOffsetRef.current = colorOffset;

    const frictionRef = useRef(friction);
    frictionRef.current = friction;
    const frequencyRef = useRef(frequency);
    frequencyRef.current = frequency;
    const amplitudeRef = useRef(amplitude);
    amplitudeRef.current = amplitude;
    const octavesRef = useRef(octaves);
    octavesRef.current = octaves;
    const lacunarityRef = useRef(lacunarity);
    lacunarityRef.current = lacunarity;
    const gainRef = useRef(gain);
    gainRef.current = gain;

    const bloomRadiusRef = useRef(bloomRadius);
    bloomRadiusRef.current = bloomRadius;
    const bloomStrengthRef = useRef(bloomStrength);
    bloomStrengthRef.current = bloomStrength;
    const bloomThresholdRef = useRef(bloomThreshold);
    bloomThresholdRef.current = bloomThreshold;

    useGSAP(() => {
        const tubePerc = {
            percent: 0
        };
        gsap.to(tubePerc, {
            percent: 0.96,
            ease: Linear.easeNone,
            duration: 10,
            onReverseComplete: () => {
                // fixedPointerRef.current = undefined;
            },
            onStart: () => {
                // fixedPointerRef.current = new THREE.Vector2(0, 0);
            },
            onUpdate: () => {
                // console.log(tubePerc.percent);
                cameraTargetPercentage.current = tubePerc.percent;
            },
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top top',
                end: '+=2000',
                scrub: 1
                // markers: {color: "white"}
            }
        });
    });

    useEffect(() => {
        let camera: THREE.PerspectiveCamera,
            scene: THREE.Scene,
            renderer: THREE.WebGPURenderer,
            postProcessing: THREE.PostProcessing,
            controls: OrbitControls,
            timer: Timer,
            light: THREE.PointLight,
            path: THREE.CatmullRomCurve3;

        let updateParticles: THREE.ComputeNode, spawnParticles: THREE.ComputeNode; // TSL compute nodes
        let getInstanceColor: THREE.TSL.ShaderNodeFn<[any]>; // TSL function
        let gui: GUI;
        let normalArrow: THREE.ArrowHelper;
        let bloomPass: THREE.TSL.ShaderNodeObject<BloomNode>;

        const screenPointer = new THREE.Vector2();
        const scenePointer = new THREE.Vector3();
        const raycastPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const raycaster = new THREE.Raycaster();

        const nbParticles = Math.pow(2, 13);

        const timeScale = uniform(1.0);
        const particleLifetime = uniform(0.2);
        const particleSize = uniform(1.0);
        const linksWidth = uniform(0.005);

        const colorOffset = uniform(0.0);
        const colorVariance = uniform(0.5);
        const colorRotationSpeed = uniform(1.0);

        const spawnIndex = uniform(0);
        const nbToSpawn = uniform(5);
        const spawnPosition = uniform(vec3(0.0));
        const previousSpawnPosition = uniform(vec3(0.0));

        const turbFrequency = uniform(0.5);
        const turbAmplitude = uniform(0.5);
        const turbOctaves = uniform(2);
        const turbLacunarity = uniform(2.0);
        const turbGain = uniform(0.5);
        const turbFriction = uniform(0.01);

        init();

        function init() {
            if (WebGPU.isAvailable() === false) {
                document.body.appendChild(WebGPU.getErrorMessage());

                throw new Error('No WebGPU support');
            }

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 200);
            camera.position.set(0, 0, 10);

            scene = new THREE.Scene();

            timer = new Timer();
            timer.connect(document);

            // renderer
            const canvas = canvasRef.current!;
            renderer = new THREE.WebGPURenderer({ antialias: true, canvas });
            renderer.setClearColor(0x14171a);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setAnimationLoop(animate);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;

            // TSL function
            // current color from index
            getInstanceColor = /*#__PURE__*/ Fn(([i]: any[]) => {
                return hue(
                    color(0x0000ff),
                    colorOffset.add(mx_fractal_noise_float(i.toFloat().mul(0.1), 2, 2.0, 0.5, colorVariance))
                );
            });

            // Particles
            // storage buffers
            const particlePositions = storage(
                new THREE.StorageInstancedBufferAttribute(nbParticles, 4),
                'vec4',
                nbParticles
            );
            const particleVelocities = storage(
                new THREE.StorageInstancedBufferAttribute(nbParticles, 4),
                'vec4',
                nbParticles
            );

            // init particles buffers
            renderer.computeAsync(
                /*#__PURE__*/ Fn(() => {
                    particlePositions.element(instanceIndex).xyz.assign(vec3(10000.0));
                    particlePositions.element(instanceIndex).w.assign(vec3(-1.0)); // life is stored in w component; x<0 means dead
                })().compute(nbParticles)
            );

            // particles output
            const particleQuadSize = 0.05;
            const particleGeom = new THREE.PlaneGeometry(particleQuadSize, particleQuadSize);

            const particleMaterial = new THREE.SpriteNodeMaterial();
            particleMaterial.blending = THREE.AdditiveBlending;
            particleMaterial.depthWrite = false;
            particleMaterial.positionNode = particlePositions.toAttribute();
            particleMaterial.scaleNode = vec2(particleSize);
            particleMaterial.rotationNode = atan(
                particleVelocities.toAttribute().y,
                particleVelocities.toAttribute().x
            );

            particleMaterial.colorNode = /*#__PURE__*/ Fn(() => {
                const life = particlePositions.toAttribute().w;
                const modLife = pcurve(life.oneMinus(), 8.0, 1.0);
                const pulse = pcurve(
                    sin(hash(instanceIndex).mul(PI2).add(time.mul(0.5).mul(PI2)))
                        .mul(0.5)
                        .add(0.5),
                    0.25,
                    0.25
                )
                    .mul(10.0)
                    .add(1.0);

                return getInstanceColor(instanceIndex).mul(pulse.mul(modLife));
            })();

            particleMaterial.opacityNode = /*#__PURE__*/ Fn(() => {
                const circle = uv().xy.sub(0.5).length().step(0.5);
                const life = particlePositions.toAttribute().w;

                return circle.mul(life);
            })();

            const particleMesh = new THREE.InstancedMesh(particleGeom, particleMaterial, nbParticles);
            particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            particleMesh.frustumCulled = false;

            scene.add(particleMesh);

            // Links between particles
            // first, we define the indices for the links, 2 quads per particle, the indexation is fixed
            const linksIndices = [];
            for (let i = 0; i < nbParticles; i++) {
                const baseIndex = i * 8;
                for (let j = 0; j < 2; j++) {
                    const offset = baseIndex + j * 4;
                    linksIndices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
                }
            }

            // storage buffers attributes for the links
            const nbVertices = nbParticles * 8;
            const linksVerticesSBA = new THREE.StorageBufferAttribute(nbVertices, 4);
            const linksColorsSBA = new THREE.StorageBufferAttribute(nbVertices, 4);

            // links output
            const linksGeom = new THREE.BufferGeometry();
            linksGeom.setAttribute('position', linksVerticesSBA);
            linksGeom.setAttribute('color', linksColorsSBA);
            linksGeom.setIndex(linksIndices);

            const linksMaterial = new THREE.MeshBasicNodeMaterial();
            linksMaterial.vertexColors = true;
            linksMaterial.side = THREE.DoubleSide;
            linksMaterial.transparent = true;
            linksMaterial.depthWrite = false;
            linksMaterial.depthTest = false;
            linksMaterial.blending = THREE.AdditiveBlending;
            linksMaterial.opacityNode = storage(linksColorsSBA, 'vec4', linksColorsSBA.count).toAttribute().w;

            const linksMesh = new THREE.Mesh(linksGeom, linksMaterial);
            linksMesh.frustumCulled = false;
            scene.add(linksMesh);

            // compute nodes
            updateParticles = /*#__PURE__*/ Fn(() => {
                const position = particlePositions.element(instanceIndex).xyz;
                const life = particlePositions.element(instanceIndex).w;
                const velocity = particleVelocities.element(instanceIndex).xyz;
                const dt = deltaTime.mul(0.1).mul(timeScale);

                If(life.greaterThan(0.0), () => {
                    // first we update the particles positions and velocities
                    // velocity comes from a turbulence field, and is multiplied by the particle lifetime so that it slows down over time
                    const localVel = mx_fractal_noise_vec3(
                        position.mul(turbFrequency),
                        turbOctaves,
                        turbLacunarity,
                        turbGain,
                        turbAmplitude
                    ).mul(life.add(0.01));
                    velocity.addAssign(localVel);
                    velocity.mulAssign(turbFriction.oneMinus());
                    position.addAssign(velocity.mul(dt));

                    // then we decrease the lifetime
                    life.subAssign(dt.mul(particleLifetime.reciprocal()));

                    // then we find the two closest particles and set a quad to each of them
                    const closestDist1 = float(10000.0).toVar();
                    const closestPos1 = vec3(0.0).toVar();
                    const closestLife1 = float(0.0).toVar();
                    const closestDist2 = float(10000.0).toVar();
                    const closestPos2 = vec3(0.0).toVar();
                    const closestLife2 = float(0.0).toVar();

                    Loop(nbParticles, ({ i }) => {
                        const otherPart = particlePositions.element(i);
                        // @ts-ignore
                        If(i.notEqual(instanceIndex).and(otherPart.w.greaterThan(0.0)), () => {
                            // if not self and other particle is alive

                            const otherPosition = otherPart.xyz;
                            const dist = position.sub(otherPosition).lengthSq();
                            const moreThanZero = dist.greaterThan(0.0);

                            If(dist.lessThan(closestDist1).and(moreThanZero), () => {
                                closestDist1.assign(dist);
                                closestPos1.assign(otherPosition.xyz);
                                closestLife1.assign(otherPart.w);
                            }).ElseIf(dist.lessThan(closestDist2).and(moreThanZero), () => {
                                closestDist2.assign(dist);
                                closestPos2.assign(otherPosition.xyz);
                                closestLife2.assign(otherPart.w);
                            });
                        });
                    });

                    // then we update the links correspondingly
                    const linksPositions = storage(linksVerticesSBA, 'vec4', linksVerticesSBA.count);
                    const linksColors = storage(linksColorsSBA, 'vec4', linksColorsSBA.count);
                    const firstLinkIndex = instanceIndex.mul(8);
                    const secondLinkIndex = firstLinkIndex.add(4);

                    // positions link 1
                    linksPositions.element(firstLinkIndex).xyz.assign(position);
                    linksPositions.element(firstLinkIndex).y.addAssign(linksWidth);
                    linksPositions.element(firstLinkIndex.add(1)).xyz.assign(position);
                    linksPositions.element(firstLinkIndex.add(1)).y.addAssign(linksWidth.negate());
                    linksPositions.element(firstLinkIndex.add(2)).xyz.assign(closestPos1);
                    linksPositions.element(firstLinkIndex.add(2)).y.addAssign(linksWidth.negate());
                    linksPositions.element(firstLinkIndex.add(3)).xyz.assign(closestPos1);
                    linksPositions.element(firstLinkIndex.add(3)).y.addAssign(linksWidth);

                    // positions link 2
                    linksPositions.element(secondLinkIndex).xyz.assign(position);
                    linksPositions.element(secondLinkIndex).y.addAssign(linksWidth);
                    linksPositions.element(secondLinkIndex.add(1)).xyz.assign(position);
                    linksPositions.element(secondLinkIndex.add(1)).y.addAssign(linksWidth.negate());
                    linksPositions.element(secondLinkIndex.add(2)).xyz.assign(closestPos2);
                    linksPositions.element(secondLinkIndex.add(2)).y.addAssign(linksWidth.negate());
                    linksPositions.element(secondLinkIndex.add(3)).xyz.assign(closestPos2);
                    linksPositions.element(secondLinkIndex.add(3)).y.addAssign(linksWidth);

                    // colors are the same for all vertices of both quads
                    const linkColor = getInstanceColor(instanceIndex);
                    console.log('linkColor', linkColor);
                    // store the minimum lifetime of the closest particles in the w component of colors
                    const l1 = max(0.0, min(closestLife1, life)).pow(0.8); // pow is here to apply a slight curve to the opacity
                    const l2 = max(0.0, min(closestLife2, life)).pow(0.8);

                    Loop(4, ({ i }) => {
                        linksColors.element(firstLinkIndex.add(i)).xyz.assign(linkColor);
                        linksColors.element(firstLinkIndex.add(i)).w.assign(l1);
                        linksColors.element(secondLinkIndex.add(i)).xyz.assign(linkColor);
                        linksColors.element(secondLinkIndex.add(i)).w.assign(l2);
                    });
                });
            })().compute(nbParticles);

            spawnParticles = /*#__PURE__*/ Fn(() => {
                const particleIndex = spawnIndex.add(instanceIndex).mod(nbParticles).toInt();
                const position = particlePositions.element(particleIndex).xyz;
                const life = particlePositions.element(particleIndex).w;
                const velocity = particleVelocities.element(particleIndex).xyz;

                life.assign(1.0); // sets it alive

                // random spherical direction
                const rRange = float(0.01);
                const rTheta = hash(particleIndex).mul(PI2);
                const rPhi = hash(particleIndex.add(1)).mul(PI);
                const rx = sin(rTheta).mul(cos(rPhi));
                const ry = sin(rTheta).mul(sin(rPhi));
                const rz = cos(rTheta);
                const rDir = vec3(rx, ry, rz);

                // position is interpolated between the previous cursor position and the current one over the number of particles spawned
                const pos = mix(
                    previousSpawnPosition,
                    spawnPosition,
                    instanceIndex.toFloat().div(nbToSpawn.sub(1).toFloat()).clamp()
                );
                position.assign(pos.add(rDir.mul(rRange)));

                // start in that direction
                velocity.assign(rDir.mul(5.0));
            })().compute(nbToSpawn.value);

            // background , an inverted icosahedron
            const backgroundGeom = new THREE.IcosahedronGeometry(100, 5).applyMatrix4(
                new THREE.Matrix4().makeScale(-1, 1, 1)
            );
            const backgroundMaterial = new THREE.MeshStandardNodeMaterial();
            backgroundMaterial.roughness = 0.4;
            backgroundMaterial.metalness = 0.9;
            backgroundMaterial.flatShading = true;
            backgroundMaterial.colorNode = color(0x0);

            const backgroundMesh = new THREE.Mesh(backgroundGeom, backgroundMaterial);
            scene.add(backgroundMesh);

            // light for the background
            light = new THREE.PointLight(0xffffff, 3000);
            scene.add(light);

            // post processing

            postProcessing = new THREE.PostProcessing(renderer);

            const scenePass = pass(scene, camera);
            const scenePassColor = scenePass.getTextureNode('output');

            bloomPass = bloom(scenePassColor, 0.25, 0.1, 0.5);

            postProcessing.outputNode = scenePassColor.add(bloomPass);

            // controls

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = false;
            controls.autoRotate = false;
            controls.maxDistance = 75;
            window.addEventListener('resize', onWindowResize);

            // pointer handling

            window.addEventListener('pointermove', onPointerMove);

            // GUI

            gui = new GUI();

            gui.add(controls, 'autoRotate').name('Auto Rotate');
            gui.add(controls, 'autoRotateSpeed', -10.0, 10.0, 0.01).name('Auto Rotate Speed');

            const partFolder = gui.addFolder('Particles');
            partFolder.add(timeScale, 'value', 0.0, 4.0, 0.01).name('timeScale');
            partFolder.add(nbToSpawn, 'value', 1, 100, 1).name('Spawn rate');
            partFolder.add(particleSize, 'value', 0.01, 3.0, 0.01).name('Size');
            partFolder.add(particleLifetime, 'value', 0.01, 2.0, 0.01).name('Lifetime');
            partFolder.add(linksWidth, 'value', 0.001, 0.1, 0.001).name('Links width');
            partFolder.add(colorVariance, 'value', 0.0, 10.0, 0.01).name('Color variance');
            partFolder.add(colorRotationSpeed, 'value', 0.0, 5.0, 0.01).name('Color rotation speed');
            partFolder.add(colorOffset, 'value', 0, 10).name('Color offset');

            const turbFolder = gui.addFolder('Turbulence');
            turbFolder.add(frictionRef, 'current', 0.0, 0.3, 0.01).name('Friction');
            turbFolder.add(frequencyRef, 'current', 0.0, 1.0, 0.01).name('Frequency');
            turbFolder.add(amplitudeRef, 'current', 0.0, 10.0, 0.01).name('Amplitude');
            turbFolder.add(octavesRef, 'current', 1, 9, 1).name('Octaves');
            turbFolder.add(lacunarityRef, 'current', 1.0, 5.0, 0.01).name('Lacunarity');
            turbFolder.add(gainRef, 'current', 0.0, 1.0, 0.01).name('Gain');

            const bloomFolder = gui.addFolder('bloom');
            bloomFolder.add(bloomThresholdRef, 'current', 0, 2.0, 0.01).name('Threshold');
            bloomFolder.add(bloomStrengthRef, 'current', 0, 10, 0.01).name('Strength');
            bloomFolder.add(bloomRadiusRef, 'current', 0, 1, 0.01).name('Radius');

            const planeFolder = gui.addFolder('raycastPlane');
            planeFolder.add(raycastPlane, 'constant', -50, 50, 0.1).name('Constant');
            planeFolder.add(raycastPlane.normal, 'x', -20, 20, 0.1).name('Normal x');
            planeFolder.add(raycastPlane.normal, 'y', -20, 20, 0.1).name('Normal y');
            planeFolder.add(raycastPlane.normal, 'z', -20, 20, 0.1).name('Normal z');

            const points = [
                new THREE.Vector3(0, 0, 50),
                new THREE.Vector3(-10, -10, 40),
                new THREE.Vector3(10, -20, 30),
                new THREE.Vector3(-10, -30, 20),
                new THREE.Vector3(10, -40, 10)
            ];
            //Create a path from the points
            path = new THREE.CatmullRomCurve3(points);
            //path.curveType = 'catmullrom';
            path.tension = 0.5;

            // scene.add(cube);

            const normalLength = 10;
            const normalColor = 0x00ff00;
            const normalOrigin = new THREE.Vector3(0, 0, 0); // You can set this to the plane's position if needed
            const normalDir = new THREE.Vector3(0, 0, 5);
            normalArrow = new THREE.ArrowHelper(normalDir, normalOrigin, normalLength, normalColor);
            scene.add(normalArrow);
        }

        function updateCameraPercentage(percentage: number) {
            const p1 = path.getPointAt(percentage);
            // const p2 = path.getPointAt(percentage + 0.03);

            camera.position.set(p1.x, p1.y, p1.z);
            // camera.lookAt(p2);
            // controls.target.set(p1.x, p1.y, p1.z);
            // light.position.set(p2.x, p2.y, p2.z);
        }

        function onWindowResize() {
            camera.aspect = canvasRef.current!.clientWidth / canvasRef.current!.clientHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(canvasRef.current!.clientWidth, canvasRef.current!.clientHeight);
        }

        function onPointerMove(e: PointerEvent) {
            if (!canvasRef.current) return;

            screenPointer.x = (e.clientX / canvasRef.current!.clientWidth) * 2 - 1;
            screenPointer.y = -(e.clientY / canvasRef.current!.clientHeight) * 2 + 1;
        }

        function updatePointer() {
            raycaster.setFromCamera(
                // new THREE.Vector2(0, -0.8),
                screenPointer,
                camera
            );

            raycaster.ray.intersectPlane(raycastPlane, scenePointer);
        }

        function randomPoints() {
            const pointsCount = 5;
            const range = 4;
            const randomPoints = Array.from(Array(pointsCount)).map(() => {
                return new THREE.Vector3(range * Math.random() - range / 2, range * Math.random() - range / 2, 0);
            });
            return randomPoints;
        }

        function logSpiralPoints() {
            const points = [];
            const a = 0.4; // starting size
            const b = 0.02; // growth rate
            const turns = 6;
            const steps = 20;

            for (let i = steps; i >= 0; i--) {
                const theta = i * ((turns * 2 * Math.PI) / steps);
                const r = a * Math.exp(b * theta);
                const x = r * Math.cos(theta);
                const y = r * Math.sin(theta);
                points.push(new THREE.Vector3(x, y, 0)); // 2D spiral on XY plane
            }
            return points;
        }

        const lighPath1 = new THREE.CatmullRomCurve3(randomPoints());
        lighPath1.tension = 1;
        lighPath1.curveType = 'catmullrom';
        const lighPath2 = new THREE.CatmullRomCurve3(logSpiralPoints());
        lighPath1.tension = 1;
        lighPath1.curveType = 'catmullrom';
        const paths = [lighPath1, lighPath2];
        const pathEpsilons = [0.005, 0.007];
        const pathPercentages = [0, 0];
        let pathIndex = 0;

        function nextPointerPosition() {
            if (pathIndex >= pathPercentages.length) {
                fixedPointerRef.current = undefined;
                return;
            }
            if (!fixedPointerRef.current) {
                fixedPointerRef.current = new THREE.Vector2();
            }
            const randomPoint = paths[pathIndex]?.getPointAt(pathPercentages[pathIndex]);

            fixedPointerRef.current.x = randomPoint.x;
            fixedPointerRef.current.y = randomPoint.y;

            pathPercentages[pathIndex] += pathEpsilons[pathIndex];
            if (pathPercentages[pathIndex] >= 1) pathIndex += 1;
        }

        function mouseSin() {
            if (!fixedPointerRef.current || fixedPointerRef.current.x > 1.5)
                fixedPointerRef.current = new THREE.Vector2(-1.5, 0);
            else fixedPointerRef.current.x += 0.01;

            fixedPointerRef.current.y = Math.sin(fixedPointerRef.current.x * 10);
        }

        function animate() {
            // mouseSin();
            nextPointerPosition();
            timer.update();

            updateCameraPercentage(cameraTargetPercentage.current);
            // compute particles
            renderer.compute(updateParticles);
            renderer.compute(spawnParticles);

            // update particle index for next spawn
            spawnIndex.value = (spawnIndex.value + nbToSpawn.value) % nbParticles;

            // rotate plane to face camera
            raycastPlane.normal = camera.position.clone().normalize();
            // moves plane to constant distance from camera
            raycastPlane.constant = -camera.position.length() + 5;

            // update raycast plane to face camera
            // raycastPlane.normal.applyEuler(camera.rotation);

            // console.log(fixedPointer, screenPointer);
            raycaster.setFromCamera(fixedPointerRef.current || screenPointer, camera);
            raycaster.ray.intersectPlane(raycastPlane, scenePointer);

            // updatePointer();

            // lerping spawn position
            // @ts-ignore
            previousSpawnPosition.value.copy(spawnPosition.value);
            // @ts-ignore
            spawnPosition.value.lerp(scenePointer, 0.1);

            // rotating colors
            colorOffset.value = colorOffsetRef.current;

            // Turbulence
            turbFriction.value = frictionRef.current;
            turbFrequency.value = frequencyRef.current;
            turbAmplitude.value = amplitudeRef.current;
            turbOctaves.value = octavesRef.current;
            turbLacunarity.value = lacunarityRef.current;
            turbGain.value = gainRef.current;

            // Bloom
            bloomPass.threshold.value = bloomThresholdRef.current;
            bloomPass.strength.value = bloomStrengthRef.current;
            bloomPass.radius.value = bloomRadiusRef.current;

            // colorOffset.value +=
            // timer.getDelta() * colorRotationSpeed.value * timeScale.value;

            const elapsedTime = timer.getElapsed();
            light.position.set(
                Math.sin(elapsedTime * 0.5) * 30,
                Math.cos(elapsedTime * 0.3) * 30,
                Math.sin(elapsedTime * 0.2) * 30
            );

            controls.update();
            postProcessing.render();
        }

        return () => {
            try {
                // console.log('calling renderer', stats.dom);
                // container?.removeChild(stats.dom);
                // stats.end();
                gui?.destroy();
                renderer?.dispose();
            } catch (e) {
                //
            }
        };
    }, []);

    return <canvas id='myThreeJsCanvas' className={className} ref={canvasRef} />;
}
