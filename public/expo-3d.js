// public/expo-3d.js
// Minimal Babylon showroom scene (no build, CDN)

(function () {
  const container = document.getElementById("expo3d");
  if (!container) return;

  // Canvas oluştur
  const canvas = document.createElement("canvas");
  canvas.id = "expo3dCanvas";
  canvas.style.width = "100%";
  canvas.style.height = "420px";
  canvas.style.display = "block";
  canvas.style.borderRadius = "12px";
  container.innerHTML = "";
  container.appendChild(canvas);

  function showFallback(msg) {
    container.innerHTML = `
      <div style="
        padding:24px; background:#e9ecf1; border-radius:12px; color:#333;
        font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
      ">
        <strong>3D alan açılamadı.</strong><br/>
        ${msg || "Cihaz WebGL desteklemiyor olabilir."}
      </div>
    `;
  }

  // Babylon yoksa fallback
  if (!window.BABYLON) {
    showFallback("Babylon.js yüklenemedi (CDN).");
    return;
  }

  try {
    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.96, 0.97, 0.98, 1);

    // Kamera
    const camera = new BABYLON.ArcRotateCamera(
      "cam",
      -Math.PI / 2,
      Math.PI / 2.4,
      10,
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.wheelDeltaPercentage = 0.01;

    // Işıklar
    const light1 = new BABYLON.HemisphericLight("h1", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity = 0.9;

    const light2 = new BABYLON.DirectionalLight("d1", new BABYLON.Vector3(-0.5, -1, -0.5), scene);
    light2.position = new BABYLON.Vector3(5, 10, 5);
    light2.intensity = 0.6;

    // Zemin
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 14, height: 10 }, scene);
    const gmat = new BABYLON.StandardMaterial("gmat", scene);
    gmat.diffuseColor = new BABYLON.Color3(0.93, 0.93, 0.95);
    gmat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    ground.material = gmat;

    // Basit “stand”
    const stand = BABYLON.MeshBuilder.CreateBox("stand", { width: 2.6, height: 0.6, depth: 1.2 }, scene);
    stand.position.y = 0.3;
    const smat = new BABYLON.StandardMaterial("smat", scene);
    smat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.25);
    smat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.35);
    stand.material = smat;

    // Logo panel (placeholder)
    const panel = BABYLON.MeshBuilder.CreatePlane("panel", { width: 2.2, height: 1.2 }, scene);
    panel.position = new BABYLON.Vector3(0, 1.6, -2.4);

    const pmat = new BABYLON.StandardMaterial("pmat", scene);
    pmat.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.07);
    pmat.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.07);
    panel.material = pmat;

    // Hafif animasyon
    scene.onBeforeRenderObservable.add(() => {
      panel.rotation.y += 0.002;
    });

    engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", () => engine.resize());
  } catch (e) {
    console.error(e);
    showFallback(e?.message);
  }
})();
