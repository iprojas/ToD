import * as THREE from 'three';

export function createObjects(assets) {
  const objects = [];
  assets.forEach(asset => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    objects.push(cube);

    const loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
      const textGeometry = new THREE.TextGeometry(asset.name.split('.')[0], {
        font: font,
        size: 0.5,
        height: 0.2,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      cube.add(mesh);
    });
  });
  return objects;
}