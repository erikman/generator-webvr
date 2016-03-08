(function() {
  'use strict';

var scene, camera, renderer;
var mesh;
var manager, vrEffect, vrControls;
var cameraDolly;

init();
loadScene();

function init() {
  scene = new THREE.Scene();

  // Create a group around the camera for moving around. If you want to move
  // the camera update the position of the cameraDolly to allow for VR Headsets
  // that track position.
  cameraDolly = new THREE.Group();
  scene.add(cameraDolly);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  cameraDolly.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Append the canvas element created by the renderer to document body element.
  document.body.appendChild(renderer.domElement);

  vrControls = new THREE.VRControls(camera);
  vrEffect = new THREE.VREffect(renderer);
  onWindowResize();

  manager = new WebVRManager(renderer, vrEffect, {
    hideButton: false
  });
}

function loadScene() {
  // Create 3D objects.
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);

  // Position cube mesh
  mesh.position.z = -1;

  // Add cube mesh to your three.js scene
  scene.add(mesh);

  startRenderLoop();
}

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  vrEffect.setSize(width, height);
}
window.addEventListener('resize', onWindowResize, false);

function startRenderLoop() {
  var oldTimestamp = 0;
  function animate(timestamp) {
    // Calculate time since last frame in seconds
    var timestampDelta = 
      (oldTimestamp !== 0) ? (timestamp - oldTimestamp) / 1000.0 : 0.0;
    oldTimestamp = timestamp;

    // Update Animations
    if (THREE.AnimationHandler) {
      THREE.AnimationHandler.update(timestampDelta);
    }

    // Spin the cube
    mesh.rotation.x += 0.1 * timestampDelta;
    mesh.rotation.y += 0.2 * timestampDelta;

    // Update camera position with latest input values
    vrControls.update();

    // Render the scene using the WebVR manager
    manager.render(scene, camera, timestamp);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
}());
