import { useEffect, useRef } from "react";
import * as BABYLON from "babylonjs";

export default function ShowroomPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.01, 0.02, 0.08, 1);

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 3,
      8,
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.8;

    // Zemin
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 12, height: 12 },
      scene
    );
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.04, 0.08, 0.18);
    groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMat;

    // Demo kutular (Premium satıcı standları)
    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.emissiveColor = new BABYLON.Color3(0.38, 0.4, 1.0);

    for (let i = 0; i < 6; i++) {
      const x = (i % 3) * 3 - 3;
      const z = Math.floor(i / 3) * 3 - 2;

      const box = BABYLON.MeshBuilder.CreateBox(
        "box" + i,
        { size: 1.1 },
        scene
      );
      box.material = boxMat;
      box.position = new BABYLON.Vector3(x, 0.6, z);
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => engine.resize());

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <div className="tpg-container tpg-section">
      <h1 className="tpg-section-title">3D Showroom</h1>
      <p className="tpg-section-sub" style={{ marginBottom: 16 }}>
        Bu alan gelecekte tüm premium satıcı standlarının sergilendiği 3D fuar
        alanı olacak. Şimdilik demo bir sahne gösteriyoruz.
      </p>

      <div className="showroom-wrapper">
        <canvas ref={canvasRef} className="showroom-canvas" />
      </div>
    </div>
  );
}
