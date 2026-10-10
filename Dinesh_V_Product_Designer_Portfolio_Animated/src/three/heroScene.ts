import * as THREE from 'three';

export function createHeroScene(container: HTMLElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.IcosahedronGeometry(2.25, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, 1),
    new THREE.MeshBasicMaterial({ color: 0xfb923c, wireframe: true, transparent: true, opacity: 0.18 })
  );
  group.add(inner);

  const points = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 80 }, () => new THREE.Vector3((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4))
    ),
    new THREE.PointsMaterial({ color: 0xf97316, size: 0.035, transparent: true, opacity: 0.6 })
  );
  group.add(points);

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.7;
  };
  container.addEventListener('pointermove', onMove);

  let raf = 0;
  const animate = () => {
    mouse.x += (target.x - mouse.x) * 0.04;
    mouse.y += (target.y - mouse.y) * 0.04;
    group.rotation.y += reduced ? 0.0004 : 0.0022;
    group.rotation.x += (mouse.y - group.rotation.x) * 0.02;
    group.rotation.z += (mouse.x - group.rotation.z) * 0.01;
    inner.rotation.y -= reduced ? 0.0003 : 0.0015;
    points.rotation.y += reduced ? 0.0002 : 0.0008;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  };
  animate();

  const resize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    container.removeEventListener('pointermove', onMove);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}
