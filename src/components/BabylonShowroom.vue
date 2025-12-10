<template>
  <div class="babylon-wrapper">
    <canvas ref="canvasRef" class="babylon-canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as BABYLON from "babylonjs";

const canvasRef = ref(null);
let engine;
let scene;

onMounted(() => {
  const canvas = canvasRef.value;
  engine = new BABYLON.Engine(canvas, true);
  scene = createScene(engine, canvas);
  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => engine.resize());
  engine?.dispose();
});

function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.02, 0.06, 0.09);

  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    -Math.PI / 2,
    Math.PI / 3,
    25,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.9;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 30, height: 20 },
    scene
  );
  const gMat = new BABYLON.StandardMaterial("gMat", scene);
  gMat.diffuseColor = new BABYLON.Color3(0.07, 0.11, 0.2);
  ground.material = gMat;

  const rows = 2;
  const cols = 4;
  const standW = 3;
  const standD = 2;
  const gap = 1.2;
  let index = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c - (cols - 1) / 2) * (standW + gap);
      const z = (r - (rows - 1) / 2) * (standD + gap) * 2;

      const stand = BABYLON.MeshBuilder.CreateBox(
        "stand_" + index,
        { width: standW, depth: standD, height: 1.2 },
        scene
      );
      stand.position = new BABYLON.Vector3(x, 0.6, z);

      const mat = new BABYLON.StandardMaterial("m_" + index, scene);
      mat.diffuseColor =
        index === 0
          ? new BABYLON.Color3(0.06, 0.73, 0.49)
          : new BABYLON.Color3(0.14, 0.2, 0.32);
      stand.material = mat;

      index++;
    }
  }

  return scene;
}
</script>
