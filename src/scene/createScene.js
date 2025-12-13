import { Scene, ArcRotateCamera, HemisphericLight, Vector3 } from "@babylonjs/core";

export function createScene(engine, canvas) {
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    10,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  scene.clearColor.set(0.97, 0.97, 0.97, 1); // açık premium arka plan

  return scene;
}
