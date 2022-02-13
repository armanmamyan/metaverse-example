import './style.css'
import * as THREE from 'three'

const pos = {
    x: 0,
    y: 0,
};

window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX / window.innerWidth - 0.5;
    pos.y = -(e.clientY / window.innerHeight - 0.5);
})



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
);
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

const helper = new THREE.CameraHelper( camera );
scene.add( helper );



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    camera.position.x = Math.sin(pos.x * Math.PI * 2) * 2;
    camera.position.z = Math.cos(pos.x * Math.PI * 2) * 2;
    camera.position.y = pos.y * 3;
    camera.lookAt(mesh.position);


    camera.updateProjectionMatrix()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()