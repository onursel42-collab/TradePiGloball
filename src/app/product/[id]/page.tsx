// src/app/product/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Product = {
  id: string;
  name: string | null;
  category: string | null;
  description: string | null;
  price: number | null;
  currency: string | null;
  moq: string | null;
  image_url: string | null;
  is_rfq_enabled: boolean | null;
};

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const { data: product, error } = await supabase
    .from<Product>('products')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (error || !product) {
    console.error('Product error', error);
    return notFound();
  }

  const {
    name,
    category,
    description,
    price,
    currency,
    moq,
    image_url,
    is_rfq_enabled,
  } = product;

  const priceText =
    price != null ? `${price} ${currency ?? 'USD'}` : 'Fiyat için teklif isteyin';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* BreadCrumb */}
        <nav className="mb-6 text-sm text-slate-400">
          <a href="/" className="hover:text-slate-100">
            Ana Sayfa
          </a>{' '}
          › <span>Ürün Detayı</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-[1.3fr,1fr]">
          {/* Görsel */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900">
            <Image
              src={
                image_url ||
                'https://via.placeholder.com/800x600?text=TradePiGlobal+Product'
              }
              alt={name ?? 'Ürün görseli'}
              fill
              className="object-cover"
            />
          </div>

          {/* Bilgi paneli */}
          <div>
            <h1 className="mb-2 text-2xl font-semibold text-slate-50">
              {name ?? 'Ürün'}
            </h1>
            <p className="mb-4 text-sm text-slate-400">
              {category ?? 'Kategori belirtilmemiş'}
            </p>

            <div className="mb-4 rounded-xl bg-slate-900 p-4">
              <div className="text-lg font-semibold text-emerald-400">
                {priceText}
              </div>
              <div className="mt-1 text-sm text-slate-400">
                MOQ:{' '}
                <span className="text-slate-100">
                  {moq ?? 'Belirtilmemiş'}
                </span>
              </div>
              <div className="mt-2 text-xs">
                RFQ:{' '}
                <span
                  className={
                    is_rfq_enabled
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }
                >
                  {is_rfq_enabled ? 'Açık (Buyer teklif verebilir)' : 'Kapalı'}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold text-slate-200">
                Ürün Açıklaması
              </h2>
              <p className="text-sm text-slate-300">
                {description ||
                  'Satıcı bu ürün için henüz açıklama eklememiş.'}
              </p>
            </div>

            <a
              href={`/login?role=buyer&redirect=offer_product&product_id=${encodeURIComponent(
                product.id
              )}`}
              className="block rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Bu Ürün İçin Teklif Ver
            </a>

            <p className="mt-2 text-xs text-slate-400">
              Teklif vermek için önce giriş yapman gerekir. Giriş yaptıktan
              sonra adet, hedef fiyat ve teslim şartlarını iletebilirsin.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
            }
