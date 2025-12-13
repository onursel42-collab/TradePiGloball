import { Engine } from "@babylonjs/core";
import { createScene } from "./scene/createScene";
import { initHeroOverlay } from "./ui/heroOverlay";

const canvas = document.getElementById("app");
const engine = new Engine(canvas, true);

const scene = createScene(engine, canvas);

// UI (his veren katman)
initHeroOverlay();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
