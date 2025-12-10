<script setup>
import { ref, onMounted } from 'vue'
import * as BABYLON from 'babylonjs'

// Hangi sayfadayız? 'landing' (Ana Sayfa) veya 'panel' (Satıcı Paneli)
const aktifSayfa = ref('panel') 

// 3D Küp (Sadece Panelde süs olsun diye)
onMounted(() => {
  const canvas = document.getElementById("miniCanvas");
  if(canvas) {
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0,0,0,0); // Şeffaf
    
    new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 4}, scene);
    const mat = new BABYLON.StandardMaterial("mat", scene);
    mat.emissiveColor = new BABYLON.Color3(0, 1, 0.5); // Neon Yeşil
    mat.wireframe = true;
    box.material = mat;

    scene.registerBeforeRender(() => { box.rotation.y += 0.01; box.rotation.x += 0.01; });
    engine.runRenderLoop(() => { scene.render(); });
  }
})
</script>

<template>
  <div class="flex h-screen bg-slate-900 text-white font-sans overflow-hidden">
    
    <aside class="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col">
      <div class="p-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-emerald-500 rounded animate-pulse"></div>
        <span class="text-xl font-bold tracking-tighter">TradePi<span class="text-emerald-400">Panel</span></span>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <a href="#" class="flex items-center gap-3 px-4 py-3 bg-slate-800 text-emerald-400 rounded-lg">
          <span>📊</span> Özet Durum
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
          <span>📦</span> Ürünlerim
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
          <span>🚀</span> Siparişler <span class="ml-auto bg-emerald-600 text-xs px-2 py-0.5 rounded-full text-white">2</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
          <span>🎲</span> 3D Vitrin Ayarları
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
          <span>💬</span> Mesajlar (RFQ)
        </a>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500"></div>
          <div>
            <p class="text-sm font-bold">DemirPro Ltd.</p>
            <p class="text-xs text-slate-500">Pro Satıcı</p>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col overflow-y-auto relative">
      
      <header class="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-20">
        <h2 class="text-lg font-semibold text-slate-200">Panel Özeti</h2>
        <button class="md:hidden text-2xl">☰</button>
      </header>

      <div class="p-6 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700 relative overflow-hidden">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <p class="text-slate-400 text-sm">Toplam Ciro</p>
            <h3 class="text-3xl font-bold mt-1 text-white">$12,450</h3>
            <span class="text-emerald-400 text-xs font-medium">↑ %15 artış</span>
          </div>
          
          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p class="text-slate-400 text-sm">Aktif Teklifler (RFQ)</p>
            <h3 class="text-3xl font-bold mt-1 text-white">8</h3>
            <span class="text-yellow-400 text-xs font-medium">● 2 tanesi acil</span>
          </div>

          <div class="bg-slate-800 rounded-xl border border-slate-700 h-32 relative overflow-hidden flex items-center justify-center bg-slate-950">
             <canvas id="miniCanvas" class="w-full h-full opacity-50"></canvas>
             <span class="absolute text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur border border-slate-600">3D Vitrin Aktif</span>
          </div>
        </div>

        <div class="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
            <h3 class="font-bold">Son Siparişler</h3>
            <button class="text-xs text-emerald-400 hover:text-emerald-300">Tümünü Gör →</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-slate-400 uppercase bg-slate-800/50 border-b border-slate-700">
                <tr>
                  <th class="px-6 py-3">Sipariş No</th>
                  <th class="px-6 py-3">Müşteri</th>
                  <th class="px-6 py-3">Tutar</th>
                  <th class="px-6 py-3">Durum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700">
                <tr class="hover:bg-slate-700/50 transition">
                  <td class="px-6 py-4 font-medium">#TR-8852</td>
                  <td class="px-6 py-4">Hans Müller GmbH</td>
                  <td class="px-6 py-4">$4,200</td>
                  <td class="px-6 py-4"><span class="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Hazırlanıyor</span></td>
                </tr>
                <tr class="hover:bg-slate-700/50 transition">
                  <td class="px-6 py-4 font-medium">#TR-8851</td>
                  <td class="px-6 py-4">Al-Fayed Construction</td>
                  <td class="px-6 py-4">$1,150</td>
                  <td class="px-6 py-4"><span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">Kargolandı</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style>
/* Kaydırma çubuğu güzelleştirme */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0f172a; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }
</style>
