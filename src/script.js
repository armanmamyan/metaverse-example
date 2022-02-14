import './style.css'
import * as THREE from 'three'
import keyInput from './modules/KeyInput.module';
import connect from './modules/Connection.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

connect.then((result) => {
    console.log(result)
    const {buildings, supply} = result;
    
    buildings.forEach(({depth,width, height,name, x,y,z}, index) => {
        
        if(index <= supply) {
            const boxGeometry = new THREE.BoxGeometry(width, height, depth);
            const boxMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});
            const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.set(x,y,z);
            scene.add(boxMesh);
        }

    })

})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(50, 0.1, 50)
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const groundPlane = new THREE.Mesh(geometry, material)
scene.add(groundPlane);


// Lights
const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

ambientLight.add(directionalLight);
scene.add(ambientLight);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(5, 15, 15);
camera.lookAt(groundPlane.position);
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    if(keyInput.isPressed(38)){
        camera.position.y += 0.05;
        camera.position.x += 0.05;
    }

    if(keyInput.isPressed(39)){
        // camera.position.y += 0.05;
        camera.position.x += 0.05;
    }

    if(keyInput.isPressed(37)){
        // camera.position.y += 0.05;
        camera.position.x -= 0.05;
    }

    if(keyInput.isPressed(40)){
        camera.position.y -= 0.05;
        camera.position.x -= 0.05;
    }

    // Render
    renderer.render(scene, camera)
    camera.lookAt(groundPlane.position);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()