import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function Demo2() {
  return (
    <div>
      <h2>Demo 2 Page</h2>
      <p>This is the Demo 2 content</p>
    </div>
  );
}

const TeapotScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialType, setMaterialType] = useState<string>('wireframe');
  const [size, setSize] = useState<number>(150);
  const [tess, setTess] = useState<number>(15);
  const [bottom, setBottom] = useState<boolean>(true);
  const [lid, setLid] = useState<boolean>(true);
  const [body, setBody] = useState<boolean>(true);
  const [fitView, setFitView] = useState<boolean>(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 50, 500);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Teapot geometry and materials
    let teapot: THREE.Mesh;
    const updateTeapot = () => {
      if (teapot) scene.remove(teapot);
      const geometry = new TeapotGeometry(size, tess, bottom, lid, body, fitView);
      let material: THREE.Material;
      switch (materialType) {
        case 'wireframe':
          material = new THREE.MeshNormalMaterial({ wireframe: true });
          break;
        case 'normal':
          material = new THREE.MeshNormalMaterial();
          break;
        case 'standard':
          material = new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.4, metalness: 0.5 });
          break;
        default:
          material = new THREE.MeshNormalMaterial();
      }
      teapot = new THREE.Mesh(geometry, material);
      scene.add(teapot);
    };
    updateTeapot();

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Stats
    const stats = new Stats();
    containerRef.current.appendChild(stats.dom);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      teapot.rotation.y += 0.005;
      renderer.render(scene, camera);
      stats.update();
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(stats.dom);
    };
  }, [materialType, size, tess, bottom, lid, body, fitView]);

  return (
    <div ref={containerRef} className="w-full h-screen relative">
      <a 
      href='https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_teapot.html'
      target='_blank'
      >WEB SITE</a>

      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-gray-800 text-white p-4 rounded shadow-lg">
        <div className="mb-2">
          <label className="block">Material:</label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="text-black p-1 rounded"
          >
            <option value="wireframe">Wireframe</option>
            <option value="normal">Normal</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Size: {size}</label>
          <input
            type="range"
            min="50"
            max="300"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Tessellation: {tess}</label>
          <input
            type="range"
            min="2"
            max="30"
            value={tess}
            onChange={(e) => setTess(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="checkbox"
              checked={bottom}
              onChange={(e) => setBottom(e.target.checked)}
            />{' '}
            Bottom
          </label>
          <label>
            <input
              type="checkbox"
              checked={lid}
              onChange={(e) => setLid(e.target.checked)}
            />{' '}
            Lid
          </label>
          <label>
            <input
              type="checkbox"
              checked={body}
              onChange={(e) => setBody(e.target.checked)}
            />{' '}
            Body
          </label>
          <label>
            <input
              type="checkbox"
              checked={fitView}
              onChange={(e) => setFitView(e.target.checked)}
            />{' '}
            Fit View
          </label>
        </div>
      </div>
    </div>
  );
};
export default TeapotScene;
