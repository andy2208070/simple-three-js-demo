import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper.js';

// function Demo1() {
//   return (
//     <div>
//       <h2>Demo 1 Page</h2>
//       <p>This is the Demo 1 content</p>
//     </div>
//   );
// }

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const vnhRef = useRef<VertexNormalsHelper | null>(null);
  const vthRef = useRef<VertexTangentsHelper | null>(null);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    mountRef.current?.appendChild(renderer.domElement);

    // Add light
    const light = new THREE.PointLight();
    light.position.set(200, 100, 150);
    scene.add(light);
    scene.add(new THREE.PointLightHelper(light, 15));

    // Add grid helpers
    const gridHelper = new THREE.GridHelper(400, 40, 0x0000ff, 0x808080);
    gridHelper.position.set(-150, -150, 0);
    scene.add(gridHelper);

    const polarGridHelper = new THREE.PolarGridHelper(
      200,
      16,
      8,
      64,
      0x0000ff,
      0x808080
    );
    polarGridHelper.position.set(200, -150, 0);
    scene.add(polarGridHelper);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      'models/gltf/LeePerrySmith/LeePerrySmith.glb',
      (gltf) => {
        const mesh = gltf.scene.children[0] as THREE.Mesh;
        mesh.geometry.computeTangents();

        const group = new THREE.Group();
        group.scale.multiplyScalar(50);
        scene.add(group);
        group.updateMatrixWorld(true);
        group.add(mesh);

        // Add helpers
        vnhRef.current = new VertexNormalsHelper(mesh, 5);
        scene.add(vnhRef.current);

        vthRef.current = new VertexTangentsHelper(mesh, 5);
        scene.add(vthRef.current);

        scene.add(new THREE.BoxHelper(mesh));

        // Wireframe
        const wireframe = new THREE.WireframeGeometry(mesh.geometry);
        let line = new THREE.LineSegments(wireframe);
        (line.material as THREE.Material).depthTest = false;
        (line.material as THREE.Material).opacity = 0.25;
        (line.material as THREE.Material).transparent = true;
        line.position.x = 4;
        group.add(line);
        scene.add(new THREE.BoxHelper(line));

        // Edges
        const edges = new THREE.EdgesGeometry(mesh.geometry);
        const edgeLine = new THREE.LineSegments(edges);
        (edgeLine.material as THREE.Material).depthTest = false;
        (edgeLine.material as THREE.Material).opacity = 0.25;
        (edgeLine.material as THREE.Material).transparent = true;
        edgeLine.position.x = -4;
        group.add(edgeLine);
        scene.add(new THREE.BoxHelper(edgeLine));

        scene.add(new THREE.BoxHelper(group));
        scene.add(new THREE.BoxHelper(scene));
      },
      undefined,
      (error) => console.error('Error loading GLTF model:', error)
    );

    // Handle window resize
    const onWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        const time = -performance.now() * 0.0003;

        cameraRef.current.position.x = 400 * Math.cos(time);
        cameraRef.current.position.z = 400 * Math.sin(time);
        cameraRef.current.lookAt(sceneRef.current.position);

        light.position.x = Math.sin(time * 1.7) * 300;
        light.position.y = Math.cos(time * 1.5) * 400;
        light.position.z = Math.cos(time * 1.3) * 300;

        if (vnhRef.current) vnhRef.current.update();
        if (vthRef.current) vthRef.current.update();

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div>
      <a 
      href='https://github.com/mrdoob/three.js/blob/master/examples/webgl_helpers.html'
      target='_blank'
      >WEB SITE</a>
      <div
        id="info"
        style={{
          position: 'absolute',
          top: 10,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
        }}
      >
        <a
          href="https://threejs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white' }}
        >
          three.js
        </a>{' '}
        - helpers
      </div>
      <div ref={mountRef} />
    </div>
  );
};

export default ThreeScene;
