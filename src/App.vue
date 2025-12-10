<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

// Değişkenler
const slotPaketleri = ref([]) // Üst kat (Zenginler)
const standartPaketler = ref([]) // Alt kat (Standart Üyeler)
const yukleniyor = ref(true)

// Sayfa açılınca verileri çek
onMounted(async () => {
  console.log("Veriler yükleniyor...")

  // 1. ADIM: Zengin Slotlarını Çek (ad_packages)
  let { data: slots, error: err1 } = await supabase
    .from('ad_packages')
    .select('*')
    .order('sort_order', { ascending: true })
  
  if(slots) slotPaketleri.value = slots

  // 2. ADIM: Standart Üyelikleri Çek (membership_plans)
  let { data: plans, error: err2 } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('price_monthly', { ascending: true })

  if(plans) standartPaketler.value = plans
  
  yukleniyor.value = false
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-black">

    <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg animate-pulse"></div>
          <h1 class="text-2xl font-bold tracking-tighter">TradePi<span class="text-emerald-400">Global</span></h1>
        </div>

        <div class="flex-1 w-full md:max-w-xl relative">
          <input type="text" placeholder="Ürün, Sektör veya GTIP Kodu Ara..." 
                 class="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm">
          <button class="absolute right-2 top-2 bg-emerald-600 p-1 rounded text-xs font-bold hover:bg-emerald-500">🔍 Ara</button>
        </div>

        <div class="flex gap-3 text-sm font-medium">
          <button class="text-slate-300 hover:text-white">Giriş Yap</button>
          <button class="bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-500 transition shadow-lg shadow-emerald-500/20">
            Satıcı Ol
          </button>
        </div>
      </div>
    </header>

    <section class="py-12 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/10">
            Global B2B Marketplace
          </span>
          <h2 class="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Geleceğin <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Ticaret Sahnesi</span>
          </h2>
          <p class="text-slate-400 mt-4 max-w-2xl mx-auto">
            Sanal fuar alanındaki prestijli slotları kiralayın, markanızı 3D dünyada sergileyin.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div v-for="(slot, index) in slotPaketleri" :key="slot.id" 
               class="bg-slate-800/50 border border-slate-700 rounded-2xl h-64 relative group overflow-hidden hover:border-emerald-500 transition duration-300 cursor-pointer">
            
            <div class="absolute inset-0 flex items-center justify-center bg-slate-900/50">
               <span class="text-5xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition duration-500">🧊</span>
            </div>

            <div class="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-bold border border-slate-600">
              SLOT #{{ index + 1 }}
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <h3 class="font-bold text-lg text-white">{{ slot.name }}</h3>
              <p class="text-xs text-emerald-400 mt-1">{{ slot.price_monthly }} {{ slot.currency }}/ay</p>
            </div>
          </div>

          <div v-if="slotPaketleri.length === 0 && !yukleniyor" class="col-span-4 text-center py-10 text-slate-500">
             Henüz Slot Paketi Eklenmedi. SQL Çalıştırıldı mı?
          </div>

        </div>
      </div>
    </section>

    <section class="py-12 bg-slate-950 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4">
        
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-white">Satıcı Paketleri</h2>
            <p class="text-slate-400 text-sm mt-1">Her bütçeye uygun mağaza seçenekleri.</p>
          </div>
          <div class="hidden md:flex items-center gap-2 text-slate-500 text-sm animate-pulse">
            <span>Kaydır</span> ➜
          </div>
        </div>

        <div class="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-slate-900 snap-x">
          
          <div v-if="yukleniyor" class="text-white p-4">Yükleniyor...</div>

          <div v-else v-for="plan in standartPaketler" :key="plan.id" 
               class="min-w-[300px] bg-slate-900 border border-slate-800 rounded-2xl p-6 relative hover:border-emerald-500 transition snap-center flex flex-col">
            
            <h3 class="text-xl font-bold text-white">{{ plan.name }}</h3>
            <p class="text-sm text-slate-400 mt-2 min-h-[40px]">{{ plan.description }}</p>

            <div class="my-6 pt-4 border-t border-slate-800">
              <span class="text-3xl font-bold text-white">{{ plan.price_monthly == 0 ? 'Ücretsiz' : plan.price_monthly }}</span>
              <span v-if="plan.price_monthly > 0" class="text-sm text-slate-500"> {{ plan.currency }}/ay</span>
            </div>

            <button class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg mt-auto">
              Seç
            </button>
          </div>

        </div>
      </div>
    </section>

    
